import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  MapPin, 
  IndianRupee, 
  Bed, 
  Bath, 
  Square, 
  Heart, 
  Share2, 
  Phone, 
  MessageSquare, 
  Star,
  ChevronDown,
  X,
  Eye,
  Bookmark
} from 'lucide-react';

// Sample property data with enhanced details
const properties = [
  {
    id: 1,
    images: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'],
    price: 7500,
    originalPrice: 8500,
    type: '2BHK Flat',
    location: 'City Center, Gwalior',
    area: 850,
    bedrooms: 2,
    bathrooms: 2,
    details: 'A spacious and modern flat perfect for families with premium amenities.',
    rating: 4.8,
    reviews: 24,
    featured: true,
    amenities: ['Parking', 'Security', 'Gym', 'Swimming Pool'],
    furnished: 'Semi-Furnished',
    floor: '3rd Floor',
    age: '2 years',
    available: '15 Dec 2024'
  },
  {
    id: 2,
    images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'],
    price: 4000,
    originalPrice: null,
    type: '1RK Room',
    location: 'Thatipur, Gwalior',
    area: 350,
    bedrooms: 1,
    bathrooms: 1,
    details: 'Ideal for students, close to coaching centers and transportation.',
    rating: 4.3,
    reviews: 12,
    featured: false,
    amenities: ['WiFi', 'Security', 'Power Backup'],
    furnished: 'Fully Furnished',
    floor: '2nd Floor',
    age: '1 year',
    available: 'Immediate'
  },
  {
    id: 3,
    images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'],
    price: 12000,
    originalPrice: 13500,
    type: '3BHK Apartment',
    location: 'Morar, Gwalior',
    area: 1200,
    bedrooms: 3,
    bathrooms: 3,
    details: 'Luxurious apartment with all modern amenities and great view.',
    rating: 4.9,
    reviews: 38,
    featured: true,
    amenities: ['Parking', 'Security', 'Gym', 'Swimming Pool', 'Garden', 'Club House'],
    furnished: 'Semi-Furnished',
    floor: '8th Floor',
    age: 'Under Construction',
    available: 'Jan 2025'
  },
  {
    id: 4,
    images: ['https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'],
    price: 5500,
    originalPrice: null,
    type: '1BHK Flat',
    location: 'Lashkar, Gwalior',
    area: 500,
    bedrooms: 1,
    bathrooms: 1,
    details: 'Cozy and affordable, located in a prime area with easy access.',
    rating: 4.5,
    reviews: 18,
    featured: false,
    amenities: ['Parking', 'Security', 'Power Backup'],
    furnished: 'Unfurnished',
    floor: '4th Floor',
    age: '5 years',
    available: '20 Dec 2024'
  }
];

const advertisements = [
  {
    id: 1,
    title: "Premium Home Loans",
    subtitle: "Get instant approval with lowest interest rates",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    cta: "Apply Now",
    offer: "Starting from 8.5% p.a."
  },
  {
    id: 2,
    title: "Property Insurance",
    subtitle: "Protect your investment with comprehensive coverage",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1973&q=80",
    cta: "Get Quote",
    offer: "Up to 50% off"
  }
];

const ViewProperties = () => {
  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState(new Set());
  const [sortBy, setSortBy] = useState('featured');
  
  const [filters, setFilters] = useState({
    bhkType: '',
    priceRange: '',
    location: '',
    furnished: '',
    amenities: []
  });

  const toggleFavorite = (id) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const formatPrice = (price) => {
    return price.toLocaleString('en-IN');
  };

  const PropertyCard = ({ property }) => (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group">
      {/* Property Image */}
      <div className="relative overflow-hidden">
        <img 
          src={property.images[0]} 
          alt={property.type}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {property.featured && (
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              Featured
            </span>
          )}
          {property.originalPrice && (
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              ₹{formatPrice(property.originalPrice - property.price)} Off
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <button 
            onClick={() => toggleFavorite(property.id)}
            className={`p-2 rounded-full backdrop-blur-sm transition-all ${
              favorites.has(property.id) 
                ? 'bg-red-500 text-white' 
                : 'bg-white/80 text-gray-600 hover:bg-red-50 hover:text-red-500'
            }`}
          >
            <Heart className="w-4 h-4" fill={favorites.has(property.id) ? 'currentColor' : 'none'} />
          </button>
          <button className="p-2 rounded-full bg-white/80 backdrop-blur-sm text-gray-600 hover:bg-blue-50 hover:text-blue-500 transition-all">
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Stats */}
        <div className="absolute bottom-4 left-4 flex gap-2">
          <div className="bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs flex items-center gap-1">
            <Eye className="w-3 h-3" />
            <span>128 views</span>
          </div>
          <div className="bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs flex items-center gap-1">
            <Bookmark className="w-3 h-3" />
            <span>12 saved</span>
          </div>
        </div>
      </div>

      {/* Property Details */}
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-1">{property.type}</h3>
            <div className="flex items-center text-gray-600 text-sm mb-2">
              <MapPin className="w-4 h-4 mr-1" />
              {property.location}
            </div>
          </div>
          <div className="flex items-center bg-green-50 px-2 py-1 rounded-lg">
            <Star className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" />
            <span className="text-sm font-semibold text-gray-700">{property.rating}</span>
            <span className="text-xs text-gray-500 ml-1">({property.reviews})</span>
          </div>
        </div>

        {/* Property Stats */}
        <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-gray-50 rounded-xl">
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Bed className="w-4 h-4 text-gray-600" />
            </div>
            <span className="text-sm font-semibold text-gray-800">{property.bedrooms} BHK</span>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Bath className="w-4 h-4 text-gray-600" />
            </div>
            <span className="text-sm font-semibold text-gray-800">{property.bathrooms} Bath</span>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Square className="w-4 h-4 text-gray-600" />
            </div>
            <span className="text-sm font-semibold text-gray-800">{property.area} sq ft</span>
          </div>
        </div>

        {/* Amenities */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {property.amenities.slice(0, 3).map((amenity, index) => (
              <span key={index} className="bg-blue-50 text-blue-700 px-2 py-1 rounded-lg text-xs">
                {amenity}
              </span>
            ))}
            {property.amenities.length > 3 && (
              <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-lg text-xs">
                +{property.amenities.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Additional Info */}
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div>
            <span className="text-gray-500">Furnished:</span>
            <span className="font-semibold text-gray-800 ml-1">{property.furnished}</span>
          </div>
          <div>
            <span className="text-gray-500">Floor:</span>
            <span className="font-semibold text-gray-800 ml-1">{property.floor}</span>
          </div>
          <div>
            <span className="text-gray-500">Age:</span>
            <span className="font-semibold text-gray-800 ml-1">{property.age}</span>
          </div>
          <div>
            <span className="text-gray-500">Available:</span>
            <span className="font-semibold text-green-600 ml-1">{property.available}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-6 line-clamp-2">{property.details}</p>

        {/* Price and Actions */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-gray-800 flex items-center">
                <IndianRupee className="w-5 h-5 mr-1" />
                {formatPrice(property.price)}
              </span>
              {property.originalPrice && (
                <span className="text-lg text-gray-400 line-through">
                  ₹{formatPrice(property.originalPrice)}
                </span>
              )}
            </div>
            <span className="text-sm text-gray-500">/month</span>
          </div>
          
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-semibold">
              <Phone className="w-4 h-4" />
              Call
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold">
              <MessageSquare className="w-4 h-4" />
              Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const AdCard = ({ ad }) => (
    <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl overflow-hidden text-white shadow-lg hover:shadow-xl transition-all duration-300 group">
      <div className="relative h-32 overflow-hidden">
        <img 
          src={ad.image} 
          alt={ad.title}
          className="w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-purple-700/80"></div>
      </div>
      <div className="p-6 -mt-8 relative z-10">
        <h3 className="text-xl font-bold mb-2">{ad.title}</h3>
        <p className="text-blue-100 text-sm mb-3">{ad.subtitle}</p>
        <div className="flex items-center justify-between">
          <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold">
            {ad.offer}
          </span>
          <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-sm">
            {ad.cta}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Properties in Gwalior</h1>
              <p className="text-gray-600">{filteredProperties.length} properties found</p>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Sort */}
              <div className="relative">
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer pr-8"
                >
                  <option value="featured">Featured First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest First</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
              
              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                <Filter className="w-4 h-4" />
                Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Advanced Filters Sidebar */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block flex-shrink-0`}>
            <div className="w-80 bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">Filters</h2>
                <button
                  onClick={() => setShowFilters(false)}
                  className="lg:hidden p-1 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Search */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Search Location</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Enter location..."
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* BHK Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Property Type</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['1 RK', '1 BHK', '2 BHK', '3 BHK', '4+ BHK', 'Studio'].map((type) => (
                      <button
                        key={type}
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:border-blue-500 hover:bg-blue-50 transition-colors focus:ring-2 focus:ring-blue-500"
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Price Range</label>
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="number"
                        placeholder="Min"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      />
                      <input
                        type="number"
                        placeholder="Max"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      />
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {['< ₹5K', '₹5K-10K', '₹10K-15K', '₹15K+'].map((range) => (
                        <button
                          key={range}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs hover:bg-blue-100 hover:text-blue-700 transition-colors"
                        >
                          {range}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Furnished Status */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Furnished Status</label>
                  <div className="space-y-2">
                    {['Fully Furnished', 'Semi-Furnished', 'Unfurnished'].map((status) => (
                      <label key={status} className="flex items-center">
                        <input type="radio" name="furnished" className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300" />
                        <span className="ml-3 text-sm text-gray-700">{status}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Amenities</label>
                  <div className="space-y-2">
                    {['Parking', 'Security', 'Gym', 'Swimming Pool', 'Garden', 'Power Backup'].map((amenity) => (
                      <label key={amenity} className="flex items-center">
                        <input type="checkbox" className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                        <span className="ml-3 text-sm text-gray-700">{amenity}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Apply Button */}
                <div className="pt-4 border-t border-gray-200">
                  <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
                    Apply Filters
                  </button>
                  <button className="w-full mt-2 bg-gray-100 text-gray-700 py-2 rounded-xl font-medium hover:bg-gray-200 transition-colors">
                    Clear All
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Advertisement Section */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Featured Services</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {advertisements.map((ad) => (
                  <AdCard key={ad.id} ad={ad} />
                ))}
              </div>
            </div>

            {/* Property Listings */}
            <div className="space-y-6">
              {filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <button className="bg-white border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-blue-600 hover:text-white transition-colors">
                Load More Properties
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProperties;