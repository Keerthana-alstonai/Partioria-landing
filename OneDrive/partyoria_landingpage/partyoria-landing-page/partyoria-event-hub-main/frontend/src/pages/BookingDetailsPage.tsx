import { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getVenueById } from '@/data/venueData';

const BookingDetailsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { venueId } = useParams();
  const [venue, setVenue] = useState({
    id: '6',
    name: 'Taj Mahal Palace Mumbai',
    type: 'Luxury Hotel',
    location: 'Mumbai, Maharashtra',
    price: '₹12000+ per day',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400'
  });
  
  useEffect(() => {
    let selectedVenue = null;
    
    console.log('BookingDetailsPage - venueId:', venueId);
    console.log('BookingDetailsPage - location.state:', location.state);
    
    // Get venue by ID from URL parameter (primary method)
    if (venueId) {
      selectedVenue = getVenueById(venueId);
      console.log('Found venue by ID:', venueId, selectedVenue?.name);
    }
    
    // Fallback to navigation state
    if (!selectedVenue && location.state?.venue) {
      selectedVenue = location.state.venue;
      console.log('Using venue from navigation state:', selectedVenue?.name);
    }
    
    // Final fallback to storage
    if (!selectedVenue) {
      const storedVenue = localStorage.getItem('selectedVenue');
      if (storedVenue) {
        try {
          selectedVenue = JSON.parse(storedVenue);
          console.log('Using venue from storage:', selectedVenue?.name);
        } catch (error) {
          console.error('Error parsing stored venue:', error);
        }
      }
    }
    
    // Test fallback - force a venue for demonstration
    if (!selectedVenue) {
      selectedVenue = getVenueById('6'); // Taj Mahal Palace Mumbai
      console.log('Using test fallback venue:', selectedVenue?.name);
    }
    
    console.log('Final selected venue:', selectedVenue?.name);
    setVenue(selectedVenue);
  }, [venueId, location.state]);
  
  const [formData, setFormData] = useState({
    eventDate: '',
    startTime: '',
    endTime: '',
    attendees: '',
    specialRequests: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/booking-confirmed', { 
      state: { 
        venue: venue, 
        bookingData: formData 
      } 
    });
  };

  const isFormValid = formData.eventDate && formData.startTime && formData.endTime && formData.attendees;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Booking Details</h1>
          <p className="text-muted-foreground">
            Welcome! You've successfully signed in. Please provide the following details to complete your booking for <span className="font-semibold text-[#6b46c1]">{venue?.name || 'Taj Mahal Palace Mumbai'}</span>:
          </p>
        </div>

        {venue && (
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex gap-4">
                <img 
                  src={venue.image} 
                  alt={venue.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div>
                  <h3 className="font-bold text-lg">{venue.name}</h3>
                  <p className="text-muted-foreground">{venue.location}</p>
                  <p className="font-semibold text-primary">{venue.price}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Event Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Event Date</Label>
                <Input
                  type="date"
                  value={formData.eventDate}
                  onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Start Time</Label>
                  <Select value={formData.startTime} onValueChange={(value) => 
                    setFormData({ ...formData, startTime: value })
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
                  <Select value={formData.endTime} onValueChange={(value) => 
                    setFormData({ ...formData, endTime: value })
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
                  value={formData.attendees}
                  onChange={(e) => setFormData({ ...formData, attendees: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label>Special Requests (optional)</Label>
                <Textarea
                  placeholder="Any additional requirements or special requests..."
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="text-sm text-muted-foreground mb-4">
                Click 'Save & Continue' to proceed. You can explore your dashboard later from the menu.
              </div>

              <Button 
                type="submit"
                className="w-full"
                disabled={!isFormValid}
              >
                Save & Continue
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BookingDetailsPage;