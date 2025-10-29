import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Calendar, Users, PartyPopper, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PreferenceQuestionnaire from '@/components/booking/PreferenceQuestionnaire';
import AuthPrompt from '@/components/booking/AuthPrompt';

const CTASection = () => {
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);
  const [preferences, setPreferences] = useState(null);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleBookNow = () => {
    setShowQuestionnaire(true);
  };

  const handleQuestionnaireComplete = (preferenceData: any) => {
    setPreferences(preferenceData);
    setShowQuestionnaire(false);
    
    if (isAuthenticated) {
      navigate('/booking-details', { state: { preferences: preferenceData } });
    } else {
      // Store preferences for post-auth redirect
      sessionStorage.setItem('bookingPreferences', JSON.stringify(preferenceData));
      setShowAuthPrompt(true);
    }
  };

  const handleAuthComplete = () => {
    setShowAuthPrompt(false);
    if (preferences) {
      navigate('/booking-details', { state: { preferences } });
    }
  };

  return (
    <section className="py-20 bg-gradient-hero relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-party-pattern opacity-20" />
      <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-float" />
      <div className="absolute bottom-10 right-10 w-24 h-24 bg-white/10 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-white/5 rounded-full blur-2xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center text-white">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Make Your Next Event<br />
            <span className="text-secondary">Hassle-Free</span>
          </h2>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto leading-relaxed">
            Join thousands of satisfied customers who trust us with their special moments. 
            Start planning your perfect event today!
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col lg:flex-row gap-6 justify-center items-center mb-12">
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-4 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
              asChild
            >
              <Link to="/find-venues">
                <Calendar className="mr-2 h-5 w-5" />
                Explore Venues
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            
            <Button 
              size="lg" 
              variant="outline"
              className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-primary text-lg px-8 py-4 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
              onClick={handleBookNow}
            >
              <PartyPopper className="mr-2 h-5 w-5" />
              Book Now
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            

          </div>

          {/* Trust Indicators */}
          <div className="text-center opacity-80">
            <p className="text-lg mb-4">Trusted by industry leaders</p>
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm">
              <span>✨ 4.9/5 Rating</span>
              <span>🛡️ Secure Payments</span>
              <span>🚀 Instant Booking</span>
              <span>💬 24/7 Support</span>
            </div>
          </div>
        </div>
      </div>
      
      <PreferenceQuestionnaire
        isOpen={showQuestionnaire}
        onClose={() => setShowQuestionnaire(false)}
        onComplete={handleQuestionnaireComplete}
      />
      
      <AuthPrompt
        isOpen={showAuthPrompt}
        onClose={() => setShowAuthPrompt(false)}
        onAuthComplete={handleAuthComplete}
      />
    </section>
  );
};

export default CTASection;