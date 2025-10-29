import { Search, Users, CreditCard, CheckCircle } from 'lucide-react';
import howItWorksImage from '@/assets/how-it-works.jpg';

const steps = [
  {
    icon: Search,
    title: "Choose Your Path",
    description: "Select Direct Booking to browse vendors yourself, or Hire an Organizer for full-service planning"
  },
  {
    icon: Users,
    title: "Browse & Connect",
    description: "Explore our verified vendors and expert organizers, or fill out our event discovery form"
  },
  {
    icon: CreditCard,
    title: "Compare & Book",
    description: "Review pricing, availability, and customer reviews to make the perfect choice"
  },
  {
    icon: CheckCircle,
    title: "Celebrate Stress-Free",
    description: "Confirm your booking, pay securely, and enjoy your perfectly planned event"
  }
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            How <span className="text-party-gradient">Partyoria</span> Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From idea to celebration in four simple steps. We make event planning effortless.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Steps */}
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start space-x-4 group">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-hero rounded-2xl flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform duration-300">
                  <step.icon className="h-8 w-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Illustration */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-elegant">
              <img 
                src={howItWorksImage} 
                alt="How Partyoria Works" 
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-secondary/30 rounded-full blur-xl animate-bounce-gentle" />
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-accent/30 rounded-full blur-xl animate-bounce-gentle" style={{ animationDelay: '1s' }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;