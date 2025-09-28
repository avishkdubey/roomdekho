import os
import random
import smtplib
import ssl
from datetime import datetime, timedelta, timezone
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

import jwt
from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv

from core.config import get_connection

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
# Enable CORS for frontend requests during development
CORS(app)

# --- JWT Configuration ---
# IMPORTANT: Keep this secret key secure in a real application
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY", "your-super-secret-key-for-jwt")

# --- Email Configuration ---
SENDER_EMAIL = os.getenv("GMAIL_USER", "roomdekha.com@gmail.com")
SENDER_PASSWORD = os.getenv("GMAIL_APP_PASSWORD") # IMPORTANT: Use an App Password

@app.route('/api/send-otp', methods=['POST'])
def send_otp():
    """
    Handles sending an OTP to a user's email.
    Creates a user if one does not exist.
    """
    email = request.json.get('email')
    if not email:
        return jsonify({"error": "Email is required"}), 400

    conn = get_connection()
    cursor = conn.cursor()

    try:
        # Check if user exists, if not, create one
        cursor.execute("SELECT id, name FROM users WHERE email = %s", (email,))
        user = cursor.fetchone()
        
        if user:
            user_id = user[0]
            user_name = user[1]
        else:
            # Create a new user with a default name
            user_name = "New User"
            cursor.execute("INSERT INTO users (name, email) VALUES (%s, %s)", (user_name, email))
            conn.commit()
            user_id = cursor.lastrowid

        # Generate OTP
        otp_code = str(random.randint(100000, 999999))
        expires_at = datetime.now() + timedelta(minutes=5)

        # Store OTP in the database
        cursor.execute(
            "INSERT INTO otps (user_id, otp_code, expires_at) VALUES (%s, %s, %s)",
            (user_id, otp_code, expires_at)
        )
        conn.commit()

        # Send OTP email
        if not SENDER_PASSWORD:
            print("WARNING: GMAIL_APP_PASSWORD not set. Cannot send email.")
            # For local testing without email setup, we can return success
            return jsonify({"message": "OTP generated (email sending disabled)"})

        message = MIMEMultipart("alternative")
        message["Subject"] = f"Your RoomDekho Login OTP is {otp_code}"
        message["From"] = SENDER_EMAIL
        message["To"] = email

        html = f"""
        <html>
        <body>
            <div style="font-family: Arial, sans-serif; text-align: center; color: #333;">
                <h2>Welcome to RoomDekho, {user_name}!</h2>
                <p>Your One-Time Password (OTP) for login is:</p>
                <p style="font-size: 24px; font-weight: bold; color: #ff6f61;">{otp_code}</p>
                <p>This code is valid for 5 minutes.</p>
                <p>If you did not request this, please ignore this email.</p>
                <hr>
                <p style="font-size: 12px; color: #888;">Thank you for using RoomDekho.com</p>
            </div>
        </body>
        </html>
        """
        message.attach(MIMEText(html, "html"))

        context = ssl.create_default_context()
        with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context) as server:
            server.login(SENDER_EMAIL, SENDER_PASSWORD)
            server.sendmail(SENDER_EMAIL, email, message.as_string())

        return jsonify({"message": "OTP sent successfully"})

    except Exception as e:
        print(f"Error in /api/send-otp: {e}")
        return jsonify({"error": "An internal error occurred"}), 500
    finally:
        cursor.close()
        conn.close()


@app.route('/api/verify-otp', methods=['POST'])
def verify_otp():
    """
    Verifies the OTP and returns a JWT token upon success.
    """
    email = request.json.get('email')
    otp_code = request.json.get('otp')

    if not email or not otp_code:
        return jsonify({"error": "Email and OTP are required"}), 400

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    try:
        # Find the user to get their details
        cursor.execute("SELECT id, name, role FROM users WHERE email = %s", (email,))
        user = cursor.fetchone()
        if not user:
            return jsonify({"error": "User not found"}), 404
        
        user_id = user['id']

        # Find the latest, unused OTP for the user
        cursor.execute(
            """
            SELECT otp_code, expires_at FROM otps 
            WHERE user_id = %s AND is_used = 0 
            ORDER BY created_at DESC LIMIT 1
            """,
            (user_id,)
        )
        otp_data = cursor.fetchone()

        if not otp_data:
            return jsonify({"error": "Invalid or expired OTP"}), 400

        # Check if OTP matches and is not expired
        if otp_data['otp_code'] == otp_code and otp_data['expires_at'] > datetime.now():
            # Mark OTP as used
            cursor.execute(
                "UPDATE otps SET is_used = 1 WHERE user_id = %s AND otp_code = %s",
                (user_id, otp_code)
            )
            conn.commit()

            # --- Create JWT Token ---
            token_payload = {
                "user_id": user['id'],
                "name": user['name'],
                "role": user['role'],
                "exp": datetime.now(timezone.utc) + timedelta(hours=24) # Token expires in 24 hours
            }
            token = jwt.encode(token_payload, app.config["SECRET_KEY"], algorithm="HS256")
            
            return jsonify({
                "message": "Login successful",
                "token": token,
                "user": {"name": user['name'], "email": email, "role": user['role']}
            })
        else:
            return jsonify({"error": "Invalid or expired OTP"}), 400

    except Exception as e:
        print(f"Error in /api/verify-otp: {e}")
        return jsonify({"error": "An internal error occurred"}), 500
    finally:
        cursor.close()
        conn.close()

if __name__ == '__main__':
    # Runs the app on port 5001 to avoid conflicts with frontend dev server
    app.run(debug=True, port=5001)

