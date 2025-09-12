import { faFacebook, faLinkedin, faTwitter, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import {
    faBath,
    faBed,
    faCalculator,
    faCalendarAlt,
    faCouch,
    faHandshake,
    faHeart,
    faIndianRupeeSign,
    faLocationDot,
    faMapMarkedAlt,
    faParking,
    faPhone,
    faRulerCombined,
    faShareAlt,
    faStar,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';

// Import for Google Maps (assuming @react-google-maps/api is installed)
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

// Static property data (enhanced with more fields)
const propertyData = {
  id: 1,
  images: [
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80', // Bedroom
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80', // Living Room
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80', // Kitchen
    'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=80', // Bathroom
  ],  
  type: '2BHK Flat',
  owner: 'Abhishek Dubey',
  address: '123 Sunshine Apartments',
  city: 'Gwalior',
  state: 'Madhya Pradesh',
  price: 7500,
  houseNo: 'A-42',
  wardNo: 'Ward 5',
  personsAllowed: 4,
  beds: 2,
  baths: 2,
  sqft: 1200,
  yearBuilt: 2015,
  furnishing: 'Semi-furnished',
  parking: 'Yes',
  amenities: ['AC', 'WiFi', 'Pool', 'Gym', 'Security'],
  description:
    'A beautiful and spacious 2BHK flat located in the heart of the city. Comes with all modern amenities, 24/7 water and electricity supply, and a dedicated parking spot. Perfect for families or working professionals looking for a comfortable and convenient living space.',
  ownerPhone: '1234567890',
  location: { lat: 26.2183, lng: 78.1828 }, // Demo coords for Gwalior
  virtualTourUrl: 'https://example.com/virtual-tour',
  neighborhood: 'Close to schools, hospitals, and shopping centers. Safe and vibrant area.',
};

// Demo similar properties
const similarProperties = [
    {
      id: 2,
      type: '1BHK Apartment',
      price: 5000,
      address: '456 Moonlight Residences, Gwalior',
      image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=600&h=400&fit=crop',
    },
    {
      id: 3,
      type: '3BHK Villa',
      price: 10000,
      address: '789 Starlight Villas, Gwalior',
      image: 'https://images.unsplash.com/photo-1600607687483-6f91e4d9dba3?w=600&h=400&fit=crop',
    },
    {
      id: 4,
      type: '2BHK Flat',
      price: 8000,
      address: '101 Rainbow Towers, Gwalior',
      image: 'https://images.unsplash.com/photo-1560184897-67f4b86aa24e?w=600&h=400&fit=crop',
    },
  ];
  

// Static review data for demo
const initialReviews = [
  { userId: 'User1', rating: 5, review: 'Excellent place! Highly recommend.', datetime: '2025-09-01' },
  { userId: 'User2', rating: 4, review: 'Good value for money, but needs better maintenance.', datetime: '2025-08-15' },
  { userId: 'User3', rating: 3, review: 'Average, location is great though.', datetime: '2025-07-20' },
];

const PropertyDetail = () => {
  const [displayedImage, setDisplayedImage] = useState(propertyData.images[0]);
  const [showContactModal, setShowContactModal] = useState(false);
  const [ratingData, setRatingData] = useState(0);
  const [userReview, setUserReview] = useState('');
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [starCounts, setStarCounts] = useState({ five: 0, four: 0, three: 0, two: 0, one: 0 });
  const [reviews, setReviews] = useState(initialReviews);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showCalculatorModal, setShowCalculatorModal] = useState(false);
  const [loanAmount, setLoanAmount] = useState(propertyData.price * 10); // Demo
  const [interestRate, setInterestRate] = useState(7);
  const [loanTerm, setLoanTerm] = useState(30);
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  // Load rating data
  useEffect(() => {
    const total = initialReviews.length;
    const sum = initialReviews.reduce((acc, r) => acc + r.rating, 0);
    const avg = total > 0 ? (sum / total).toFixed(1) : 0;
    setAverageRating(avg);
    setTotalReviews(total);

    const counts = { five: 0, four: 0, three: 0, two: 0, one: 0 };
    initialReviews.forEach((r) => {
      if (r.rating === 5) counts.five++;
      else if (r.rating === 4) counts.four++;
      else if (r.rating === 3) counts.three++;
      else if (r.rating === 2) counts.two++;
      else if (r.rating === 1) counts.one++;
    });
    setStarCounts(counts);
  }, []);

  const handleThumbnailHover = (src) => {
    setDisplayedImage(src);
  };

  const handleBookNow = (e) => {
    e.preventDefault();
    alert('Booking request sent. Waiting for owner approval.');
  };

  const handleSubmitReview = () => {
    if (!userReview || ratingData === 0) {
      alert('Please select a rating and fill the review field');
      return;
    }
    const newReview = {
      userId: 'CurrentUser',
      rating: ratingData,
      review: userReview,
      datetime: new Date().toISOString().split('T')[0],
    };
    const updatedReviews = [...reviews, newReview];
    setReviews(updatedReviews);
    setUserReview('');
    setRatingData(0);
    setShowReviewModal(false);

    // Update average and counts
    const newTotal = updatedReviews.length;
    const newSum = updatedReviews.reduce((acc, r) => acc + r.rating, 0);
    const newAvg = (newSum / newTotal).toFixed(1);
    setAverageRating(newAvg);
    setTotalReviews(newTotal);

    const newCounts = { ...starCounts };
    if (ratingData === 5) newCounts.five++;
    else if (ratingData === 4) newCounts.four++;
    else if (ratingData === 3) newCounts.three++;
    else if (ratingData === 2) newCounts.two++;
    else if (ratingData === 1) newCounts.one++;
    setStarCounts(newCounts);

    alert('Review submitted!');
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    alert(isFavorite ? 'Removed from favorites' : 'Added to favorites');
  };

  const calculateMortgage = () => {
    const principal = loanAmount;
    const monthlyInterest = interestRate / 100 / 12;
    const payments = loanTerm * 12;
    const x = Math.pow(1 + monthlyInterest, payments);
    const monthly = (principal * x * monthlyInterest) / (x - 1);
    setMonthlyPayment(monthly.toFixed(2));
  };

  const mapContainerStyle = {
    height: '300px',
    width: '100%',
  };

  return (
    <>
      <div className="bg-gray-100 min-h-screen py-8">
        <div className="container mx-auto px-4">
          {/* Main Content */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Thumbnails */}
            <div className="flex flex-row lg:flex-col justify-center lg:justify-start gap-2 order-2 lg:order-1 w-full lg:w-1/12">
              {propertyData.images.map((img, index) => (
                <div key={index} className="w-1/4 lg:w-full">
                  <img
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    className="h-20 w-full object-cover border-2 border-black rounded cursor-pointer hover:border-yellow-500 transition-all duration-300 transform hover:scale-105"
                    onMouseEnter={() => handleThumbnailHover(img)}
                  />
                </div>
              ))}
            </div>

            {/* Main Image */}
            <div className="order-1 lg:order-2 w-full lg:w-5/12">
              <img
                src={displayedImage}
                alt="Main Property"
                className="w-full h-[40vh] md:h-[70vh] object-cover rounded-lg shadow-lg transition-opacity duration-500"
              />
            </div>

            {/* Details */}
            <div className="order-3 w-full lg:w-6/12">
              <div className="flex items-center text-sm text-gray-600 mb-2 animate-fade-in">
                <FontAwesomeIcon icon={faStar} className="text-yellow-400 mr-1" />
                {averageRating} | {totalReviews} reviews
              </div>
              <h1 className="text-3xl font-bold mb-1">{propertyData.type}</h1>
              <p className="text-gray-600 mb-2">
                Owned by <span className="text-blue-600">{propertyData.owner}</span>
              </p>
              <p className="text-gray-600 flex items-center mb-4">
                <FontAwesomeIcon icon={faLocationDot} className="text-red-600 mr-2" />
                {propertyData.address}, {propertyData.city}, {propertyData.state}
              </p>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold flex items-center">
                  <FontAwesomeIcon icon={faIndianRupeeSign} className="mr-1" /> {propertyData.price.toLocaleString()}
                </h2>
                <div className="flex space-x-2">
                  <button
                    onClick={toggleFavorite}
                    className={`p-2 rounded-full ${isFavorite ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-800'} hover:scale-110 transition`}
                  >
                    <FontAwesomeIcon icon={faHeart} />
                  </button>
                  <button
                    onClick={() => setShowShareModal(true)}
                    className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition hover:scale-110"
                  >
                    <FontAwesomeIcon icon={faShareAlt} />
                  </button>
                </div>
              </div>
              <div className="flex space-x-4 mb-6">
                <button
                  onClick={() => setShowContactModal(true)}
                  className="bg-yellow-500 text-white px-6 py-2 rounded-full hover:bg-yellow-600 transition flex items-center animate-bounce-slow"
                >
                  <FontAwesomeIcon icon={faPhone} className="mr-2" /> Contact Owner
                </button>
                <form onSubmit={handleBookNow}>
                  <button type="submit" className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition flex items-center">
                    <FontAwesomeIcon icon={faHandshake} className="mr-2" /> Book Now
                  </button>
                </form>
              </div>

              {/* Enhanced Property Details */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div><strong>House No:</strong> {propertyData.houseNo}</div>
                <div><strong>Ward No:</strong> {propertyData.wardNo}</div>
                <div><strong>Beds:</strong> {propertyData.beds} <FontAwesomeIcon icon={faBed} className="ml-1 text-gray-600" /></div>
                <div><strong>Baths:</strong> {propertyData.baths} <FontAwesomeIcon icon={faBath} className="ml-1 text-gray-600" /></div>
                <div><strong>Sq Ft:</strong> {propertyData.sqft} <FontAwesomeIcon icon={faRulerCombined} className="ml-1 text-gray-600" /></div>
                <div><strong>Year Built:</strong> {propertyData.yearBuilt} <FontAwesomeIcon icon={faCalendarAlt} className="ml-1 text-gray-600" /></div>
                <div><strong>Furnishing:</strong> {propertyData.furnishing} <FontAwesomeIcon icon={faCouch} className="ml-1 text-gray-600" /></div>
                <div><strong>Parking:</strong> {propertyData.parking} <FontAwesomeIcon icon={faParking} className="ml-1 text-gray-600" /></div>
                <div className="col-span-2"><strong>Persons Allowed:</strong> {propertyData.personsAllowed}</div>
              </div>

              {/* Amenities */}
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-2">Amenities</h3>
                <ul className="flex flex-wrap gap-2">
                  {propertyData.amenities.map((amenity, index) => (
                    <li key={index} className="bg-blue-100 px-3 py-1 rounded-full text-blue-800">
                      {amenity}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-2">About This Property</h3>
                <p className="text-gray-700">{propertyData.description}</p>
              </div>

              {/* Neighborhood */}
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-2">Neighborhood</h3>
                <p className="text-gray-700">{propertyData.neighborhood}</p>
              </div>

              {/* Virtual Tour */}
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-2">Virtual Tour</h3>
                <a href={propertyData.virtualTourUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  View 360° Tour
                </a>
              </div>

              {/* Map */}
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-2 flex items-center">
                  <FontAwesomeIcon icon={faMapMarkedAlt} className="mr-2" /> Location Map
                </h3>
                <LoadScript googleMapsApiKey="YOUR_API_KEY"> {/* Replace with actual key */}
                  <GoogleMap mapContainerStyle={mapContainerStyle} center={propertyData.location} zoom={14}>
                    <Marker position={propertyData.location} />
                  </GoogleMap>
                </LoadScript>
              </div>

              {/* Mortgage Calculator */}
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-2 flex items-center">
                  <FontAwesomeIcon icon={faCalculator} className="mr-2" /> Mortgage Calculator
                </h3>
                <button onClick={() => setShowCalculatorModal(true)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                  Open Calculator
                </button>
              </div>
            </div>
          </div>

          {/* Review Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-center mb-6">Give Your Feedback</h2>
            <div className="bg-white shadow-md rounded p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-yellow-500">{averageRating} / 5</h1>
                  <div className="flex justify-center my-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FontAwesomeIcon
                        key={star}
                        icon={faStar}
                        className={`text-2xl ${star <= Math.ceil(averageRating) ? 'text-yellow-500' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <p>{totalReviews} Reviews</p>
                </div>
                <div>
                  {[5, 4, 3, 2, 1].map((star) => (
                    <div key={star} className="mb-2">
                      <div className="flex justify-between text-sm">
                        <span>{star} <FontAwesomeIcon icon={faStar} className="text-yellow-500" /></span>
                        <span>({starCounts[['', 'one', 'two', 'three', 'four', 'five'][star]]})</span>
                      </div>
                      <div className="bg-gray-200 h-2 rounded-full">
                        <div
                          className="bg-yellow-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(starCounts[['', 'one', 'two', 'three', 'four', 'five'][star]] / totalReviews * 100) || 0}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-center">
                  <button
                    onClick={() => setShowReviewModal(true)}
                    className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
                  >
                    Write a Review
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-8">
              {reviews.map((review, index) => (
                <div key={index} className="bg-white shadow-md rounded p-4 mb-4 animate-slide-up">
                  <div className="flex items-center mb-2">
                    <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center mr-4">
                      {review.userId.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold">{review.userId}</h4>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <FontAwesomeIcon
                            key={star}
                            icon={faStar}
                            className={`${star <= review.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700">{review.review}</p>
                  <p className="text-right text-sm text-gray-500">On {review.datetime}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Similar Properties */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Similar Properties</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarProperties.map((prop) => (
                <div key={prop.id} className="bg-white shadow-md rounded overflow-hidden transform hover:scale-105 transition duration-300">
                  <img src={prop.image} alt={prop.type} className="w-full h-40 object-cover" />
                  <div className="p-4">
                    <h3 className="font-bold">{prop.type}</h3>
                    <p className="text-gray-600">{prop.address}</p>
                    <p className="text-xl font-bold"><FontAwesomeIcon icon={faIndianRupeeSign} /> {prop.price.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in-fast">
          <div className="bg-white p-6 rounded-lg shadow-xl w-11/12 md:w-1/3">
            <div className="flex justify-end">
              <button onClick={() => setShowContactModal(false)} className="text-2xl">&times;</button>
            </div>
            <h3 className="text-xl font-bold mb-4">Contact Owner</h3>
            <p className="flex items-center">
              <FontAwesomeIcon icon={faWhatsapp} className="text-green-500 mr-2 text-2xl" />
              +91-{propertyData.ownerPhone}
            </p>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in-fast">
          <div className="bg-white p-6 rounded-lg shadow-xl w-11/12 md:w-1/3">
            <div className="flex justify-end">
              <button onClick={() => setShowShareModal(false)} className="text-2xl">&times;</button>
            </div>
            <h3 className="text-xl font-bold mb-4">Share This Property</h3>
            <div className="flex justify-around">
              <a href="#" className="text-blue-600 text-3xl"><FontAwesomeIcon icon={faFacebook} /></a>
              <a href="#" className="text-blue-400 text-3xl"><FontAwesomeIcon icon={faTwitter} /></a>
              <a href="#" className="text-blue-700 text-3xl"><FontAwesomeIcon icon={faLinkedin} /></a>
              <a href="#" className="text-green-500 text-3xl"><FontAwesomeIcon icon={faWhatsapp} /></a>
            </div>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in-fast">
          <div className="bg-white p-6 rounded-lg shadow-xl w-11/12 md:w-1/3">
            <div className="flex justify-end">
              <button onClick={() => setShowReviewModal(false)} className="text-2xl">&times;</button>
            </div>
            <h3 className="text-xl font-bold mb-4">Submit Review</h3>
            <div className="flex justify-center mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <FontAwesomeIcon
                  key={star}
                  icon={faStar}
                  className={`text-3xl cursor-pointer mx-1 transition-colors duration-200 ${ratingData >= star ? 'text-yellow-500' : 'text-gray-300'}`}
                  onMouseEnter={() => setRatingData(star)}
                  onClick={() => setRatingData(star)}
                />
              ))}
            </div>
            <textarea
              className="w-full p-2 border rounded mb-4"
              placeholder="Type your review here..."
              value={userReview}
              onChange={(e) => setUserReview(e.target.value)}
            ></textarea>
            <button onClick={handleSubmitReview} className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600">
              Submit
            </button>
          </div>
        </div>
      )}

      {/* Mortgage Calculator Modal */}
      {showCalculatorModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in-fast">
          <div className="bg-white p-6 rounded-lg shadow-xl w-11/12 md:w-1/3">
            <div className="flex justify-end">
              <button onClick={() => setShowCalculatorModal(false)} className="text-2xl">&times;</button>
            </div>
            <h3 className="text-xl font-bold mb-4">Mortgage Calculator</h3>
            <div className="space-y-4">
              <div>
                <label>Loan Amount (₹)</label>
                <input
                  type="number"
                  className="w-full p-2 border rounded"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(parseFloat(e.target.value))}
                />
              </div>
              <div>
                <label>Interest Rate (%)</label>
                <input
                  type="number"
                  className="w-full p-2 border rounded"
                  value={interestRate}
                  onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                />
              </div>
              <div>
                <label>Loan Term (Years)</label>
                <input
                  type="number"
                  className="w-full p-2 border rounded"
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(parseFloat(e.target.value))}
                />
              </div>
              <button onClick={calculateMortgage} className="bg-green-500 text-white px-4 py-2 rounded w-full hover:bg-green-600">
                Calculate
              </button>
              {monthlyPayment > 0 && (
                <p className="text-center text-xl font-bold">Monthly Payment: ₹{monthlyPayment}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PropertyDetail;