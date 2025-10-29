import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Users, Award } from 'lucide-react';

const topOrganizers = [
  {
    id: 1,
    name: "Elite Event Planners",
    rating: 4.9,
    reviews: 150,
    location: "Mumbai",
    speciality: "Corporate Events",
    price: "₹50,000+",
    image: "👨‍💼",
    experience: "8+ years"
  },
  {
    id: 2,
    name: "Dream Wedding Co.",
    rating: 4.8,
    reviews: 200,
    location: "Delhi",
    speciality: "Weddings",
    price: "₹1,00,000+",
    image: "💒",
    experience: "10+ years"
  },
  {
    id: 3,
    name: "Party Perfect",
    rating: 4.7,
    reviews: 120,
    location: "Bangalore",
    speciality: "Birthday Parties",
    price: "₹25,000+",
    image: "🎉",
    experience: "5+ years"
  },
  {
    id: 4,
    name: "Festival Masters",
    rating: 4.9,
    reviews: 180,
    location: "Pune",
    speciality: "Cultural Events",
    price: "₹75,000+",
    image: "🎭",
    experience: "12+ years"
  }
];

const TopOrganizersSection = () => {
  return (
    <section id="top-organizers" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Top <span className="text-party-gradient">Organizers</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Connect with our verified professional event organizers who will handle everything for you
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {topOrganizers.map((organizer) => (
            <Card key={organizer.id} className="card-party group hover:shadow-glow">
              <CardHeader className="text-center pb-4">
                <div className="text-6xl mb-4">{organizer.image}</div>
                <CardTitle className="text-xl text-party-gradient">{organizer.name}</CardTitle>
                <div className="flex items-center justify-center space-x-1 mb-2">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{organizer.rating}</span>
                  <span className="text-sm text-muted-foreground">({organizer.reviews} reviews)</span>
                </div>
                <div className="flex items-center justify-center space-x-1 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{organizer.location}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Badge variant="secondary" className="w-full justify-center">
                    {organizer.speciality}
                  </Badge>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center space-x-1">
                      <Award className="h-4 w-4 text-secondary" />
                      <span>{organizer.experience}</span>
                    </span>
                    <span className="font-medium text-primary">{organizer.price}</span>
                  </div>
                </div>
                <Button className="w-full btn-party">
                  <Users className="h-4 w-4 mr-2" />
                  Hire Organizer
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            View All Organizers
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TopOrganizersSection;