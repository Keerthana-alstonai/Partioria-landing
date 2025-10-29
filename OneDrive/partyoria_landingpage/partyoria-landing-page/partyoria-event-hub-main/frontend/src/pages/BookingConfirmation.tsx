import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Calendar, MapPin, Users, Clock, ArrowRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const BookingConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const booking = location.state?.booking;

  if (!booking) {
    navigate('/');
    return null;
  }

  const { venue, preferences, details } = booking;

  return (
    <div className="min-h-screen bg-gradient-hero py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-green-600 mb-4">Booking Confirmed!</h1>
          <p className="text-lg text-gray-800 font-medium">
            Your event booking has been successfully submitted. We'll contact you shortly to finalize the details.
          </p>
        </div>

        <Card className="glass mb-6">
          <CardHeader>
            <CardTitle>Booking Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">Venue</h3>
                <p className="text-sm text-muted-foreground">{venue.name}</p>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  {venue.location}
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Event Type</h3>
                <p className="text-sm text-muted-foreground capitalize">{preferences?.eventType || 'Event'}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">Date & Time</h3>
                <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                  <Calendar className="h-3 w-3" />
                  {preferences?.date?.toDateString() || details.eventDate}
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {details.startTime} - {details.endTime}
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Attendees</h3>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Users className="h-3 w-3" />
                  {preferences?.attendees || details.additionalGuests}
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Budget Range</h3>
              <p className="text-sm text-muted-foreground">{preferences?.budget || 'Not specified'}</p>
            </div>

            {details.specialRequests && (
              <div>
                <h3 className="font-semibold mb-2">Special Requests</h3>
                <p className="text-sm text-muted-foreground">{details.specialRequests}</p>
              </div>
            )}

            {details.contactPhone && (
              <div>
                <h3 className="font-semibold mb-2">Contact Phone</h3>
                <p className="text-sm text-muted-foreground">{details.contactPhone}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="glass mb-6">
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-3">What happens next?</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center mt-0.5">1</div>
                <div>
                  <p className="font-medium text-foreground">Contract & Payment</p>
                  <p>We'll send you the booking contract and payment details to secure your reservation.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center mt-0.5">2</div>
                <div>
                  <p className="font-medium text-foreground">Event Planning</p>
                  <p>Our team will work with you to plan every detail of your perfect event.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={() => navigate(`/dashboard/${user?.role || 'customer'}`)}
            className="flex items-center gap-2"
          >
            Go to Dashboard
            <ArrowRight className="h-4 w-4" />
          </Button>
          
          <Button 
            variant="outline"
            onClick={() => navigate('/')}
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;