import { Card } from '@/components/ui/card';

// Updated for customer focus
const FeaturedSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why Choose <span className="text-party-gradient">Partyoria</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need for the perfect event, all in one place
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="card-party text-center p-8">
            <div className="text-6xl mb-4">🎯</div>
            <h3 className="text-2xl font-bold mb-4">Personalized Matching</h3>
            <p className="text-muted-foreground">
              Our smart algorithm matches you with the perfect vendors and organizers based on your specific needs and budget.
            </p>
          </Card>
          
          <Card className="card-party text-center p-8">
            <div className="text-6xl mb-4">🛡️</div>
            <h3 className="text-2xl font-bold mb-4">Verified & Trusted</h3>
            <p className="text-muted-foreground">
              All our vendors and organizers are thoroughly vetted with verified reviews from real customers.
            </p>
          </Card>
          
          <Card className="card-party text-center p-8">
            <div className="text-6xl mb-4">💰</div>
            <h3 className="text-2xl font-bold mb-4">Best Price Guarantee</h3>
            <p className="text-muted-foreground">
              Compare prices instantly and get the best deals. We guarantee competitive pricing for all services.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;