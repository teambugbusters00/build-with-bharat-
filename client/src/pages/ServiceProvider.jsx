import { useEffect, useState } from "react";
import { Search, Star, MapPin, Phone, Award, Clock, ChevronDown, User } from 'lucide-react';

const ServiceProvider = () => {
  const [providers, setProviders] = useState([]);
  const [filteredProviders, setFilteredProviders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProfession, setSelectedProfession] = useState("All");
  const [sortBy, setSortBy] = useState("rating");
  const [loading, setLoading] = useState(true);

  // Mock data for demonstration (replace with API call)
  const mockProviders = [
    {
      id: 1,
      name: "Rajesh Kumar",
      profession: "Plumber",
      experience: "8 years",
      rating: 4.9,
      distance: "2.3 km",
      avatar: "👨‍🔧",
      phone: "+91-9876543210",
      verified: true,
      certificates: 3
    },
    {
      id: 2,
      name: "Priya Sharma",
      profession: "Electrician",
      experience: "6 years",
      rating: 4.8,
      distance: "1.8 km",
      avatar: "👩‍🔧",
      phone: "+91-9876543211",
      verified: true,
      certificates: 2
    },
    {
      id: 3,
      name: "Amit Patel",
      profession: "Carpenter",
      experience: "10 years",
      rating: 4.7,
      distance: "3.1 km",
      avatar: "👨‍🏭",
      phone: "+91-9876543212",
      verified: false,
      certificates: 4
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProviders(mockProviders);
      setFilteredProviders(mockProviders);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = providers;

    // Filter by profession
    if (selectedProfession !== "All") {
      filtered = filtered.filter(p => p.profession === selectedProfession);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.profession.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "distance":
          return parseFloat(a.distance) - parseFloat(b.distance);
        case "experience":
          return parseInt(b.experience) - parseInt(a.experience);
        default:
          return 0;
      }
    });

    setFilteredProviders(filtered);
  }, [providers, searchTerm, selectedProfession, sortBy]);

  const professions = ["All", "Plumber", "Electrician", "Carpenter", "Painter", "Mechanic"];

  return (
    <div className="min-h-screen py-8 px-4 md:px-8" style={{ background: 'linear-gradient(to bottom right, #46acfc, #3ffbd8)' }}>
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-12">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <User className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
            Local Service <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Providers</span>
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Connect with verified local professionals in your community. Quality service, trusted expertise.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-800/50 rounded-3xl p-8 shadow-xl dark:shadow-none border dark:border-purple-400/30 mb-8">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text/50 w-5 h-5" />
              <input
                type="text"
                placeholder="Search providers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800/50 text-text placeholder-text/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg transition-all duration-300 hover:shadow-lg"
              />
            </div>

            {/* Profession Filter */}
            <div className="relative">
              <select
                value={selectedProfession}
                onChange={(e) => setSelectedProfession(e.target.value)}
                className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800/50 text-text focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg appearance-none cursor-pointer transition-all duration-300 hover:shadow-lg"
              >
                {professions.map(profession => (
                  <option key={profession} value={profession}>{profession}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-text/50 w-5 h-5 pointer-events-none" />
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800/50 text-text focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg appearance-none cursor-pointer transition-all duration-300 hover:shadow-lg"
              >
                <option value="rating">Sort by Rating</option>
                <option value="distance">Sort by Distance</option>
                <option value="experience">Sort by Experience</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-text/50 w-5 h-5 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="text-center mb-8">
          <p className="text-lg text-gray-700">
            {loading ? "Loading providers..." : `${filteredProviders.length} professional${filteredProviders.length !== 1 ? 's' : ''} found`}
          </p>
        </div>
      </div>

      {/* Providers Grid */}
      <div className="max-w-6xl mx-auto">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProviders.map((provider, index) => (
              <div
                key={provider.id}
                className="bg-white dark:bg-gray-800/50 rounded-3xl p-8 shadow-xl dark:shadow-none border dark:border-purple-400/30 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Avatar and Basic Info */}
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl flex items-center justify-center text-3xl mr-4 group-hover:scale-110 transition-transform duration-300">
                    {provider.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xl font-bold text-text">{provider.name}</h3>
                      {provider.verified && (
                        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                          <Award className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium">
                        {provider.profession}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Stats Pills */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="font-bold text-text">{provider.rating}</span>
                    </div>
                    <div className="text-xs text-text/60">Rating</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-text mb-1">{provider.experience}</div>
                    <div className="text-xs text-text/60">Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-text mb-1">{provider.distance}</div>
                    <div className="text-xs text-text/60">Distance</div>
                  </div>
                </div>

                {/* Certificates */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-blue-600" />
                    <span className="text-sm text-text/70">{provider.certificates} Certificates</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-green-600 font-medium">Available</span>
                  </div>
                </div>

                {/* Action Button */}
                <a
                  href={`tel:${provider.phone}`}
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-2xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 shadow-lg"
                >
                  <Phone className="w-5 h-5" />
                  Call Now
                </a>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredProviders.length === 0 && (
          <div className="text-center py-20">
            <div className="text-8xl mb-6">🔍</div>
            <h3 className="text-2xl font-bold text-text mb-4">No providers found</h3>
            <p className="text-lg text-text/70 mb-8">Try adjusting your search criteria or check back later.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceProvider;
