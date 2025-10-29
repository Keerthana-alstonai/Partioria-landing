import { Card, CardContent } from '@/components/ui/card';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Emily Rodriguez",
    role: "Bride",
    event: "Wedding - 150 guests",
    rating: 5,
    content: "Partyoria made our wedding planning so much easier! We found the perfect venue, caterer, and photographer all in one place. Our organizer, Sarah, was incredible and handled everything flawlessly.",
    image: "👰"
  },
  {
    name: "David Kim",
    role: "CEO",
    event: "Corporate Retreat - 50 attendees",
    rating: 5,
    content: "As a busy CEO, I didn't have time to plan our company retreat. Partyoria's organizer took care of everything from venue to team activities. It was our most successful retreat yet!",
    image: "👨‍💼"
  },
  {
    name: "Maria Santos",
    role: "Mother",
    event: "15th Birthday Party - 30 guests",
    rating: 5,
    content: "My daughter's quinceañera was absolutely perfect! The vendors we found through Partyoria were professional, affordable, and delivered exactly what we wanted. Highly recommend!",
    image: "👩‍👧"
  },
  {
    name: "James Wilson",
    role: "Catering Vendor",
    event: "Vendor Success Story",
    rating: 5,
    content: "Since joining Partyoria, my catering business has grown by 200%! The platform brings me qualified leads and the payment system is seamless. It's been a game-changer for my business.",
    image: "👨‍🍳"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            What Our <span className="text-party-gradient">Community</span> Says
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real stories from customers, vendors, and organizers who've experienced the Partyoria difference
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="card-party group hover:shadow-glow relative">
              <CardContent className="p-6 space-y-4">
                {/* Quote Icon */}
                <div className="absolute top-4 right-4 opacity-20">
                  <Quote className="h-8 w-8 text-primary" />
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-secondary text-secondary" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-muted-foreground leading-relaxed text-sm">
                  "{testimonial.content}"
                </p>

                {/* Profile */}
                <div className="flex items-center space-x-3 pt-4 border-t border-border/50">
                  <div className="text-2xl">{testimonial.image}</div>
                  <div>
                    <p className="font-semibold text-sm">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                    <p className="text-xs text-primary font-medium">{testimonial.event}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Success Stats */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div className="card-gradient p-6 rounded-2xl">
            <div className="text-3xl md:text-4xl font-bold text-party-gradient mb-2">4.9/5</div>
            <div className="text-muted-foreground text-sm">Average Rating</div>
          </div>
          <div className="card-gradient p-6 rounded-2xl">
            <div className="text-3xl md:text-4xl font-bold text-party-gradient mb-2">98%</div>
            <div className="text-muted-foreground text-sm">Customer Satisfaction</div>
          </div>
          <div className="card-gradient p-6 rounded-2xl">
            <div className="text-3xl md:text-4xl font-bold text-party-gradient mb-2">24hrs</div>
            <div className="text-muted-foreground text-sm">Average Response Time</div>
          </div>
          <div className="card-gradient p-6 rounded-2xl">
            <div className="text-3xl md:text-4xl font-bold text-party-gradient mb-2">99.9%</div>
            <div className="text-muted-foreground text-sm">Event Success Rate</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;