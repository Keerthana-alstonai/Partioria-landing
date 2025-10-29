import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import AuthPrompt from '@/components/booking/AuthPrompt';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { MapPin, Users, Calendar, Clock, DollarSign } from 'lucide-react';

interface Venue {
  id: number;
  name: string;
  location: string;
  capacity: string;
  price: string;
  rating: number;
  image: string;
  amenities: string[];
}

const mockVenues: Venue[] = [
  {
    id: 1,
    name: "Grand Ballroom",
    location: "Downtown",
    capacity: "50-200",
    price: "$2,500",
    rating: 4.8,
    image: "/placeholder.svg",
    amenities: ["Catering", "AV Equipment", "Parking"]
  },
  {
    id: 2,
    name: "Garden Pavilion",
    location: "Uptown",
    capacity: "20-100",
    price: "$1,800",
    rating: 4.6,
    image: "/placeholder.svg",
    amenities: ["Outdoor Space", "Garden View", "Catering"]
  },
  {
    id: 3,
    name: "Modern Event Space",
    location: "Midtown",
    capacity: "30-150",
    price: "$2,200",
    rating: 4.7,
    image: "/placeholder.svg",
    amenities: ["Modern Design", "AV Equipment", "Bar Service"]
  }
];

const BookingDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [selectedVenue, setSelectedVenue] = useState<number | null>(null);
  const [bookingDetails, setBookingDetails] = useState({
    eventDate: '',
    startTime: '',
    endTime: '',
    specialRequests: '',
    contactPhone: '',
    additionalGuests: ''
  });

  const preferences = location.state?.preferences;
  const selectedVenueFromState = location.state?.venue;
  const [venueFromSession, setVenueFromSession] = useState(null);

  const [showAuthPrompt, setShowAuthPrompt] = useState(false);

  useEffect(() => {
    // Check for venue in sessionStorage
    const storedVenue = sessionStorage.getItem('selectedVenue');
    if (storedVenue) {
      setVenueFromSession(JSON.parse(storedVenue));
      sessionStorage.removeItem('selectedVenue');
    }
    
    // Auto-select venue if there's a pre-selected one
    if (selectedVenueFromState || venueFromSession) {
      setSelectedVenue(1); // Set to any valid ID since we're using the actual venue data
    }
    
    // Show auth prompt if not authenticated
    if (!isAuthenticated) {
      setShowAuthPrompt(true);
    }
  }, [isAuthenticated, selectedVenueFromState, venueFromSession]);

  const handleAuthComplete = () => {
    setShowAuthPrompt(false);
  };

  const handleBooking = () => {
    const currentVenue = preSelectedVenue || mockVenues.find(v => v.id === selectedVenue);
    if (!currentVenue) return;
    
    const bookingData = {
      venue: currentVenue,
      preferences,
      details: bookingDetails
    };
    
    navigate('/booking-confirmation', { state: { booking: bookingData } });
  };

  useEffect(() => {
    // Only redirect if there's absolutely no venue data and user came here without context
    if (!preferences && !selectedVenueFromState && !venueFromSession && !sessionStorage.getItem('selectedVenue')) {
      navigate('/');
    }
  }, [preferences, selectedVenueFromState, venueFromSession, navigate]);



  // Use selected venue if available, otherwise show all venues
  const preSelectedVenue = selectedVenueFromState || venueFromSession;
  const filteredVenues = preSelectedVenue ? [preSelectedVenue] : mockVenues;

  // Show auth prompt if not authenticated
  if (!isAuthenticated) {
    return (
      <>
        <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Please log in to continue</h1>
            <p className="text-muted-foreground mb-6">You need to be logged in to book a venue</p>
          </div>
        </div>
        <AuthPrompt
          isOpen={showAuthPrompt}
          onClose={() => {
            setShowAuthPrompt(false);
            navigate('/');
          }}
          onAuthComplete={handleAuthComplete}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="w-full px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Booking Details</h1>
          <p className="text-muted-foreground">
            {preSelectedVenue 
              ? `Welcome! You've successfully signed in. Please provide the following details to complete your booking for ${preSelectedVenue.name}:` 
              : 'Welcome! Please provide your event details below.'
            }
          </p>
        </div>

        <div className="space-y-8">
          {/* Venues List */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">
                {preSelectedVenue ? 'Selected Venue' : 'Recommended Venues'}
              </h2>
              <div className="space-y-4">
                {filteredVenues.map((venue) => (
                  <Card 
                    key={venue.id} 
                    className={`cursor-pointer transition-all ${
                      selectedVenue === venue.id ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => setSelectedVenue(venue.id)}
                  >
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <img 
                          src={venue.image} 
                          alt={venue.name}
                          className="w-24 h-24 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold text-lg">{venue.name}</h3>
                            <div className="text-right">
                              <div className="font-bold text-lg">{venue.price}</div>
                              <div className="text-sm text-muted-foreground">per event</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {venue.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              {venue.capacity} people
                            </div>
                            <div>⭐ {venue.rating}</div>
                          </div>
                          
                          <div className="flex flex-wrap gap-2">
                            {venue.amenities.map((amenity) => (
                              <Badge key={amenity} variant="secondary" className="text-xs">
                                {amenity}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <Card>
              <CardHeader>
                <CardTitle>Event Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Event Date</Label>
                  <Input
                    type="date"
                    value={bookingDetails.eventDate || ''}
                    onChange={(e) => setBookingDetails({ ...bookingDetails, eventDate: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Start Time</Label>
                    <Select value={bookingDetails.startTime} onValueChange={(value) => 
                      setBookingDetails({ ...bookingDetails, startTime: value })
                    }>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="09:00">9:00 AM</SelectItem>
                        <SelectItem value="10:00">10:00 AM</SelectItem>
                        <SelectItem value="11:00">11:00 AM</SelectItem>
                        <SelectItem value="12:00">12:00 PM</SelectItem>
                        <SelectItem value="13:00">1:00 PM</SelectItem>
                        <SelectItem value="14:00">2:00 PM</SelectItem>
                        <SelectItem value="15:00">3:00 PM</SelectItem>
                        <SelectItem value="16:00">4:00 PM</SelectItem>
                        <SelectItem value="17:00">5:00 PM</SelectItem>
                        <SelectItem value="18:00">6:00 PM</SelectItem>
                        <SelectItem value="19:00">7:00 PM</SelectItem>
                        <SelectItem value="20:00">8:00 PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>End Time</Label>
                    <Select value={bookingDetails.endTime} onValueChange={(value) => 
                      setBookingDetails({ ...bookingDetails, endTime: value })
                    }>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="12:00">12:00 PM</SelectItem>
                        <SelectItem value="13:00">1:00 PM</SelectItem>
                        <SelectItem value="14:00">2:00 PM</SelectItem>
                        <SelectItem value="15:00">3:00 PM</SelectItem>
                        <SelectItem value="16:00">4:00 PM</SelectItem>
                        <SelectItem value="17:00">5:00 PM</SelectItem>
                        <SelectItem value="18:00">6:00 PM</SelectItem>
                        <SelectItem value="19:00">7:00 PM</SelectItem>
                        <SelectItem value="20:00">8:00 PM</SelectItem>
                        <SelectItem value="21:00">9:00 PM</SelectItem>
                        <SelectItem value="22:00">10:00 PM</SelectItem>
                        <SelectItem value="23:00">11:00 PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label>Number of Attendees</Label>
                  <Input
                    type="number"
                    placeholder="Enter number of attendees"
                    value={bookingDetails.additionalGuests}
                    onChange={(e) => setBookingDetails({ ...bookingDetails, additionalGuests: e.target.value })}
                  />
                </div>

                <div>
                  <Label>Special Requests (optional)</Label>
                  <Textarea
                    placeholder="Any additional requirements or special requests..."
                    value={bookingDetails.specialRequests}
                    onChange={(e) => setBookingDetails({ ...bookingDetails, specialRequests: e.target.value })}
                    rows={3}
                  />
                </div>

                <div className="text-sm text-muted-foreground mb-4">
                  Click 'Save & Continue' to proceed. You can explore your dashboard later from the menu.
                </div>

                <Button 
                  onClick={handleBooking}
                  disabled={(!selectedVenue && !preSelectedVenue) || !bookingDetails.eventDate || !bookingDetails.startTime || !bookingDetails.endTime || !bookingDetails.additionalGuests}
                  className="w-full"
                >
                  Save & Continue
                </Button>
              </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;