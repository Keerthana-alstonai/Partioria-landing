import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter, Star, MapPin, Phone, Mail, Heart, Send } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const categories = [
  { id: "all", name: "All Categories" },
  { id: "catering", name: "Catering" },
  { id: "decoration", name: "Decoration" },
  { id: "photography", name: "Photography" },
  { id: "music", name: "Music & DJ" },
  { id: "transport", name: "Transportation" },
  { id: "venue", name: "Venues" },
  { id: "flowers", name: "Florists" }
];

const vendors = [
  {
    id: 1,
    name: "Spice Garden Catering",
    category: "Catering",
    rating: 4.8,
    reviews: 124,
    location: "Mumbai",
    price: "₹500-800/plate",
    image: "/api/placeholder/300/200",
    services: ["Multi-cuisine", "Live Counters", "Desserts"],
    verified: true,
    description: "Premium catering services with authentic flavors and live cooking stations."
  },
  {
    id: 2,
    name: "Dream Decorators",
    category: "Decoration",
    rating: 4.9,
    reviews: 98,
    location: "Delhi",
    price: "₹25,000-1,00,000",
    image: "/api/placeholder/300/200",
    services: ["Stage Decoration", "Floral Arrangements", "Theme Setup"],
    verified: true,
    description: "Creative decoration specialists transforming venues into dream spaces."
  },
  {
    id: 3,
    name: "Pixel Perfect Photography",
    category: "Photography",
    rating: 4.7,
    reviews: 156,
    location: "Bangalore",
    price: "₹15,000-50,000",
    image: "/api/placeholder/300/200",
    services: ["Event Photography", "Videography", "Drone Shots"],
    verified: true,
    description: "Professional photographers capturing your precious moments with artistic flair."
  },
  {
    id: 4,
    name: "Sound Waves DJ",
    category: "Music & DJ",
    rating: 4.6,
    reviews: 89,
    location: "Mumbai",
    price: "₹8,000-25,000",
    image: "/api/placeholder/300/200",
    services: ["DJ Services", "Sound System", "Lighting"],
    verified: false,
    description: "Professional DJ services with latest music and high-quality sound systems."
  },
  {
    id: 5,
    name: "Luxury Rides Transport",
    category: "Transportation",
    rating: 4.5,
    reviews: 67,
    location: "Delhi",
    price: "₹2,000-15,000/day",
    image: "/api/placeholder/300/200",
    services: ["Luxury Cars", "Bus Rental", "Airport Transfers"],
    verified: true,
    description: "Premium transportation services for seamless guest mobility."
  },
  {
    id: 6,
    name: "Grand Ballroom Venues",
    category: "Venues",
    rating: 4.8,
    reviews: 201,
    location: "Mumbai",
    price: "₹20,000-80,000/day",
    image: "/api/placeholder/300/200",
    services: ["Wedding Halls", "Conference Rooms", "Outdoor Spaces"],
    verified: true,
    description: "Elegant venues with modern amenities for all types of events."
  }
];

export function BrowseVendors() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [favorites, setFavorites] = useState<number[]>([]);

  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || vendor.category.toLowerCase() === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFavorite = (vendorId: number) => {
    setFavorites(prev => 
      prev.includes(vendorId) 
        ? prev.filter(id => id !== vendorId)
        : [...prev, vendorId]
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-card rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Browse Vendors</h1>
        <p className="text-white/90">Discover and connect with verified event service providers</p>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-card">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search vendors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full lg:w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredVendors.map((vendor) => (
          <Card key={vendor.id} className="border-0 shadow-card hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <div className="relative">
                <img 
                  src={vendor.image} 
                  alt={vendor.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className={`absolute top-3 right-3 ${
                    favorites.includes(vendor.id) 
                      ? "text-red-500 hover:text-red-600" 
                      : "text-white hover:text-red-500"
                  }`}
                  onClick={() => toggleFavorite(vendor.id)}
                >
                  <Heart 
                    className={`h-5 w-5 ${favorites.includes(vendor.id) ? "fill-current" : ""}`} 
                  />
                </Button>
                {vendor.verified && (
                  <Badge className="absolute top-3 left-3 bg-green-500 hover:bg-green-600">
                    Verified
                  </Badge>
                )}
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold">{vendor.name}</h3>
                  <Badge variant="secondary">{vendor.category}</Badge>
                </div>
                
                <div className="flex items-center space-x-4 mb-3">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{vendor.rating}</span>
                    <span className="text-sm text-muted-foreground">({vendor.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center space-x-1 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{vendor.location}</span>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3">{vendor.description}</p>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {vendor.services.map((service, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {service}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="text-lg font-semibold text-primary">
                    {vendor.price}
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => window.open(`tel:+919876543210`)}>
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => window.open(`mailto:vendor@example.com`)}>
                      <Mail className="h-4 w-4" />
                    </Button>
                    <Button size="sm" className="bg-gradient-hero text-white hover:opacity-90" onClick={() => navigate('/dashboard/customer/communication')}>
                      <Send className="h-4 w-4 mr-2" />
                      RFQ
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredVendors.length === 0 && (
        <Card className="border-0 shadow-card">
          <CardContent className="p-12 text-center">
            <div className="text-muted-foreground mb-4">No vendors found matching your criteria</div>
            <Button onClick={() => { setSearchTerm(""); setSelectedCategory("all"); }}>
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}