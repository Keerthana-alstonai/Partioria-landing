import { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star, ArrowLeft } from 'lucide-react';
import { getVenueById } from '@/data/venueData';
import AuthPrompt from '@/components/booking/AuthPrompt';

const VenueDetailsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { venueId } = useParams();
  const { isAuthenticated } = useAuth();
  const [venue, setVenue] = useState(null);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);
  
  useEffect(() => {
    let selectedVenue = null;
    
    if (venueId) {
      selectedVenue = getVenueById(venueId);
    }
    
    if (!selectedVenue && location.state?.venue) {
      selectedVenue = location.state.venue;
    }
    
    if (!selectedVenue) {
      navigate('/');
      return;
    }
    
    setVenue(selectedVenue);
  }, [venueId, location.state, navigate]);

  const handleBookNow = () => {
    if (isAuthenticated) {
      navigate(`/booking-details-page/${venue.id}`, { state: { venue }, replace: true });
    } else {
      setShowAuthPrompt(true);
    }
  };

  if (!venue) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <Button 
          onClick={() => navigate(-1)}
          variant="ghost" 
          className="mb-6 text-[#6b46c1] hover:bg-[#6b46c1] hover:text-white"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Venues
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <img
              src={venue.image}
              alt={venue.name}
              className="w-full h-80 object-cover rounded-lg shadow-lg"
            />
          </div>
          
          <div>
            <h1 className="text-3xl font-bold text-[#6b46c1] mb-4">{venue.name}</h1>
            <p className="text-lg text-gray-700 mb-4">{venue.type}</p>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span className="ml-1 font-semibold">
                  {venue.rating} ({venue.reviews} reviews)
                </span>
              </div>
            </div>
            
            <div className="flex items-center text-gray-600 mb-4">
              <MapPin className="h-5 w-5 mr-2" />
              {venue.location}
            </div>
            
            <div className="text-2xl font-bold text-[#6b46c1] mb-4">
              {venue.price}
            </div>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {venue.badges.map((badge) => (
                <Badge
                  key={badge}
                  className="bg-[#d53f8c] text-white"
                >
                  {badge}
                </Badge>
              ))}
            </div>
            
            <Button 
              onClick={handleBookNow}
              className="w-full bg-[#6b46c1] hover:bg-[#553c9a] text-white text-lg py-3"
            >
              Book Now
            </Button>
          </div>
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-[#6b46c1]">Suitable For</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {venue.suitability.map((item) => (
                <div key={item} className="flex items-center p-3 bg-gray-100 rounded-lg">
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <AuthPrompt
          isOpen={showAuthPrompt}
          onClose={() => setShowAuthPrompt(false)}
          selectedVenue={venue}
        />
      </div>
    </div>
  );
};

export default VenueDetailsPage;