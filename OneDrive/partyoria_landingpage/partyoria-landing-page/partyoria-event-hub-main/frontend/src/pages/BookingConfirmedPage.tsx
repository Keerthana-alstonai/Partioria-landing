import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Download, MessageCircle, LayoutDashboard } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const BookingConfirmedPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { venue, bookingData } = location.state || {};

  const handleDownload = () => {
    // Generate PDF or trigger download
    alert('Download functionality would be implemented here');
  };

  const handleContactSupport = () => {
    // Open support modal or page
    alert('Contact support functionality would be implemented here');
  };

  return (
    <div className="min-h-screen bg-gradient-hero py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-[#6b46c1] to-[#d53f8c] rounded-full flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 text-[#6b46c1] drop-shadow-md">
            Booking Confirmed!
          </h1>
          <p className="text-lg text-gray-600">
            Congratulations! Your booking for <span className="font-semibold text-[#6b46c1]">{venue?.name || '[Venue Name]'}</span> has been successfully confirmed. Here are the details:
          </p>
        </div>

        <Card className="mb-6 glass border-2 border-white/20 shadow-xl">
          <CardHeader>
            <CardTitle className="text-[#6b46c1] text-xl">Booking Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-gradient-to-r from-[#6b46c1]/10 to-[#d53f8c]/10 rounded-lg">
              <strong className="text-[#6b46c1]">Event Date and Time:</strong> <span className="text-gray-700">{bookingData?.eventDate || '[Inserted Date]'} from {bookingData?.startTime || '[Start Time]'} to {bookingData?.endTime || '[End Time]'}</span>
            </div>
            <div className="p-3 bg-gradient-to-r from-[#6b46c1]/10 to-[#d53f8c]/10 rounded-lg">
              <strong className="text-[#6b46c1]">Number of Attendees:</strong> <span className="text-gray-700">{bookingData?.attendees || '[Inserted Number]'}</span>
            </div>
            <div className="p-3 bg-gradient-to-r from-[#6b46c1]/10 to-[#d53f8c]/10 rounded-lg">
              <strong className="text-[#6b46c1]">Special Requests:</strong> <span className="text-gray-700">{bookingData?.specialRequests || 'None'}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6 glass border-2 border-white/20 shadow-xl">
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-4 text-[#6b46c1] text-lg">You can now:</h3>
            <div className="space-y-3">
              <Button 
                onClick={() => navigate(`/dashboard/${user?.role || 'customer'}`)}
                className="w-full justify-start bg-gradient-to-r from-[#6b46c1] to-[#d53f8c] hover:opacity-90 text-white border-0"
              >
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Explore Your Dashboard: Click here to manage your bookings and preferences.
              </Button>
              
              <Button 
                onClick={handleDownload}
                className="w-full justify-start border-2 border-[#6b46c1] text-[#6b46c1] hover:bg-[#6b46c1] hover:text-white"
                variant="outline"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Confirmation: Save a copy of your booking details
              </Button>
              
              <Button 
                onClick={handleContactSupport}
                className="w-full justify-start border-2 border-[#6b46c1] text-[#6b46c1] hover:bg-[#6b46c1] hover:text-white"
                variant="outline"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Contact Support: Need assistance? Reach out via the menu.
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <p className="text-xl font-bold bg-gradient-to-r from-[#6b46c1] to-[#d53f8c] bg-clip-text text-transparent">Thank you for choosing us!</p>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmedPage;