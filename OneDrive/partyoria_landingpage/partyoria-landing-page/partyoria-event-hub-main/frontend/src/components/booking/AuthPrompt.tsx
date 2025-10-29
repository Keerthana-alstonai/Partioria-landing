import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { UserPlus, LogIn } from 'lucide-react';

interface AuthPromptProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthComplete?: () => void;
  selectedVenue?: any;
}

const AuthPrompt = ({ isOpen, onClose, onAuthComplete, selectedVenue }: AuthPromptProps) => {
  const handleAuthRedirect = () => {
    onClose();
    // Store venue data in both localStorage and sessionStorage for persistence
    if (selectedVenue) {
      localStorage.setItem('selectedVenue', JSON.stringify(selectedVenue));
      sessionStorage.setItem('selectedVenue', JSON.stringify(selectedVenue));
    }
    sessionStorage.setItem('postAuthCallback', 'booking-flow');
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md text-center bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-white/20 shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-[#6b46c1] to-[#d53f8c] bg-clip-text text-transparent mb-4">
            Please log in to proceed
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-6">
          <p className="text-gray-600 mb-6">
            Please log in to proceed with your booking. If you don't have an account, you can sign up here.
          </p>
          
          <div className="space-y-3">
            <Button asChild className="w-full bg-gradient-to-r from-[#6b46c1] to-[#d53f8c] hover:opacity-90 text-white border-0">
              <Link to="/login" onClick={handleAuthRedirect}>
                <LogIn className="mr-2 h-4 w-4" />
                Log In
              </Link>
            </Button>
            
            <Button variant="outline" asChild className="w-full border-2 border-[#6b46c1] text-[#6b46c1] hover:bg-[#6b46c1] hover:text-white">
              <Link to="/signup" onClick={handleAuthRedirect}>
                <UserPlus className="mr-2 h-4 w-4" />
                Sign Up
              </Link>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthPrompt;