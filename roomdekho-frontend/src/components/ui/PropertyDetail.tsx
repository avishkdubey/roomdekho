import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStar,
  faIndianRupeeSign,
  faMapMarkerAlt,
  faPhone,
  faHandshake,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

// Static property data (adapted from provided)
const propertyData = {
  id: 1,
  images: [
    '/path/to/room1.jpeg', // Replace with actual paths
    '/path/to/room2.webp',
    '/path/to/room3.jpeg',
    '/path/to/room4.jpeg',
  ],
  type: '2BHK Flat',
  owner: 'Abhishek Dubey',
  address: '123 Sunshine Apartments',
  city: 'Gwalior',
  price: '7,500',
  houseNo: 'A-42',
  wardNo: 'Ward 5',
  state: 'Madhya Pradesh',
  personsAllowed: 4,
  description:
    'A beautiful and spacious 2BHK flat located in the heart of the city. Comes with all modern amenities, 24/7 water and electricity supply, and a dedicated parking spot. Perfect for families or working professionals looking for a comfortable and convenient living space.',
  ownerPhone: '1234567890', // Static phone for modal
  averageRating: 0.0, // Static for demo
  totalReviews: 49,
};

// Static review data for demo
const reviewData = [
  // Add sample reviews if needed, e.g.
  // { userId: 'User1', rating: 4, review: 'Great place!', datetime: '2023-01-01' },
];

const PropertyDetail = () => {
  const [displayedImage, setDisplayedImage] = useState(propertyData.images[0]);
  const [showModal, setShowModal] = useState(false);
  const [ratingData, setRatingData] = useState(0);
  const [userReview, setUserReview] = useState('');
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [averageRating, setAverageRating] = useState(propertyData.averageRating);
  const [totalReviews, setTotalReviews] = useState(propertyData.totalReviews);
  const [starCounts, setStarCounts] = useState({
    five: 0,
    four: 0,
    three: 0,
    two: 0,
    one: 0,
  });
  const [reviews, setReviews] = useState(reviewData);

  // Simulate loading rating data (replace with API if available)
  useEffect(() => {
    // Mock data load
    setAverageRating(4.2); // Example
    setTotalReviews(49);
    setStarCounts({ five: 20, four: 15, three: 10, two: 3, one: 1 });
    setReviews([
      { userId: 'User1', rating: 5, review: 'Excellent!', datetime: '2025-09-01' },
      // Add more
    ]);
  }, []);

  const handleThumbnailHover = (src) => {
    setDisplayedImage(src);
  };

  const handleBookNow = (e) => {
    e.preventDefault();
    // Simulate booking (replace with API call)
    alert('Request Sent. Wait for approval from Room Owner.');
  };

  const handleSubmitReview = () => {
    if (!userReview) {
      alert('Please fill the review field');
      return;
    }
    // Simulate submit (add to reviews)
    const newReview = {
      userId: 'CurrentUser',
      rating: ratingData,
      review: userReview,
      datetime: new Date().toISOString().split('T')[0],
    };
    setReviews([...reviews, newReview]);
    setUserReview('');
    setRatingData(0);
    setShowReviewModal(false);
    // Update averages (simplified)
    const newTotal = totalReviews + 1;
    const newAvg = ((averageRating * totalReviews) + ratingData) / newTotal;
    setAverageRating(newAvg.toFixed(1));
    setTotalReviews(newTotal);
    alert('Review submitted!');
  };

  return (
    <>
      {/* Navbar (matching PHP) */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white sticky-top">
        <div className="container-fluid" id="navbar">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
          >
            <i className="fas fa-bars"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <a className="navbar-brand mt-2 mt-lg-0" href="#">
              <h3 className="text-xl">
                <ion-icon name="home-outline"></ion-icon>&nbsp;RoomDekho.com
              </h3>
            </a>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0" id="list">
              <li className="nav-item">
                <a className="nav-link" href="flats.php">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Support
                </a>
              </li>
            </ul>
          </div>
          <div className="flex items-center"></div>
        </div>
        <hr />
      </nav>

      <div className="container-fluid bg-gray-100">
        {/* Contact Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40" style={{ paddingTop: '100px' }}>
            <div className="bg-white m-auto mt-[15%] p-5 border border-gray-300 w-[30%]">
              <div className="text-right">
                <span className="text-gray-400 text-2xl font-bold cursor-pointer" onClick={() => setShowModal(false)}>
                  &times;
                </span>
              </div>
              <div className="flex">
                <div className="w-1/2">
                  <h6 className="text-lg">
                    <FontAwesomeIcon icon={faWhatsapp} className="animate-pulse text-green-600 text-xl" />
                    &nbsp;&nbsp;Contact Number :
                  </h6>
                </div>
                <div className="w-1/2">
                  <p>+91- {propertyData.ownerPhone}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-wrap">
          {/* Thumbnails */}
          <div className="w-full md:w-1/12">
            {propertyData.images.map((img, index) => (
              <div className="mt-2" key={index}>
                <div className="p-2">
                  <div className="h-[10vh] border-2 border-black">
                    <img
                      className="thumbnail h-full w-full object-cover cursor-pointer hover:border-2 hover:border-red-900/20"
                      src={img}
                      alt="img"
                      onMouseEnter={() => handleThumbnailHover(img)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Main Image */}
          <div className="w-full md:w-5/12 p-1">
            <div className="mt-5 bg-gray-100 h-[70vh] rounded-lg">
              <img
                id="displayedImage"
                src={displayedImage}
                className="h-full w-full rounded-lg object-cover"
                alt="Flat Image"
              />
            </div>
          </div>

          {/* Details */}
          <div className="w-full md:w-6/12">
            <div className="flex">
              <span className="font-mono text-sm">
                <FontAwesomeIcon icon={faStar} className="animate-pulse text-sm mt-2 p-1 text-yellow-300" />
                &nbsp;
                <span id="average_rating">{averageRating}</span>&nbsp;|&nbsp;{totalReviews} reviews
              </span>
            </div>

            <div className="flex flex-wrap">
              <div className="w-full md:w-1/2">
                <h3 className="mt-2 font-montserrat text-2xl font-extrabold">{propertyData.type}</h3>
                This Property Belongs To <span className="text-blue-600 font-mono">{propertyData.owner}</span>
                <br />
                <span className="text-gray-500">
                  <FontAwesomeIcon icon={faLocationDot} className="text-sm text-red-600" />{' '}
                  {propertyData.address}, {propertyData.city}
                </span>
              </div>
              <div className="w-full md:w-1/2 text-right">
                <h3>
                  <span>
                    <FontAwesomeIcon icon={faIndianRupeeSign} className="text-sm text-black" />
                    &nbsp;{propertyData.price}
                  </span>
                </h3>
                {/* Assuming booked and approved logic - static for demo */}
                <button
                  className="rounded-full btn btn-warning btn-lg mt-2"
                  type="button"
                  onClick={() => setShowModal(true)}
                >
                  <FontAwesomeIcon icon={faPhone} className="text-xs text-black" />
                  &nbsp;&nbsp;Contact Owner
                </button>
                <form onSubmit={handleBookNow} id="book_status">
                  <button
                    id="bookNowButton"
                    className="rounded-full btn btn-warning btn-lg mt-2"
                    type="submit"
                  >
                    <FontAwesomeIcon icon={faHandshake} className="animate-pulse text-xs text-black" />
                    &nbsp;&nbsp;Book Now
                  </button>
                </form>
              </div>
            </div>

            <div className="m-5 mb-4 flex flex-wrap">
              <div className="w-full md:w-1/2">
                <span>
                  <h6 className="font-bold">House Number</h6>
                  <h6 className="font-normal">{propertyData.houseNo}</h6>
                </span>
                <br />
                <span>
                  <h6 className="font-bold">Ward Number</h6>
                  <h6 className="font-normal">{propertyData.wardNo}</h6>
                </span>
                <br />
                <span>
                  <h6 className="font-bold">State</h6>
                  <h6 className="font-normal">{propertyData.state}</h6>
                </span>
                <br />
              </div>
              <div className="w-full md:w-1/2">
                <span>
                  <h6 className="font-bold">City</h6>
                  <h6 className="font-normal">{propertyData.city}</h6>
                </span>
                <br />
                <span>
                  <h6 className="font-bold">Person Allowed</h6>
                  <h6 className="font-normal">{propertyData.personsAllowed}</h6>
                </span>
                <br />
              </div>
            </div>

            <div className="flex">
              <div className="border border-gray-200 mb-3 w-full">
                <div className="card-header font-mono bg-gray-100 p-2">About This Property</div>
                <div className="p-3">
                  <p className="text-gray-700">{propertyData.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Review Section */}
      <div className="bg-gray-100 h-12 p-2 mt-8">
        <h1 className="text-center text-xl font-sans">Give your precious feedback for others</h1>
      </div>
      <div className="container mt-12 ml-2">
        <div className="shadow-md rounded">
          <div className="p-4">
            <div className="flex flex-wrap">
              <div className="w-full sm:w-4/12 text-center">
                <h1 className="text-yellow-500 mt-4 mb-4 text-2xl font-bold">
                  <span id="average_rating">{averageRating}</span> / 5
                </h1>
                <div className="mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FontAwesomeIcon
                      key={star}
                      icon={faStar}
                      className={`text-gray-200 mr-1 ${star <= Math.ceil(averageRating) ? 'text-yellow-500' : ''}`}
                    />
                  ))}
                </div>
                <h3>
                  <span id="total_review">{totalReviews}</span> Review
                </h3>
              </div>
              <div className="w-full sm:w-4/12">
                {[5, 4, 3, 2, 1].map((star) => (
                  <p key={star}>
                    <div className="float-left mr-2 leading-4">
                      <b>{star}</b> <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
                    </div>
                    <div className="float-right ml-1 leading-4">
                      (<span id={`total_${star}_star_review`}>{starCounts[`${['', 'one', 'two', 'three', 'four', 'five'][star]}`]}</span>)
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded">
                      <div
                        className="h-full bg-yellow-500 rounded"
                        style={{ width: `${(starCounts[`${['', 'one', 'two', 'three', 'four', 'five'][star]}`] / totalReviews) * 100}%` }}
                      ></div>
                    </div>
                  </p>
                ))}
              </div>
              <div className="w-full sm:w-4/12 text-center">
                <h3 className="mt-4 mb-3">Write Review Here</h3>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setShowReviewModal(true)}
                >
                  Review
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5" id="review_content">
          {reviews.map((review, index) => (
            <div className="flex mb-3" key={index}>
              <div className="w-1/12">
                <div className="rounded-full bg-red-600 text-white pt-2 pb-2 text-center">
                  <h3>{review.userId.charAt(0)}</h3>
                </div>
              </div>
              <div className="w-11/12">
                <div className="shadow-md rounded">
                  <div className="p-2 font-bold">{review.userId}</div>
                  <div className="p-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FontAwesomeIcon
                        key={star}
                        icon={faStar}
                        className={`mr-1 ${star <= review.rating ? 'text-yellow-500' : 'text-gray-200'}`}
                      />
                    ))}
                    <br />
                    {review.review}
                  </div>
                  <div className="text-right p-2">On {review.datetime}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white w-1/2">
            <div className="p-2 flex justify-between">
              <h5 className="text-xl">Submit Review</h5>
              <button
                type="button"
                className="text-gray-400 text-xl"
                onClick={() => setShowReviewModal(false)}
              >
                <span>&times;</span>
              </button>
            </div>
            <div className="p-4">
              <h4 className="text-center mt-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FontAwesomeIcon
                    key={star}
                    icon={faStar}
                    className={`cursor-pointer mr-1 ${ratingData >= star ? 'text-yellow-500' : 'text-gray-200'}`}
                    onMouseEnter={() => setRatingData(star)}
                    onClick={() => setRatingData(star)}
                  />
                ))}
              </h4>
              <div className="mb-4">
                <textarea
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Type Review Here"
                  value={userReview}
                  onChange={(e) => setUserReview(e.target.value)}
                ></textarea>
              </div>
              <div className="text-center mt-4">
                <button type="button" className="btn btn-primary" onClick={handleSubmitReview}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PropertyDetail;