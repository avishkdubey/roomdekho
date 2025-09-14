import { 
  Facebook, 
  Linkedin, 
  Twitter, 
  MessageCircle,
  Instagram,
  Bath,
  Bed,
  Calculator,
  Calendar,
  Sofa,
  Handshake,
  Heart,
  IndianRupee,
  MapPin,
  Map,
  Car,
  Phone,
  Ruler,
  Share2,
  Star,
  ChevronLeft,
  ChevronRight,
  Eye,
  Download,
  Wifi,
  Snowflake,
  Shield,
  Dumbbell,
  Waves,
  Maximize,
  X,
  Camera,
  Play,
  Check,
  Bookmark,
  Flag,
  TrendingUp,
  Printer,
  Copy,
  Mail,
  User,
  Home,
  Building,
  Users,
  Clock,
  Award,
  Navigation,
  School,
  Hospital,
  ShoppingBag,
  Train
} from 'lucide-react';
import { useState, useEffect } from 'react';

// Enhanced property data with more realistic details
const propertyData = {
  id: 1,
  images: [
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80',
  ],  
  type: 'Luxury 2BHK Apartment',
  owner: 'Abhishek Dubey',
  ownerImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
  address: '123 Sunshine Apartments, Maharaj Bada',
  city: 'Gwalior',
  state: 'Madhya Pradesh',
  price: 75000,
  originalPrice: 85000,
  houseNo: 'A-42',
  wardNo: 'Ward 5',
  personsAllowed: 4,
  beds: 2,
  baths: 2,
  sqft: 1200,
  yearBuilt: 2019,
  furnishing: 'Fully Furnished',
  parking: '2 Car Parks',
  balcony: 2,
  floor: '7th of 12',
  facing: 'North-East',
  amenities: [
    { name: 'AC', icon: Snowflake, color: 'text-blue-500' },
    { name: 'WiFi', icon: Wifi, color: 'text-green-500' },
    { name: 'Swimming Pool', icon: Waves, color: 'text-blue-400' },
    { name: 'Gym', icon: Dumbbell, color: 'text-red-500' },
    { name: '24/7 Security', icon: Shield, color: 'text-gray-600' },
  ],
  description: 'Experience luxury living in this stunning 2BHK apartment located in the heart of Gwalior. This meticulously designed space features premium finishes, modern amenities, and breathtaking city views. Perfect for professionals and families seeking comfort, convenience, and style.',
  ownerPhone: '+91-9876543210',
  location: { lat: 26.2183, lng: 78.1828 },
  virtualTourUrl: 'https://example.com/virtual-tour',
  neighborhood: 'Prime location with easy access to schools, hospitals, shopping centers, and metro stations. Safe, well-connected area with 24/7 security.',
  highlights: [
    'Recently Renovated',
    'Premium Location',
    'Fully Furnished',
    'Immediate Possession',
    '24/7 Power Backup'
  ],
  priceHistory: [
    { month: 'Jan 2024', price: 70000 },
    { month: 'Mar 2024', price: 72000 },
    { month: 'Jun 2024', price: 75000 },
    { month: 'Sep 2024', price: 75000 },
  ],
  nearbyPlaces: [
    { name: 'Metro Station', distance: '0.5 km', type: 'transport', icon: Train },
    { name: 'City Hospital', distance: '1.2 km', type: 'healthcare', icon: Hospital },
    { name: 'Phoenix Mall', distance: '2.1 km', type: 'shopping', icon: ShoppingBag },
    { name: 'DAV Public School', distance: '0.8 km', type: 'education', icon: School },
  ]
};

const similarProperties = [
  {
    id: 2,
    type: '1BHK Apartment',
    price: 45000,
    address: '456 Moonlight Residences, Gwalior',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=600&h=400&fit=crop',
    beds: 1,
    baths: 1,
    sqft: 800,
    rating: 4.2
  },
  {
    id: 3,
    type: '3BHK Villa',
    price: 125000,
    address: '789 Starlight Villas, Gwalior',
    image: 'https://images.unsplash.com/photo-1600607687483-6f91e4d9dba3?w=600&h=400&fit=crop',
    beds: 3,
    baths: 3,
    sqft: 1800,
    rating: 4.8
  },
  {
    id: 4,
    type: '2BHK Flat',
    price: 68000,
    address: '101 Rainbow Towers, Gwalior',
    image: 'https://images.unsplash.com/photo-1560184897-67f4b86aa24e?w=600&h=400&fit=crop',
    beds: 2,
    baths: 2,
    sqft: 1100,
    rating: 4.5
  },
];

const initialReviews = [
  { 
    userId: 'Priya Sharma', 
    rating: 5, 
    review: 'Absolutely love this property! Great location and amazing amenities. The owner is very responsive and helpful.',
    datetime: '2025-09-01',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b1e5?w=50&h=50&fit=crop&crop=face'
  },
  { 
    userId: 'Rajesh Kumar', 
    rating: 4, 
    review: 'Good value for money. The apartment is well-maintained and has all modern facilities. Parking could be better.',
    datetime: '2025-08-15',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face'
  },
  { 
    userId: 'Anita Joshi', 
    rating: 4, 
    review: 'Beautiful property with great views. The neighborhood is safe and well-connected. Highly recommend!',
    datetime: '2025-07-20',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face'
  },
];

const PropertyDetail = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [ratingData, setRatingData] = useState(0);
  const [userReview, setUserReview] = useState('');
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [starCounts, setStarCounts] = useState({ five: 0, four: 0, three: 0, two: 0, one: 0 });
  const [reviews, setReviews] = useState(initialReviews);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showCalculatorModal, setShowCalculatorModal] = useState(false);
  const [loanAmount, setLoanAmount] = useState(propertyData.price * 10);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTerm, setLoanTerm] = useState(20);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [showPriceHistory, setShowPriceHistory] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [viewCount, setViewCount] = useState(1247);

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

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % propertyData.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + propertyData.images.length) % propertyData.images.length);
  };

  const handleBookNow = (e) => {
    e.preventDefault();
    alert('🎉 Booking request sent successfully! The owner will contact you within 24 hours.');
  };

  const handleSubmitReview = () => {
    if (!userReview || ratingData === 0) {
      alert('Please select a rating and fill the review field');
      return;
    }
    const newReview = {
      userId: 'You',
      rating: ratingData,
      review: userReview,
      datetime: new Date().toISOString().split('T')[0],
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face'
    };
    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);
    setUserReview('');
    setRatingData(0);
    setShowReviewModal(false);

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

    alert('✅ Review submitted successfully!');
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    const message = isFavorite ? '💔 Removed from favorites' : '❤️ Added to favorites';
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 px-6 py-3 rounded-lg text-white font-semibold transform transition-all duration-500 ${
      isFavorite ? 'bg-red-500' : 'bg-green-500'
    }`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => document.body.removeChild(notification), 500);
    }, 2000);
  };

  const calculateMortgage = () => {
    const principal = loanAmount;
    const monthlyInterest = interestRate / 100 / 12;
    const payments = loanTerm * 12;
    const x = Math.pow(1 + monthlyInterest, payments);
    const monthly = (principal * x * monthlyInterest) / (x - 1);
    setMonthlyPayment(monthly.toFixed(2));
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('🔗 Property link copied to clipboard!');
  };

  const StarRating = ({ rating, interactive = false, onRate = null, size = 'w-5 h-5' }) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${size} ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            } ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
            onClick={() => interactive && onRate && onRate(star)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-blue-50 min-h-screen">
      {/* Hero Section with Enhanced Image Gallery */}
      <div className="relative">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Main Image Section */}
            <div className="lg:col-span-8 relative">
              <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={propertyData.images[currentImageIndex]}
                  alt="Property"
                  className="w-full h-full object-cover transition-all duration-700"
                />
                
                {/* Image Navigation */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Image Counter */}
                <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {propertyData.images.length}
                </div>

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button
                    onClick={() => setShowImageModal(true)}
                    className="bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
                  >
                    <Maximize className="w-5 h-5" />
                  </button>
                  <button
                    onClick={toggleFavorite}
                    className={`p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${
                      isFavorite 
                        ? 'bg-red-500 text-white' 
                        : 'bg-white/90 hover:bg-white text-gray-800'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Virtual Tour Badge */}
                <div className="absolute bottom-4 right-4">
                  <a
                    href={propertyData.virtualTourUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg flex items-center"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Virtual Tour
                  </a>
                </div>
              </div>

              {/* Thumbnail Gallery */}
              <div className="flex space-x-2 mt-4 overflow-x-auto pb-2">
                {propertyData.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden transition-all duration-300 ${
                      index === currentImageIndex 
                        ? 'ring-3 ring-blue-500 transform scale-105' 
                        : 'hover:ring-2 ring-gray-300'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Property Info Card */}
            <div className="lg:col-span-4">
              <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <StarRating rating={Math.round(averageRating)} />
                    <span className="ml-1 font-semibold">{averageRating}</span>
                    <span className="text-gray-500">({totalReviews} reviews)</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Eye className="w-4 h-4 mr-1" />
                    {viewCount} views
                  </div>
                </div>

                <h1 className="text-2xl font-bold mb-2 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  {propertyData.type}
                </h1>
                
                <p className="text-gray-600 flex items-center mb-4">
                  <MapPin className="text-red-500 w-4 h-4 mr-2" />
                  {propertyData.address}, {propertyData.city}
                </p>

                {/* Price Section */}
                <div className="mb-6">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-3xl font-bold text-green-600 flex items-center">
                      <IndianRupee className="w-6 h-6" />
                      {propertyData.price.toLocaleString()}/month
                    </span>
                    {propertyData.originalPrice && (
                      <span className="text-lg text-gray-400 line-through">
                        ₹{propertyData.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => setShowPriceHistory(true)}
                    className="text-blue-600 hover:text-blue-800 text-sm flex items-center transition-colors"
                  >
                    <TrendingUp className="w-4 h-4 mr-1" />
                    View Price History
                  </button>
                </div>

                {/* Key Features */}
                <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
                  <div className="text-center">
                    <Bed className="text-blue-500 w-6 h-6 mx-auto mb-1" />
                    <p className="text-sm text-gray-600">Bedrooms</p>
                    <p className="font-semibold">{propertyData.beds}</p>
                  </div>
                  <div className="text-center">
                    <Bath className="text-blue-500 w-6 h-6 mx-auto mb-1" />
                    <p className="text-sm text-gray-600">Bathrooms</p>
                    <p className="font-semibold">{propertyData.baths}</p>
                  </div>
                  <div className="text-center">
                    <Ruler className="text-blue-500 w-6 h-6 mx-auto mb-1" />
                    <p className="text-sm text-gray-600">Area</p>
                    <p className="font-semibold">{propertyData.sqft} sq ft</p>
                  </div>
                  <div className="text-center">
                    <Car className="text-blue-500 w-6 h-6 mx-auto mb-1" />
                    <p className="text-sm text-gray-600">Parking</p>
                    <p className="font-semibold text-xs">{propertyData.parking}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={() => setShowContactModal(true)}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-[1.02] shadow-lg flex items-center justify-center"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Contact Owner
                  </button>
                  
                  <div className="flex space-x-3">
                    <button
                      onClick={handleBookNow}
                      className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-[1.02] shadow-lg flex items-center justify-center"
                    >
                      <Handshake className="w-5 h-5 mr-2" />
                      Book Now
                    </button>
                    
                    <button
                      onClick={() => setIsBookmarked(!isBookmarked)}
                      className={`px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg ${
                        isBookmarked
                          ? 'bg-yellow-500 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
                    </button>
                    
                    <button
                      onClick={() => setShowShareModal(true)}
                      className="px-4 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
                    >
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Owner Info */}
                <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <img
                      src={propertyData.ownerImage}
                      alt="Owner"
                      className="w-12 h-12 rounded-full border-2 border-white shadow-md"
                    />
                    <div>
                      <p className="font-semibold text-gray-800">{propertyData.owner}</p>
                      <p className="text-sm text-gray-600">Property Owner</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Tab Navigation */}
          <div className="flex border-b bg-gray-50 overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview', icon: Eye },
              { id: 'amenities', label: 'Amenities', icon: Sofa },
              { id: 'location', label: 'Location', icon: Map },
              { id: 'reviews', label: 'Reviews', icon: Star },
              { id: 'similar', label: 'Similar Properties', icon: Building }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-4 font-medium transition-all duration-300 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-white'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Highlights */}
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-800">Property Highlights</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {propertyData.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-center space-x-3 p-4 bg-green-50 rounded-xl">
                        <Check className="text-green-500 w-5 h-5" />
                        <span className="font-medium text-gray-800">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-800">About This Property</h3>
                  <p className="text-gray-700 leading-relaxed text-lg">{propertyData.description}</p>
                </div>

                {/* Detailed Info */}
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-800">Property Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      { label: 'House No', value: propertyData.houseNo, icon: MapPin },
                      { label: 'Ward No', value: propertyData.wardNo, icon: Flag },
                      { label: 'Floor', value: propertyData.floor, icon: Building },
                      { label: 'Year Built', value: propertyData.yearBuilt, icon: Calendar },
                      { label: 'Furnishing', value: propertyData.furnishing, icon: Sofa },
                      { label: 'Facing', value: propertyData.facing, icon: Navigation },
                      { label: 'Balcony', value: `${propertyData.balcony} Balconies`, icon: Eye },
                      { label: 'Max Occupancy', value: `${propertyData.personsAllowed} Persons`, icon: Users }
                    ].map((detail, index) => (
                      <div key={index} className="p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl">
                        <div className="flex items-center space-x-3">
                          <detail.icon className="text-blue-500 w-5 h-5" />
                          <div>
                            <p className="text-sm text-gray-600">{detail.label}</p>
                            <p className="font-semibold text-gray-800">{detail.value}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mortgage Calculator */}
                <div className="p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl">
                  <h3 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
                    <Calculator className="w-6 h-6 mr-2 text-blue-500" />
                    Mortgage Calculator
                  </h3>
                  <button 
                    onClick={() => setShowCalculatorModal(true)} 
                    className="bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 transition-all duration-300 font-semibold shadow-lg"
                  >
                    Calculate EMI
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'amenities' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-800">Amenities & Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {propertyData.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center space-x-4 p-6 bg-gradient-to-r from-white to-blue-50 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                      <div className={`p-3 rounded-full bg-blue-100 ${amenity.color}`}>
                        <amenity.icon className="w-6 h-6" />
                      </div>
                      <span className="font-semibold text-gray-800 text-lg">{amenity.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'location' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-800">Location & Neighborhood</h3>
                  <p className="text-gray-700 text-lg mb-6">{propertyData.neighborhood}</p>
                </div>

                {/* Map Placeholder */}
                <div className="h-80 bg-gray-200 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <Map className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-500">Interactive Map View</p>
                    <p className="text-sm text-gray-400">Location: {propertyData.city}, {propertyData.state}</p>
                  </div>
                </div>

                {/* Nearby Places */}
                <div>
                  <h4 className="text-xl font-bold mb-4 text-gray-800">Nearby Places</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {propertyData.nearbyPlaces.map((place, index) => (
                      <div key={index} className="flex items-center space-x-4 p-4 bg-white border rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                        <place.icon className="w-8 h-8 text-blue-500" />
                        <div>
                          <p className="font-semibold text-gray-800">{place.name}</p>
                          <p className="text-sm text-gray-600">{place.distance} away</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-8">
                {/* Review Summary */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <h1 className="text-4xl font-bold text-blue-600">{averageRating} / 5</h1>
                      <StarRating rating={Math.round(averageRating)} size="w-6 h-6" />
                      <p className="text-gray-600 mt-2">{totalReviews} Reviews</p>
                    </div>
                    <div>
                      {[5, 4, 3, 2, 1].map((star) => (
                        <div key={star} className="mb-2">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="flex items-center">
                              {star} <Star className="w-4 h-4 text-yellow-500 ml-1" />
                            </span>
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
                        className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 font-semibold shadow-lg"
                      >
                        Write a Review
                      </button>
                    </div>
                  </div>
                </div>

                {/* Reviews List */}
                <div className="space-y-4">
                  {reviews.map((review, index) => (
                    <div key={index} className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition-all duration-300">
                      <div className="flex items-center mb-4">
                        <img 
                          src={review.avatar} 
                          alt={review.userId}
                          className="w-12 h-12 rounded-full mr-4 border-2 border-gray-200"
                        />
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-800">{review.userId}</h4>
                          <div className="flex items-center space-x-2">
                            <StarRating rating={review.rating} size="w-4 h-4" />
                            <span className="text-sm text-gray-500">{review.datetime}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{review.review}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'similar' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-800">Similar Properties</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {similarProperties.map((prop) => (
                    <div key={prop.id} className="bg-white shadow-lg rounded-xl overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
                      <div className="relative">
                        <img src={prop.image} alt={prop.type} className="w-full h-48 object-cover" />
                        <div className="absolute top-4 right-4">
                          <div className="bg-white/90 px-2 py-1 rounded-full flex items-center">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="ml-1 text-sm font-semibold">{prop.rating}</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-lg mb-2">{prop.type}</h3>
                        <p className="text-gray-600 text-sm mb-3 flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {prop.address}
                        </p>
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-2xl font-bold text-green-600 flex items-center">
                            <IndianRupee className="w-5 h-5" />
                            {prop.price.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm text-gray-600">
                          <span className="flex items-center">
                            <Bed className="w-4 h-4 mr-1" />
                            {prop.beds} beds
                          </span>
                          <span className="flex items-center">
                            <Bath className="w-4 h-4 mr-1" />
                            {prop.baths} baths
                          </span>
                          <span className="flex items-center">
                            <Ruler className="w-4 h-4 mr-1" />
                            {prop.sqft} sqft
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Contact Owner</h3>
                <button 
                  onClick={() => setShowContactModal(false)} 
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-xl">
                  <MessageCircle className="w-8 h-8 text-green-500" />
                  <div>
                    <p className="font-semibold">WhatsApp</p>
                    <p className="text-green-600">{propertyData.ownerPhone}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-xl">
                  <Phone className="w-8 h-8 text-blue-500" />
                  <div>
                    <p className="font-semibold">Call</p>
                    <p className="text-blue-600">{propertyData.ownerPhone}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-xl">
                  <Mail className="w-8 h-8 text-purple-500" />
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-purple-600">owner@example.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Share This Property</h3>
                <button 
                  onClick={() => setShowShareModal(false)} 
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <button className="flex items-center justify-center space-x-2 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
                  <Facebook className="w-6 h-6 text-blue-600" />
                  <span>Facebook</span>
                </button>
                <button className="flex items-center justify-center space-x-2 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
                  <Twitter className="w-6 h-6 text-blue-400" />
                  <span>Twitter</span>
                </button>
                <button className="flex items-center justify-center space-x-2 p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-colors">
                  <MessageCircle className="w-6 h-6 text-green-500" />
                  <span>WhatsApp</span>
                </button>
                <button className="flex items-center justify-center space-x-2 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
                  <Linkedin className="w-6 h-6 text-blue-700" />
                  <span>LinkedIn</span>
                </button>
              </div>
              
              <button 
                onClick={copyLink}
                className="w-full flex items-center justify-center space-x-2 p-3 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
              >
                <Copy className="w-5 h-5" />
                <span>Copy Link</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Write a Review</h3>
                <button 
                  onClick={() => setShowReviewModal(false)} 
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-gray-600 mb-3">Rate this property</p>
                  <StarRating 
                    rating={ratingData} 
                    interactive={true} 
                    onRate={setRatingData}
                    size="w-8 h-8"
                  />
                </div>
                
                <textarea
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Share your experience about this property..."
                  value={userReview}
                  onChange={(e) => setUserReview(e.target.value)}
                  rows="4"
                />
                
                <button 
                  onClick={handleSubmitReview} 
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 font-semibold"
                >
                  Submit Review
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mortgage Calculator Modal */}
      {showCalculatorModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800 flex items-center">
                  <Calculator className="w-6 h-6 mr-2 text-blue-500" />
                  EMI Calculator
                </h3>
                <button 
                  onClick={() => setShowCalculatorModal(false)} 
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Loan Amount (₹)
                  </label>
                  <input
                    type="number"
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(parseFloat(e.target.value))}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Interest Rate (% per annum)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={interestRate}
                    onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Loan Term (Years)
                  </label>
                  <input
                    type="number"
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(parseFloat(e.target.value))}
                  />
                </div>
                
                <button 
                  onClick={calculateMortgage} 
                  className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 rounded-xl hover:from-green-600 hover:to-blue-600 transition-all duration-300 font-semibold"
                >
                  Calculate EMI
                </button>
                
                {monthlyPayment > 0 && (
                  <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl text-center">
                    <p className="text-sm text-gray-600">Monthly EMI</p>
                    <p className="text-2xl font-bold text-green-600 flex items-center justify-center">
                      <IndianRupee className="w-6 h-6" />
                      {monthlyPayment}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Image Modal */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <button 
              onClick={() => setShowImageModal(false)} 
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
            >
              <X className="w-8 h-8" />
            </button>
            
            <img
              src={propertyData.images[currentImageIndex]}
              alt="Property"
              className="max-w-full max-h-full object-contain"
            />
            
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
            >
              <ChevronLeft className="w-12 h-12" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
            >
              <ChevronRight className="w-12 h-12" />
            </button>
          </div>
        </div>
      )}

      {/* Price History Modal */}
      {showPriceHistory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800 flex items-center">
                  <TrendingUp className="w-6 h-6 mr-2 text-blue-500" />
                  Price History
                </h3>
                <button 
                  onClick={() => setShowPriceHistory(false)} 
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-3">
                {propertyData.priceHistory.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                    <span className="font-medium text-gray-700">{item.month}</span>
                    <span className="font-bold text-green-600 flex items-center">
                      <IndianRupee className="w-4 h-4" />
                      {item.price.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetail;