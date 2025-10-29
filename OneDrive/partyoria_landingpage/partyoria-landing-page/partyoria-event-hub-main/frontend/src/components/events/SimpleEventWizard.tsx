import { useState } from "react";
import { Calendar, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const eventTypes = [
  // Personal & Social Events
  { id: "birthday", name: "Birthday Party", description: "Personal & Social Events" },
  { id: "engagement", name: "Engagement", description: "Personal & Social Events" },
  { id: "wedding-north", name: "Wedding (North Indian)", description: "Personal & Social Events" },
  { id: "wedding-south", name: "Wedding (South Indian)", description: "Personal & Social Events" },
  { id: "wedding-destination", name: "Wedding (Destination)", description: "Personal & Social Events" },
  { id: "baby-shower", name: "Baby Shower / Naming Ceremony", description: "Personal & Social Events" },
  { id: "housewarming", name: "Housewarming (Griha Pravesh)", description: "Personal & Social Events" },
  { id: "anniversary", name: "Anniversary", description: "Personal & Social Events" },
  { id: "retirement", name: "Retirement Party", description: "Personal & Social Events" },
  { id: "family-reunion", name: "Family Reunion", description: "Personal & Social Events" },
  { id: "get-together", name: "Get-together / Kitty Party", description: "Personal & Social Events" },
  { id: "alumni-meet", name: "Alumni Meet", description: "Personal & Social Events" },
  { id: "farewell", name: "Farewell Party", description: "Personal & Social Events" },
  { id: "freshers", name: "Freshers' Party", description: "Personal & Social Events" },
  
  // Corporate & Professional Events
  { id: "conference", name: "Conference", description: "Corporate & Professional Events" },
  { id: "seminar", name: "Seminar / Workshop", description: "Corporate & Professional Events" },
  { id: "product-launch", name: "Product Launch", description: "Corporate & Professional Events" },
  { id: "award-function", name: "Award Function", description: "Corporate & Professional Events" },
  { id: "team-building", name: "Team-Building Retreat", description: "Corporate & Professional Events" },
  { id: "trade-show", name: "Trade Show / Expo", description: "Corporate & Professional Events" },
  { id: "annual-day", name: "Annual Day Celebration", description: "Corporate & Professional Events" },
  { id: "startup-pitch", name: "Startup Pitch Event", description: "Corporate & Professional Events" },
  { id: "career-fair", name: "Career Fair / Job Fair", description: "Corporate & Professional Events" },
  { id: "hackathon", name: "Hackathon", description: "Corporate & Professional Events" },
  { id: "investor-meet", name: "Investor Meet", description: "Corporate & Professional Events" },
  
  // Festivals & Cultural Events
  { id: "diwali", name: "Diwali Celebration", description: "Festivals & Cultural Events" },
  { id: "holi", name: "Holi Party", description: "Festivals & Cultural Events" },
  { id: "ganesh-chaturthi", name: "Ganesh Chaturthi", description: "Festivals & Cultural Events" },
  { id: "navratri", name: "Navratri Garba / Dandiya Night", description: "Festivals & Cultural Events" },
  { id: "durga-puja", name: "Durga Puja Celebration", description: "Festivals & Cultural Events" },
  { id: "onam", name: "Onam Festival", description: "Festivals & Cultural Events" },
  { id: "pongal", name: "Pongal / Makar Sankranti", description: "Festivals & Cultural Events" },
  { id: "eid", name: "Eid Gathering", description: "Festivals & Cultural Events" },
  { id: "christmas", name: "Christmas Celebration", description: "Festivals & Cultural Events" },
  { id: "new-year", name: "New Year Party", description: "Festivals & Cultural Events" },
  { id: "lohri", name: "Lohri", description: "Festivals & Cultural Events" },
  { id: "baisakhi", name: "Baisakhi", description: "Festivals & Cultural Events" },
  { id: "janmashtami", name: "Janmashtami", description: "Festivals & Cultural Events" },
  { id: "independence-day", name: "Independence Day Function", description: "Festivals & Cultural Events" },
  { id: "republic-day", name: "Republic Day Function", description: "Festivals & Cultural Events" },
  { id: "temple-festival", name: "Temple Festival / Rath Yatra", description: "Festivals & Cultural Events" },
  { id: "cultural-fair", name: "Cultural Fair / Mela", description: "Festivals & Cultural Events" },
  
  // Entertainment & Lifestyle Events
  { id: "music-concert", name: "Music Concert", description: "Entertainment & Lifestyle Events" },
  { id: "dj-night", name: "DJ Night", description: "Entertainment & Lifestyle Events" },
  { id: "fashion-show", name: "Fashion Show", description: "Entertainment & Lifestyle Events" },
  { id: "comedy-night", name: "Comedy Night", description: "Entertainment & Lifestyle Events" },
  { id: "film-screening", name: "Film Screening / Premiere", description: "Entertainment & Lifestyle Events" },
  { id: "food-festival", name: "Food Festival", description: "Entertainment & Lifestyle Events" },
  { id: "sports-tournament", name: "Marathon / Cyclothon / Sports Tournament", description: "Entertainment & Lifestyle Events" },
  { id: "cultural-fest", name: "College Cultural Fest", description: "Entertainment & Lifestyle Events" },
  { id: "art-exhibition", name: "Art Exhibition", description: "Entertainment & Lifestyle Events" },
  { id: "book-fair", name: "Book Fair", description: "Entertainment & Lifestyle Events" },
  { id: "theatre", name: "Theatre / Drama Show", description: "Entertainment & Lifestyle Events" },
  { id: "photography-exhibition", name: "Photography Exhibition", description: "Entertainment & Lifestyle Events" },
  
  // Social & Public Events
  { id: "political-rally", name: "Political Rally / Campaign", description: "Social & Public Events" },
  { id: "charity-event", name: "NGO Charity Event / Fundraiser", description: "Social & Public Events" },
  { id: "awareness-campaign", name: "Awareness Campaign (Health, Education, Environment)", description: "Social & Public Events" }
];

export function EventWizard() {
  const [eventCreated, setEventCreated] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    date: "",
    time: "",
    phone: "",
    guests: "",
    budget: "",
    description: "",
  });

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-card rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Create New Event</h1>
        <p className="text-white/90">Fill in the details to create your event</p>
      </div>

      {/* Form Content */}
      <Card className="border-0 shadow-card">
        <CardHeader>
          <CardTitle>Event Details</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="eventName">Event Name</Label>
                <Input
                  id="eventName"
                  placeholder="Enter event name"
                  value={formData.name}
                  onChange={(e) => updateFormData("name", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={(e) => updateFormData("phone", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="eventType">Event Type</Label>
              <Select value={formData.type} onValueChange={(value) => updateFormData("type", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Search or select event type" />
                </SelectTrigger>
                <SelectContent className="max-h-[300px]">
                  <div className="sticky top-0 bg-background p-2 border-b z-10" onPointerDown={(e) => e.stopPropagation()}>
                    <Input
                      placeholder="Search event types..."
                      className="h-8"
                      value={searchTerm}
                      onKeyDown={(e) => e.stopPropagation()}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  {eventTypes
                    .filter(type => 
                      type.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      type.description.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        <div>
                          <div className="font-medium">{type.name}</div>
                          <div className="text-sm text-muted-foreground">{type.description}</div>
                        </div>
                      </SelectItem>
                    ))
                  }
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="eventDate">Event Date</Label>
                <Input
                  id="eventDate"
                  type="date"
                  value={formData.date}
                  onChange={(e) => updateFormData("date", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="eventTime">Event Time</Label>
                <Input
                  id="eventTime"
                  type="time"
                  value={formData.time}
                  onChange={(e) => updateFormData("time", e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="guests">Expected Guests</Label>
                <Input
                  id="guests"
                  type="number"
                  placeholder="Number of guests"
                  value={formData.guests}
                  onChange={(e) => updateFormData("guests", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="budget">Budget</Label>
                <Input
                  id="budget"
                  placeholder="₹ Enter budget"
                  value={formData.budget}
                  onChange={(e) => updateFormData("budget", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Event Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your event..."
                value={formData.description}
                onChange={(e) => updateFormData("description", e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-end">
        <Button
          onClick={() => setEventCreated(true)}
          className="bg-gradient-hero text-white hover:opacity-90"
        >
          Create Event
        </Button>
      </div>

      {/* Success Message */}
      {eventCreated && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="p-8 text-center max-w-md">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Event Created Successfully!</h2>
            <p className="text-muted-foreground mb-4">Your event has been created and saved.</p>
            <Button onClick={() => setEventCreated(false)}>Close</Button>
          </Card>
        </div>
      )}
    </div>
  );
}