import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Search, MapPin, Star, Heart, Mail, Calendar, Users, Wifi, Car, Camera, Music, Eye, EyeOff, X, Filter, Menu } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import AuthPrompt from '@/components/booking/AuthPrompt';
import { apiService, ApiVenueDetails } from '@/services/api';

// Fallback data when API is unavailable
const fallbackStateData = {
  'Andhra Pradesh': ['Amaravati', 'Visakhapatnam', 'Vijayawada', 'Guntur', 'Tirupati', 'Anantapur', 'Chittoor', 'Kadapa'],
  'Karnataka': ['Bangalore', 'Mysore', 'Mangalore', 'Hubli', 'Belgaum', 'Shimoga', 'Tumkur', 'Bijapur'],
  'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad', 'Solapur', 'Kolhapur', 'Sangli'],
  'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Salem', 'Trichy', 'Tirunelveli', 'Erode', 'Vellore'],
  'Delhi': ['New Delhi', 'Delhi'],
  'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar', 'Jamnagar', 'Gandhinagar'],
  'Kerala': ['Kochi', 'Thiruvananthapuram', 'Kozhikode', 'Thrissur', 'Kollam', 'Palakkad', 'Malappuram'],
  'West Bengal': ['Kolkata', 'Howrah', 'Durgapur', 'Asansol', 'Siliguri', 'Bardhaman'],
  'Rajasthan': ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Bikaner', 'Ajmer', 'Alwar'],
  'Punjab': ['Chandigarh', 'Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala', 'Bathinda'],
  'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Agra', 'Varanasi', 'Meerut', 'Allahabad', 'Bareilly'],
  'Madhya Pradesh': ['Bhopal', 'Indore', 'Gwalior', 'Jabalpur', 'Ujjain', 'Sagar'],
  'Bihar': ['Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Darbhanga', 'Bihar Sharif'],
  'Haryana': ['Gurgaon', 'Faridabad', 'Panipat', 'Ambala', 'Yamunanagar', 'Rohtak'],
  'Jharkhand': ['Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro', 'Deoghar'],
  'Odisha': ['Bhubaneswar', 'Cuttack', 'Rourkela', 'Berhampur', 'Sambalpur'],
  'Assam': ['Guwahati', 'Silchar', 'Dibrugarh', 'Jorhat', 'Nagaon'],
  'Chhattisgarh': ['Raipur', 'Bhilai', 'Korba', 'Bilaspur', 'Durg'],
  'Himachal Pradesh': ['Shimla', 'Dharamshala', 'Solan', 'Mandi', 'Kullu'],
  'Uttarakhand': ['Dehradun', 'Haridwar', 'Roorkee', 'Haldwani', 'Rishikesh'],
  'Goa': ['Panaji', 'Margao', 'Vasco da Gama', 'Mapusa'],
  'Telangana': ['Hyderabad', 'Warangal', 'Nizamabad', 'Karimnagar', 'Khammam'],
  'Tripura': ['Agartala', 'Dharmanagar', 'Udaipur', 'Kailasahar'],
  'Meghalaya': ['Shillong', 'Tura', 'Jowai'],
  'Manipur': ['Imphal', 'Thoubal', 'Bishnupur'],
  'Nagaland': ['Kohima', 'Dimapur', 'Mokokchung'],
  'Mizoram': ['Aizawl', 'Lunglei', 'Saiha'],
  'Arunachal Pradesh': ['Itanagar', 'Naharlagun', 'Pasighat'],
  'Sikkim': ['Gangtok', 'Namchi', 'Gyalshing']
};

const fallbackPopularCities = [
  'Bangalore', 'Mumbai', 'New Delhi', 'Delhi', 'Panaji', 'Jaipur', 'Udaipur', 
  'Chennai', 'Hyderabad', 'Pune', 'Kolkata', 'Ahmedabad', 'Chandigarh',
  'Amaravati', 'Visakhapatnam', 'Vijayawada', 'Guntur', 'Tirupati',
  'Mysore', 'Mangalore', 'Hubli', 'Belgaum', 'Shimoga', 'Tumkur', 'Bijapur',
  'Anantapur', 'Chittoor', 'Kadapa'
];

interface Venue {
  id: string;
  name: string;
  type: string;
  description: string;
  price: string;
  originalPrice?: string;
  rating: number;
  reviews: number;
  location: string;
  area: string;
  image: string;
  gallery: string[];
  capacity: string;
  amenities: string[];
  contact: {
    phone: string;
    email: string;
  };
  availability: string;
  specialOffer?: string;
}

interface VenueFromAPI {
  id: number;
  venue_name: string;
  location: string;
  capacity: number;
  price_range: string;
  image_url: string;
  description: string;
  created_at: string;
}



// Sample venue data for demonstration
const venueData: Record<string, Venue[]> = {
  'Bangalore': [
    {
      id: '1',
      name: 'JW Marriott Bengaluru',
      type: 'Luxury Hotel',
      description: 'Multi-purpose venue with grand ballrooms suitable for corporate conferences, weddings, and festivals.',
      price: '₹70,000',
      rating: 4.8,
      reviews: 324,
      location: 'Vittal Mallya Road, Bangalore',
      area: 'Central Bangalore',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
      gallery: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800'],
      capacity: '1000 guests',
      amenities: ['AV Equipment', 'Catering', 'Parking', 'WiFi', 'Pool'],
      contact: { phone: '+91 80 6718 8888', email: 'jwmarriott.bengaluru@marriott.com' },
      availability: 'Available'
    },
    {
      id: '2',
      name: 'Taj West End Bengaluru',
      type: 'Garden Venue',
      description: 'Heritage property for cultural and social events with lush gardens.',
      price: '₹80,000',
      rating: 4.8,
      reviews: 378,
      location: 'Race Course Road, Bangalore',
      area: 'Central Bangalore',
      image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800',
      gallery: ['https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800'],
      capacity: '800 guests',
      amenities: ['Garden', 'Heritage Halls', 'Catering', 'Parking'],
      contact: { phone: '+91 80 6660 4567', email: 'westend.bengaluru@tajhotels.com' },
      availability: 'Not Available'
    },
    {
      id: '3',
      name: 'The Ritz-Carlton Bengaluru',
      type: 'Banquet Hall',
      description: 'Banquet hall for premium events with modern facilities.',
      price: '₹90,000',
      rating: 4.9,
      reviews: 456,
      location: 'Residency Road, Bangalore',
      area: 'Central Bangalore',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
      gallery: ['https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800'],
      capacity: '500 guests',
      amenities: ['AV Equipment', 'Valet Parking', 'Fine Dining', 'Spa'],
      contact: { phone: '+91 80 4914 8000', email: 'rc.blrrz.reservations@ritzcarlton.com' },
      availability: 'Available'
    }
  ]
};

const ExploreVenues = () => {
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [venues, setVenues] = useState<Venue[]>([]);
  const [venuesLoading, setVenuesLoading] = useState(false);
  
  // Location data from database
  const [stateData, setStateData] = useState<Record<string, string[]>>({});
  const [popularCities, setPopularCities] = useState<string[]>([]);
  const [locationsLoading, setLocationsLoading] = useState(true);
  
  // Filter states - only active when venues are displayed
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [selectedVenueTypes, setSelectedVenueTypes] = useState<string[]>([]);
  const [capacityRange, setCapacityRange] = useState([0, 2000]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);
  const [availabilityFilter, setAvailabilityFilter] = useState('all');
  
  const { user, login, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Fetch locations from database with fallback
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setLocationsLoading(true);
        await apiService.healthCheck();
        const data = await apiService.getLocations();
        setStateData(data.cities_by_state);
        setPopularCities(data.popular_cities);
      } catch (error) {
        setStateData(fallbackStateData);
        setPopularCities(fallbackPopularCities);
      } finally {
        setLocationsLoading(false);
      }
    };

    fetchLocations();
  }, []);

  const cities = selectedState ? stateData[selectedState] || [] : [];

  const handleCitySelect = async (city: string) => {
    if (!selectedDate) {
      toast({
        title: "Please select event date",
        description: "Select your event date before choosing a location.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    setVenuesLoading(true);
    try {
      const venueData = await apiService.getVenueDetails(city);
      const convertedVenues = venueData.map(venue => {
        const converted = convertApiVenueToVenue(venue);
        // Simulate availability check based on date
        const isAvailable = Math.random() > 0.3; // 70% availability rate
        return {
          ...converted,
          availability: isAvailable ? 'Available' : 'Not Available'
        };
      });
      setVenues(convertedVenues);
      setSelectedCity(city);
    } catch (error) {
      // Use fallback data silently
      setVenues(venueData[city] || []);
      setSelectedCity(city);
    } finally {
      setIsLoading(false);
      setVenuesLoading(false);
    }
  };

  const convertApiVenueToVenue = (apiVenue: VenueFromAPI): Venue => {
    const fallbackImages = [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800',
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800',
      'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800',
      'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800',
      'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800',
      'https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800'
    ];
    
    const imageUrl = apiVenue.image_url && apiVenue.image_url.trim() !== '' 
      ? apiVenue.image_url 
      : fallbackImages[apiVenue.id % fallbackImages.length];
    
    return {
      id: apiVenue.id.toString(),
      name: apiVenue.venue_name,
      type: 'Event Venue',
      description: apiVenue.description,
      price: apiVenue.price_range,
      rating: 4.5,
      reviews: Math.floor(Math.random() * 200) + 50,
      location: apiVenue.location,
      area: apiVenue.location.split(',')[0] || '',
      image: imageUrl,
      gallery: [imageUrl],
      capacity: `${apiVenue.capacity} guests`,
      amenities: ['AV Equipment', 'Parking', 'Catering', 'WiFi'],
      contact: {
        phone: '+91 80 1234 5678',
        email: 'info@venue.com'
      },
      availability: 'Available'
    };
  };

  // venues state is now managed above
  
  // Filter venues based on selected filters
  const filteredVenues = venues.filter(venue => {
    // Price filter
    const priceNum = parseInt(venue.price.replace(/[^0-9]/g, ''));
    if (priceNum < priceRange[0] || priceNum > priceRange[1]) return false;
    
    // Venue type filter
    if (selectedVenueTypes.length > 0 && !selectedVenueTypes.some(type => venue.type.toLowerCase().includes(type.toLowerCase()))) return false;
    
    // Capacity filter (extract number from capacity string)
    const capacityNum = parseInt(venue.capacity.replace(/[^0-9]/g, ''));
    if (capacityNum < capacityRange[0] || capacityNum > capacityRange[1]) return false;
    
    // Amenities filter
    if (selectedAmenities.length > 0 && !selectedAmenities.every(amenity => venue.amenities.some(vAmenity => vAmenity.toLowerCase().includes(amenity.toLowerCase())))) return false;
    
    // Rating filter
    if (venue.rating < minRating) return false;
    
    // Availability filter
    if (availabilityFilter === 'available' && venue.availability !== 'Available') return false;
    if (availabilityFilter === 'not-available' && venue.availability !== 'Not Available') return false;
    
    return true;
  });
  
  const displayedVenues = showMore ? filteredVenues : filteredVenues.slice(0, 6);
  
  // Filter options
  const venueTypes = ['Luxury Hotel', 'Banquet Hall', 'Resort', 'Palace', 'Garden Venue', 'Beach Resort', 'Convention Center', 'Heritage Venue', 'Club Venue'];
  const amenitiesList = ['AV Equipment', 'Parking', 'Catering', 'WiFi', 'Pool', 'Spa', 'Garden', 'Beach Access', 'Valet Parking', 'Fine Dining'];
  
  const clearAllFilters = () => {
    setPriceRange([0, 200000]);
    setSelectedVenueTypes([]);
    setCapacityRange([0, 2000]);
    setSelectedAmenities([]);
    setMinRating(0);
    setAvailabilityFilter('all');
  };
  
  const hasActiveFilters = priceRange[0] > 0 || priceRange[1] < 200000 || selectedVenueTypes.length > 0 || 
    capacityRange[0] > 0 || capacityRange[1] < 2000 || selectedAmenities.length > 0 || minRating > 0 || availabilityFilter !== 'all';

  const handleBookNow = (venue: Venue) => {
    sessionStorage.setItem('selectedVenue', JSON.stringify(venue));
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      {!selectedCity && (
        <div className="absolute top-0 left-0 right-0 z-20 bg-transparent">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-[#6b46c1] to-[#d53f8c] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">P</span>
                </div>
                <span className="text-2xl font-bold text-white">Partyoria</span>
              </Link>
            </div>
          </div>
        </div>
      )}
      
      {/* Header for Venue Listing */}
      {selectedCity && (
        <div className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-[#6b46c1] to-[#d53f8c] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">P</span>
                </div>
                <span className="text-2xl font-bold text-[#6b46c1]">Partyoria</span>
              </Link>
              <Button
                onClick={() => {
                  setSelectedCity('');
                  setSelectedState('');
                }}
                variant="outline"
                className="text-slate-600 border-slate-300 hover:bg-slate-100 hover:text-slate-700"
              >
                Change Location
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* State and City Selection */}
      {!selectedCity && (
        <section className="py-20 bg-gradient-hero relative overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-party-pattern opacity-20" />
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-float" />
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-white/10 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-white/5 rounded-full blur-2xl" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center text-white mb-12">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Find Your Perfect<br />
                <span className="text-secondary">Venue</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto leading-relaxed">
                Discover amazing venues across India for your next event. Select your event date and location to get started.
              </p>
            </div>

            <div className="max-w-3xl mx-auto mb-12">
              {locationsLoading ? (
                <div className="flex justify-center items-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                  <span className="ml-3 text-white/90">Loading locations...</span>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* First Row - Event Date */}
                  <div className="max-w-md mx-auto">
                    <label className="block text-sm font-medium text-white/90 mb-2">Event Date</label>
                    <Input
                      type="date"
                      min={new Date().toISOString().split('T')[0]}
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="h-12 text-lg bg-white/10 border-white/20 text-white backdrop-blur-sm hover:bg-white/20 placeholder:text-white/60 w-full"
                    />
                  </div>
                  
                  {/* Second Row - Location */}
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* State Dropdown */}
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">Select State</label>
                      <Select value={selectedState} onValueChange={setSelectedState}>
                        <SelectTrigger className="h-12 text-lg bg-white/10 border-white/20 text-white backdrop-blur-sm hover:bg-white/20">
                          <SelectValue placeholder="Choose your state" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.keys(stateData).map((state) => (
                            <SelectItem key={state} value={state}>{state}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* City Dropdown */}
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">Select City</label>
                      <Select 
                        value={selectedCity} 
                        onValueChange={handleCitySelect}
                        disabled={!selectedState}
                      >
                        <SelectTrigger className="h-12 text-lg bg-white/10 border-white/20 text-white backdrop-blur-sm hover:bg-white/20 disabled:opacity-50">
                          <SelectValue placeholder={selectedState ? "Choose your city" : "Select state first"} />
                        </SelectTrigger>
                        <SelectContent>
                          {cities.map((city) => (
                            <SelectItem key={city} value={city}>{city}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Popular Cities */}
            {!locationsLoading && popularCities.length > 0 && (
              <div className="max-w-5xl mx-auto">
                <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
                  Or Choose from <span className="text-secondary">Popular Cities</span>
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {popularCities.map((city) => {
                    // Find the state for this city
                    const cityState = Object.entries(stateData).find(([state, cities]) => 
                      cities.includes(city)
                    )?.[0];
                    
                    return (
                      <Button
                        key={city}
                        onClick={() => {
                          if (cityState) {
                            setSelectedState(cityState);
                            handleCitySelect(city);
                          }
                        }}
                        variant="outline"
                        className="h-12 bg-white/10 border-white/30 text-white backdrop-blur-sm hover:bg-blue-50 hover:text-blue-600 text-sm transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                      >
                        {city}
                      </Button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Trust Indicators */}
            <div className="text-center text-white mt-16 opacity-80">
              <p className="text-lg mb-4"></p>
              <div className="flex flex-wrap justify-center items-center gap-8 text-sm">
                <span>✨ 4.9/5 Rating</span>
                <span>🏛️ 500+ Venues</span>
                <span>🚀 Instant Booking</span>
                <span>💬 24/7 Support</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Venues Display with Filters */}
      {selectedCity && (
        <div className="py-12">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-slate-700 mb-4">
                Available Venues in {selectedCity}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Showing venues available on {selectedDate ? new Date(selectedDate).toLocaleDateString() : 'your selected date'} in {selectedCity}. From luxury hotels to heritage palaces, find the perfect space for your celebration.
              </p>
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6b46c1]"></div>
              </div>
            ) : (
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar Filters */}
                <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                  <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-gray-900">Filters</h3>
                      <div className="flex items-center space-x-2">
                        {hasActiveFilters && (
                          <Button 
                            onClick={clearAllFilters}
                            variant="ghost" 
                            size="sm"
                            className="text-slate-600 hover:text-slate-700"
                          >
                            Clear All
                          </Button>
                        )}
                        <Button 
                          onClick={() => setShowFilters(false)}
                          variant="ghost" 
                          size="sm"
                          className="lg:hidden"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Price Range */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Price Range</h4>
                      <div className="px-2">
                        <Slider
                          value={priceRange}
                          onValueChange={setPriceRange}
                          max={200000}
                          min={0}
                          step={5000}
                          className="mb-3"
                        />
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>₹{priceRange[0].toLocaleString()}</span>
                          <span>₹{priceRange[1].toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Venue Type */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Venue Type</h4>
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {venueTypes.map((type) => (
                          <div key={type} className="flex items-center space-x-2">
                            <Checkbox
                              id={type}
                              checked={selectedVenueTypes.includes(type)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedVenueTypes([...selectedVenueTypes, type]);
                                } else {
                                  setSelectedVenueTypes(selectedVenueTypes.filter(t => t !== type));
                                }
                              }}
                            />
                            <label htmlFor={type} className="text-sm text-gray-700 cursor-pointer">
                              {type}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Capacity */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Capacity</h4>
                      <div className="px-2">
                        <Slider
                          value={capacityRange}
                          onValueChange={setCapacityRange}
                          max={2000}
                          min={0}
                          step={50}
                          className="mb-3"
                        />
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>{capacityRange[0]} guests</span>
                          <span>{capacityRange[1]} guests</span>
                        </div>
                      </div>
                    </div>

                    {/* Amenities */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Amenities</h4>
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {amenitiesList.map((amenity) => (
                          <div key={amenity} className="flex items-center space-x-2">
                            <Checkbox
                              id={amenity}
                              checked={selectedAmenities.includes(amenity)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedAmenities([...selectedAmenities, amenity]);
                                } else {
                                  setSelectedAmenities(selectedAmenities.filter(a => a !== amenity));
                                }
                              }}
                            />
                            <label htmlFor={amenity} className="text-sm text-gray-700 cursor-pointer">
                              {amenity}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Minimum Rating</h4>
                      <Select value={minRating.toString()} onValueChange={(value) => setMinRating(parseFloat(value))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Any Rating" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">Any Rating</SelectItem>
                          <SelectItem value="3">3.0+ ⭐</SelectItem>
                          <SelectItem value="3.5">3.5+ ⭐</SelectItem>
                          <SelectItem value="4">4.0+ ⭐</SelectItem>
                          <SelectItem value="4.5">4.5+ ⭐</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Availability */}
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Availability</h4>
                      <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Venues</SelectItem>
                          <SelectItem value="available">Available Only</SelectItem>
                          <SelectItem value="not-available">Not Available</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Main Content */}
                <div className="flex-1">
                  {/* Mobile Filter Toggle */}
                  <div className="lg:hidden mb-6">
                    <Button 
                      onClick={() => setShowFilters(true)}
                      variant="outline"
                      className="w-full text-slate-600 border-slate-300 hover:bg-slate-100 hover:text-slate-700"
                    >
                      <Filter className="h-4 w-4 mr-2" />
                      Show Filters {hasActiveFilters && '(Active)'}
                    </Button>
                  </div>

                  {/* Results Count */}
                  <div className="flex items-center justify-between mb-6">
                    <p className="text-gray-600">
                      {filteredVenues.length} venue{filteredVenues.length !== 1 ? 's' : ''} found
                      {hasActiveFilters && ' (filtered)'}
                    </p>
                  </div>

                  {/* Venues Grid */}
                  {filteredVenues.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="text-gray-400 mb-4">
                        <Search className="h-16 w-16 mx-auto" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">No venues found</h3>
                      <p className="text-gray-600 mb-4">Try adjusting your filters to see more results.</p>
                      {hasActiveFilters && (
                        <Button 
                          onClick={clearAllFilters}
                          variant="outline"
                          className="text-slate-600 border-slate-300 hover:bg-slate-100 hover:text-slate-700"
                        >
                          Clear All Filters
                        </Button>
                      )}
                    </div>
                  ) : (
                    <>
                      <div className="grid md:grid-cols-2 gap-8 mb-8">
                        {displayedVenues.map((venue) => (
                          <Card key={venue.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
                            <div className="relative">
                              <img 
                                src={venue.image} 
                                alt={venue.name}
                                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800';
                                }}
                              />
                              <div className="absolute top-4 right-4">
                                <Button size="sm" variant="ghost" className="bg-white/80 hover:bg-white text-gray-700">
                                  <Heart className="h-4 w-4" />
                                </Button>
                              </div>
                              {venue.specialOffer && (
                                <div className="absolute top-4 left-4">
                                  <Badge className="bg-red-500 text-white">{venue.specialOffer}</Badge>
                                </div>
                              )}
                              <div className="absolute bottom-4 left-4">
                                <Badge className="bg-slate-600 text-white">{venue.type}</Badge>
                              </div>
                            </div>
                            <CardContent className="p-6">
                              <div className="flex items-start justify-between mb-3">
                                <h3 className="text-xl font-bold text-gray-900 group-hover:text-slate-700 transition-colors">
                                  {venue.name}
                                </h3>
                                <div className="flex items-center space-x-1">
                                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                  <span className="text-sm font-medium">{venue.rating}</span>
                                  <span className="text-xs text-gray-500">({venue.reviews})</span>
                                </div>
                              </div>
                              
                              <div className="flex items-center text-gray-600 mb-3">
                                <MapPin className="h-4 w-4 mr-2" />
                                <span className="text-sm">{venue.location}</span>
                              </div>
                              
                              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{venue.description}</p>
                              
                              <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center text-gray-600">
                                  <Users className="h-4 w-4 mr-2" />
                                  <span className="text-sm">{venue.capacity}</span>
                                </div>
                                <div className="text-right">
                                  {venue.originalPrice && (
                                    <span className="text-sm text-gray-500 line-through block">{venue.originalPrice}</span>
                                  )}
                                  <span className="text-lg font-bold text-slate-700">{venue.price}</span>
                                </div>
                              </div>
                              
                              <div className="flex flex-wrap gap-2 mb-4">
                                {venue.amenities.slice(0, 3).map((amenity, index) => (
                                  <Badge key={index} variant="secondary" className="text-xs">
                                    {amenity}
                                  </Badge>
                                ))}
                                {venue.amenities.length > 3 && (
                                  <Badge variant="secondary" className="text-xs">
                                    +{venue.amenities.length - 3} more
                                  </Badge>
                                )}
                              </div>
                              
                              <div className="flex space-x-2">
                                <Button 
                                  onClick={() => setSelectedVenue(venue)}
                                  variant="outline" 
                                  className="flex-1 text-slate-600 border-slate-300 hover:bg-slate-100 hover:text-slate-700"
                                >
                                  View Details
                                </Button>
                                <Button 
                                  onClick={() => handleBookNow(venue)}
                                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
                                >
                                  Book Now
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>

                      {filteredVenues.length > 6 && (
                        <div className="text-center">
                          <Button 
                            onClick={() => setShowMore(!showMore)}
                            variant="outline"
                            className="text-slate-600 border-slate-300 hover:bg-slate-100 hover:text-slate-700 px-8 py-3"
                          >
                            {showMore ? 'Show Less' : `Show More (${filteredVenues.length - 6} more venues)`}
                          </Button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            )}


          </div>
        </div>
      )}

      {/* Venue Details Modal */}
      {selectedVenue && (
        <Dialog open={!!selectedVenue} onOpenChange={() => setSelectedVenue(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-slate-700">{selectedVenue.name}</DialogTitle>
              <DialogDescription className="text-gray-600">{selectedVenue.location}</DialogDescription>
            </DialogHeader>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <img 
                  src={selectedVenue.image} 
                  alt={selectedVenue.name}
                  className="w-full h-64 object-cover rounded-lg mb-4"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800';
                  }}
                />
                <p className="text-gray-700 mb-4">{selectedVenue.description}</p>
                
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-slate-600" />
                    <span>Capacity: {selectedVenue.capacity}</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-2 text-yellow-400" />
                    <span>{selectedVenue.rating} ({selectedVenue.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-slate-600" />
                    <span>{selectedVenue.contact.email}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="bg-gray-50 p-6 rounded-lg mb-6">
                  <h3 className="text-xl font-bold text-slate-700 mb-2">Pricing</h3>
                  <p className="text-3xl font-bold text-gray-900">{selectedVenue.price}</p>
                  <p className="text-sm text-gray-600">Starting price for events</p>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Amenities</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedVenue.amenities.map((amenity, index) => (
                      <Badge key={index} variant="secondary">{amenity}</Badge>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Button 
                    onClick={() => handleBookNow(selectedVenue)}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    Book This Venue
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ExploreVenues;