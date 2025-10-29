import { Button } from '@/components/ui/button';
import { PartyPopper, Users, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroVideo from '@/assets/partyoriainvideo.mp4';

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen bg-party-pattern overflow-hidden group">
      {/* Video Background */}
      <video 
        className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        style={{ filter: 'brightness(1.3) contrast(1.4) saturate(1.2)' }}
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      {/* Dark Overlay for text visibility */}
      <div className="absolute inset-0 bg-black/50 z-10" />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 z-15" />
      
      {/* Floating Decorations */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-secondary/20 rounded-full blur-xl animate-float" />
      <div className="absolute top-40 right-20 w-32 h-32 bg-accent/20 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-40 left-20 w-24 h-24 bg-primary/20 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }} />

      {/* Main Content - Bottom positioned */}
      <div className="absolute bottom-32 left-0 right-0 z-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-party-gradient">
              Plan Your Dream Event with Ease
            </h1>
            
            {/* Subheadline */}
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed text-white">
              Vendors, Organizers & Everything You Need in One Place. 
              Book vendors directly or hire an expert organizer to handle everything for you.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="btn-party text-lg px-8 py-4" asChild>
                <Link to="/dashboard/customer">
                  <Calendar className="mr-2 h-5 w-5" />
                  Plan My Event
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="btn-party-outline text-lg px-8 py-4" asChild>
                <Link to="/find-venues">
                  <Users className="mr-2 h-5 w-5" />
                  Explore Venues
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Trust Indicators - Fixed at bottom */}
      <div className="absolute bottom-4 left-0 right-0 z-30 bg-black/20 backdrop-blur-sm py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">10,000+</div>
              <div className="text-sm text-white/80">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">5,000+</div>
              <div className="text-sm text-white/80">Trusted Vendors</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">500+</div>
              <div className="text-sm text-white/80">Expert Organizers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">50,000+</div>
              <div className="text-sm text-white/80">Events Planned</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;