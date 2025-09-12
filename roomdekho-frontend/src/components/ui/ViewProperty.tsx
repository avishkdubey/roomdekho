import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  MapPin, 
  IndianRupee, 
  Heart, 
  Share2, 
  Star,
  ChevronDown,
  X,
  Eye,
  Menu
} from 'lucide-react';

// Sample property data with cleaner structure
const properties = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    price: 7500,
    originalPrice: 8500,
    type: '2BHK Flat',
    location: 'City Center, Gwalior',
    area: 850,
    bedrooms: 2,
    bathrooms: 2,
    rating: 4.8,
    reviews: 24,
    featured: true,
    furnished: 'Semi-Furnished',
    available: 'Available Now'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    price: 4000,
    originalPrice: null,
    type: '1RK Room',
    location: 'Thatipur, Gwalior',
    area: 350,
    bedrooms: 1,
    bathrooms: 1,
    rating: 4.3,
    reviews: 12,
    featured: false,
    furnished: 'Fully Furnished',
    available: 'Available Now'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    price: 12000,
    originalPrice: 13500,
    type: '3BHK Apartment',
    location: 'Morar, Gwalior',
    area: 1200,
    bedrooms: 3,
    bathrooms: 3,
    rating: 4.9,
    reviews: 38,
    featured: true,
    furnished: 'Semi-Furnished',
    available: 'Jan 2025'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    price: 5500,
    originalPrice: null,
    type: '1BHK Flat',
    location: 'Lashkar, Gwalior',
    area: 500,
    bedrooms: 1,
    bathrooms: 1,
    rating: 4.5,
    reviews: 18,
    featured: false,
    furnished: 'Unfurnished',
    available: '20 Dec 2024'
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    price: 9000,
    originalPrice: null,
    type: '2BHK Villa',
    location: 'Hazira, Gwalior',
    area: 950,
    bedrooms: 2,
    bathrooms: 2,
    rating: 4.6,
    reviews: 15,
    featured: false,
    furnished: 'Fully Furnished',
    available: 'Available Now'
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    price: 15000,
    originalPrice: 16500,
    type: '4BHK House',
    location: 'Maharaj Bada, Gwalior',
    area: 1800,
    bedrooms: 4,
    bathrooms: 4,
    rating: 4.7,
    reviews: 22,
    featured: true,
    furnished: 'Semi-Furnished',
    available: 'Feb 2025'
  }
];

const advertisements = [
  {
    id: 1,
    title: "Premium Home Loans",
    subtitle: "Get instant approval with lowest interest rates",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    cta: "Apply Now",
    offer: "Starting from 8.5% p.a.",
    gradient: "from-yellow-500 to-orange-600"
  },
  {
    id: 2,
    title: "Property Insurance",
    subtitle: "Protect your investment with comprehensive coverage",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1973&q=80",
    cta: "Get Quote",
    offer: "Up to 50% off",
    gradient: "from-orange-500 to-red-600"
  }
];

const ViewProperties = () => {
  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState(new Set());
  const [sortBy, setSortBy] = useState('featured');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
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

  const handleViewProperty = (propertyId) => {
    console.log(`View property ${propertyId}`);
    // This will navigate to the detailed property page
    // For now, we'll just log it - you can implement routing here
  };

  const PropertyCard = ({ property }) => (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 group">
      {/* Property Image */}
      <div className="relative overflow-hidden h-48 sm:h-56 md:h-48 lg:h-56">
        <img 
          src={property.image} 
          alt={property.type}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3">
          {property.featured && (
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              Featured
            </span>
          )}
        </div>

        {/* Discount Badge */}
        {property.originalPrice && (
          <div className="absolute top-3 right-3">
            <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              ₹{formatPrice(property.originalPrice - property.price)} Off
            </span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(property.id);
            }}
            className={`p-2 rounded-full backdrop-blur-sm transition-all ${
              favorites.has(property.id) 
                ? 'bg-red-500 text-white' 
                : 'bg-white/80 text-gray-600 hover:bg-red-50 hover:text-red-500'
            }`}
          >
            <Heart className="w-4 h-4" fill={favorites.has(property.id) ? 'currentColor' : 'none'} />
          </button>
          <button className="p-2 rounded-full bg-white/80 backdrop-blur-sm text-gray-600 hover:bg-yellow-50 hover:text-yellow-600 transition-all">
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        {/* Views Counter */}
        <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs flex items-center gap-1">
          <Eye className="w-3 h-3" />
          <span>{Math.floor(Math.random() * 200) + 50} views</span>
        </div>
      </div>

      {/* Property Details */}
      <div className="p-4 sm:p-5">
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1 pr-2">
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-1 line-clamp-1">{property.type}</h3>
            <div className="flex items-center text-gray-600 text-sm">
              <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
              <span className="line-clamp-1">{property.location}</span>
            </div>
          </div>
          <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-lg flex-shrink-0">
            <Star className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" />
            <span className="text-sm font-semibold text-gray-700">{property.rating}</span>
          </div>
        </div>

        {/* Property Stats */}
        <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
          <span>{property.bedrooms} BHK</span>
          <span>•</span>
          <span>{property.area} sq ft</span>
          <span>•</span>
          <span className="line-clamp-1">{property.furnished}</span>
        </div>

        {/* Availability */}
        <div className="mb-4">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            {property.available}
          </span>
        </div>

        {/* Price and Action */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center">
                <IndianRupee className="w-4 h-4 sm:w-5 sm:h-5 mr-1" />
                {formatPrice(property.price)}
              </span>
              {property.originalPrice && (
                <span className="text-sm text-gray-400 line-through">
                  ₹{formatPrice(property.originalPrice)}
                </span>
              )}
            </div>
            <span className="text-xs sm:text-sm text-gray-500">/month</span>
          </div>
          
          <button 
            onClick={() => handleViewProperty(property.id)}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-colors text-sm sm:text-base"
          >
            View Property
          </button>
        </div>
      </div>
    </div>
  );

  const AdCard = ({ ad }) => (
    <div className={`bg-gradient-to-br ${ad.gradient} rounded-xl overflow-hidden text-white shadow-lg hover:shadow-xl transition-all duration-300 group`}>
      <div className="relative h-24 sm:h-32 overflow-hidden">
        <img 
          src={ad.image} 
          alt={ad.title}
          className="w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-300"
        />
        <div className={`absolute inset-0 bg-gradient-to-r ${ad.gradient}/80`}></div>
      </div>
      <div className="p-4 sm:p-6 -mt-6 sm:-mt-8 relative z-10">
        <h3 className="text-lg sm:text-xl font-bold mb-2">{ad.title}</h3>
        <p className="text-white/90 text-sm mb-3 line-clamp-2">{ad.subtitle}</p>
        <div className="flex items-center justify-between flex-wrap gap-2">
          <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold">
            {ad.offer}
          </span>
          <button className="bg-white text-gray-800 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm">
            {ad.cta}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 lg:hidden">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-800">Properties</h1>
              <p className="text-sm text-gray-600">{filteredProperties.length} found</p>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 bg-yellow-500 text-white px-3 py-2 rounded-lg font-semibold hover:bg-yellow-600 transition-colors text-sm"
              >
                <Filter className="w-4 h-4" />
                Filter
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-gray-600"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:block bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Properties in Gwalior</h1>
              <p className="text-gray-600">{filteredProperties.length} properties found</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium focus:ring-2 focus:ring-yellow-500 focus:border-transparent appearance-none cursor-pointer pr-8"
                >
                  <option value="featured">Featured First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-yellow-600 transition-colors"
              >
                <Filter className="w-4 h-4" />
                Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4 sm:py-6 lg:py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-80 lg:flex-shrink-0`}>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 sticky top-24">
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
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm"
                    />
                  </div>
                </div>

                {/* BHK Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Property Type</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-2">
                    {['1 RK', '1 BHK', '2 BHK', '3 BHK', '4+ BHK', 'Villa'].map((type) => (
                      <button
                        key={type}
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:border-yellow-500 hover:bg-yellow-50 transition-colors focus:ring-2 focus:ring-yellow-500"
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Budget Range</label>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="number"
                        placeholder="Min Price"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm"
                      />
                      <input
                        type="number"
                        placeholder="Max Price"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm"
                      />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {['< ₹5K', '₹5K-10K', '₹10K-15K', '₹15K+'].map((range) => (
                        <button
                          key={range}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs hover:bg-yellow-100 hover:text-yellow-700 transition-colors"
                        >
                          {range}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Furnished Status */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Furnished</label>
                  <div className="space-y-2">
                    {['Fully Furnished', 'Semi-Furnished', 'Unfurnished'].map((status) => (
                      <label key={status} className="flex items-center">
                        <input type="radio" name="furnished" className="w-4 h-4 text-yellow-600 focus:ring-yellow-500 border-gray-300" />
                        <span className="ml-3 text-sm text-gray-700">{status}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-4 border-t border-gray-200 space-y-2">
                  <button className="w-full bg-yellow-500 text-white py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors">
                    Apply Filters
                  </button>
                  <button className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                    Clear All
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Advertisement Section */}
            <div className="mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">Featured Services</h2>
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                {advertisements.map((ad) => (
                  <AdCard key={ad.id} ad={ad} />
                ))}
              </div>
            </div>

            {/* Property Listings */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-8 sm:mt-12">
              <button className="bg-white border-2 border-yellow-500 text-yellow-600 px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-yellow-500 hover:text-white transition-colors">
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