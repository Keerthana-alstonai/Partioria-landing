import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Star, 
  Shield, 
  HeadphonesIcon,
  Store,
  TrendingUp,
  CreditCard,
  Award,
  Users,
  Briefcase,
  Trophy,
  Target
} from 'lucide-react';

const UserTypeSection = () => {
  return (
    <section id="user-types" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Perfect for <span className="text-party-gradient">Everyone</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Whether you're planning an event, offering services, or managing events professionally - we've got you covered.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* For Customers */}
          <Card className="card-party group hover:shadow-glow">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-gradient-hero rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Calendar className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-party-gradient">For Customers</CardTitle>
              <CardDescription className="text-base">
                Plan your perfect event with ease
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Star className="h-5 w-5 text-secondary flex-shrink-0" />
                  <span className="text-sm">Easy vendor discovery & comparison</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-secondary flex-shrink-0" />
                  <span className="text-sm">Transparent pricing & verified reviews</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-secondary flex-shrink-0" />
                  <span className="text-sm">Option to hire professional organizers</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CreditCard className="h-5 w-5 text-secondary flex-shrink-0" />
                  <span className="text-sm">Secure online payments</span>
                </div>
                <div className="flex items-center space-x-3">
                  <HeadphonesIcon className="h-5 w-5 text-secondary flex-shrink-0" />
                  <span className="text-sm">24/7 customer support</span>
                </div>
              </div>
              <Button className="w-full btn-party mt-6" asChild>
                <Link to="/explore-venues">
                  Explore Venues
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* For Vendors */}
          <div id="vendors">
            <Card className="card-party group hover:shadow-glow">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-card rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Store className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-gold-gradient">For Vendors</CardTitle>
                <CardDescription className="text-base">
                  Grow your event services business
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Target className="h-5 w-5 text-secondary flex-shrink-0" />
                    <span className="text-sm">Get verified leads directly from customers</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="h-5 w-5 text-secondary flex-shrink-0" />
                    <span className="text-sm">Manage availability & bookings easily</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CreditCard className="h-5 w-5 text-secondary flex-shrink-0" />
                    <span className="text-sm">Secure payment processing</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Award className="h-5 w-5 text-secondary flex-shrink-0" />
                    <span className="text-sm">Build reputation with customer reviews</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Shield className="h-5 w-5 text-secondary flex-shrink-0" />
                    <span className="text-sm">Verified vendor badge & credibility</span>
                  </div>
                </div>
                <Button className="w-full btn-gold mt-6" asChild>
                  <Link to="/login">
                    Register as Vendor
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* For Organizers */}
          <div id="organizers" className="scroll-mt-20">
            <Card className="card-party group hover:shadow-glow">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-accent rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Briefcase className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-party-gradient">For Organizers</CardTitle>
                <CardDescription className="text-base">
                  Professional event management made simple
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Users className="h-5 w-5 text-secondary flex-shrink-0" />
                    <span className="text-sm">Get matched with clients seeking full-service</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="h-5 w-5 text-secondary flex-shrink-0" />
                    <span className="text-sm">Manage multiple vendors from one dashboard</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CreditCard className="h-5 w-5 text-secondary flex-shrink-0" />
                    <span className="text-sm">Earn commissions on successful bookings</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Trophy className="h-5 w-5 text-secondary flex-shrink-0" />
                    <span className="text-sm">Build reputation with ratings & reviews</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Award className="h-5 w-5 text-secondary flex-shrink-0" />
                    <span className="text-sm">Professional organizer certification</span>
                  </div>
                </div>
                <Button className="w-full btn-party mt-6" asChild>
                  <Link to="/login">
                    Register as Organizer
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserTypeSection;