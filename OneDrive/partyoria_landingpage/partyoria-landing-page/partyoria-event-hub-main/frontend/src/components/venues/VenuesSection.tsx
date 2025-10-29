import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Star } from 'lucide-react';
import AuthPrompt from '@/components/booking/AuthPrompt';
import { fetchVenuesByCity, Venue } from '@/data/venueData';

interface VenuesSectionProps {
  selectedCity: string;
}

export const VenuesSection = ({ selectedCity }: VenuesSectionProps) => {
  const [showMore, setShowMore] = useState(false);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchVenues = async () => {
      if (!selectedCity) return;
      
      setLoading(true);
      try {
        const venuesData = await fetchVenuesByCity(selectedCity);
        setVenues(venuesData);
      } catch (error) {
        console.error('Failed to fetch venues:', error);
        setVenues([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchVenues();
  }, [selectedCity]);
  
  const displayedVenues = showMore ? venues : venues.slice(0, 6);

  const handleBookNow = (venue: Venue) => {
    // Clear old data to prevent caching
    sessionStorage.removeItem('selectedVenue');
    localStorage.removeItem('selectedVenue');
    
    if (isAuthenticated) {
      // Pass venue ID in URL and full object in state
      navigate(`/booking-details-page/${venue.id}`, { state: { venue }, replace: true });
      console.log('Navigating to booking with venue:', venue.name); // Debug
    } else {
      setSelectedVenue(venue);
      setShowAuthPrompt(true);
    }
  };

  if (!selectedCity) return null;

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-[#6b46c1] mb-8">
          Venues in {selectedCity}
        </h2>
        
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">Loading venues...</p>
          </div>
        ) : venues.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              No venues found for {selectedCity}. Try searching for another city.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {displayedVenues.map((venue) => (
                <Card key={venue.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={venue.image}
                      alt={venue.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-bold text-[#6b46c1] mb-2">
                      {venue.name}
                    </h3>
                    <p className="text-black text-sm mb-2">
                      {venue.type} | Suitable for {venue.suitability.join(', ')}
                    </p>
                    <p className="text-gray-600 text-sm mb-2">{venue.price}</p>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm ml-1">
                          {venue.rating} ({venue.reviews} reviews)
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm mb-3">
                      <MapPin className="h-4 w-4 mr-1" />
                      {venue.location}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {venue.badges.map((badge) => (
                        <Badge
                          key={badge}
                          variant="secondary"
                          className="text-xs bg-[#d53f8c] text-white"
                        >
                          {badge}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex gap-2 mt-4">
                      <Button 
                        onClick={() => navigate(`/venue-details/${venue.id}`, { state: { venue } })}
                        variant="outline"
                        className="flex-1 border-[#6b46c1] text-[#6b46c1] hover:bg-[#6b46c1] hover:text-white"
                      >
                        View Details
                      </Button>
                      <Button 
                        onClick={() => handleBookNow(venue)}
                        className="flex-1 bg-[#6b46c1] hover:bg-[#553c9a] text-white"
                      >
                        Book Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {venues.length > 6 && !showMore && (
              <div className="text-center">
                <Button
                  onClick={() => setShowMore(true)}
                  className="bg-[#6b46c1] hover:bg-[#553c9a] text-white"
                >
                  Load More
                </Button>
              </div>
            )}
          </>
        )}
        
        <AuthPrompt
          isOpen={showAuthPrompt}
          onClose={() => setShowAuthPrompt(false)}
          selectedVenue={selectedVenue}
        />
      </div>
    </section>
  );
};
