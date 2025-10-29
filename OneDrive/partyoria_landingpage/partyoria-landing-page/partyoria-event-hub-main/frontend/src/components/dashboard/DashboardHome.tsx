import { Calendar, DollarSign, Users, AlertCircle, TrendingUp, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const stats = [
  {
    title: "Active Events",
    value: "3",
    change: "+2 this month",
    icon: Calendar,
    color: "bg-gradient-accent"
  },
  {
    title: "Total Budget",
    value: "₹2,45,000",
    change: "65% allocated",
    icon: DollarSign,
    color: "bg-gradient-card"
  },
  {
    title: "Vendors",
    value: "12",
    change: "8 confirmed",
    icon: Users,
    color: "bg-gradient-hero"
  },
  {
    title: "Pending Tasks",
    value: "7",
    change: "2 due today",
    icon: AlertCircle,
    color: "bg-gradient-accent"
  }
];

const recentEvents = [
  {
    name: "Annual Company Gala",
    date: "Dec 15, 2024",
    status: "In Progress",
    budget: "₹1,50,000",
    completion: 75
  },
  {
    name: "Product Launch Party",
    date: "Jan 10, 2025",
    status: "Planning",
    budget: "₹80,000",
    completion: 30
  },
  {
    name: "Team Building Event",
    date: "Feb 5, 2025",
    status: "Draft",
    budget: "₹15,000",
    completion: 10
  }
];

const upcomingTasks = [
  { task: "Finalize catering menu", due: "Today", priority: "High" },
  { task: "Book photography team", due: "Tomorrow", priority: "Medium" },
  { task: "Send invitations", due: "Dec 12", priority: "High" },
  { task: "Confirm venue setup", due: "Dec 14", priority: "Low" }
];

const autoVendorSuggestions = [
  {
    eventType: "Corporate Event",
    vendors: [
      { name: "Spice Garden Catering", category: "Catering", rating: 4.8, price: "₹500/person" },
      { name: "Pixel Perfect", category: "Photography", rating: 4.9, price: "₹15,000" },
      { name: "Sound Waves", category: "Audio/Visual", rating: 4.7, price: "₹8,000" }
    ]
  },
  {
    eventType: "Wedding",
    vendors: [
      { name: "Royal Kitchen", category: "Catering", rating: 4.9, price: "₹800/person" },
      { name: "Dream Decorators", category: "Decoration", rating: 4.8, price: "₹25,000" },
      { name: "Capture Moments", category: "Photography", rating: 4.9, price: "₹30,000" }
    ]
  },
  {
    eventType: "Birthday Party",
    vendors: [
      { name: "Food Fantasy", category: "Catering", rating: 4.6, price: "₹400/person" },
      { name: "Elite Events", category: "Decoration", rating: 4.7, price: "₹12,000" },
      { name: "Party Beats", category: "DJ/Music", rating: 4.8, price: "₹6,000" }
    ]
  }
];

export function DashboardHome() {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-hero rounded-2xl p-8 text-white shadow-glow">
        <h1 className="text-3xl font-bold mb-2">Welcome to your Event Dashboard</h1>
        <p className="text-white/90 text-lg">
          Manage your events, vendors, and budgets all in one place
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="relative overflow-hidden border-0 shadow-card">
            <div className={`absolute inset-0 ${stat.color} opacity-5`} />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.color}`}>
                <stat.icon className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Events */}
        <Card className="shadow-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-primary" />
              <span>Recent Events</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentEvents.map((event, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gradient-subtle rounded-lg border border-border/50">
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{event.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{event.date}</p>
                  <div className="flex items-center space-x-2">
                    <Badge 
                      variant={event.status === "In Progress" ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {event.status}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{event.budget}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium mb-1">{event.completion}%</div>
                  <div className="w-16 h-2 bg-muted rounded-full">
                    <div 
                      className="h-full bg-gradient-accent rounded-full transition-all duration-300"
                      style={{ width: `${event.completion}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full" onClick={() => navigate('/dashboard/customer/events')}>
              View All Events
            </Button>
          </CardContent>
        </Card>

        {/* Upcoming Tasks */}
        <Card className="shadow-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              <span>Upcoming Tasks</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingTasks.map((task, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gradient-subtle rounded-lg border border-border/50">
                <div className="flex-1">
                  <h4 className="font-medium mb-1">{task.task}</h4>
                  <p className="text-sm text-muted-foreground">Due: {task.due}</p>
                </div>
                <Badge 
                  variant={
                    task.priority === "High" ? "destructive" : 
                    task.priority === "Medium" ? "default" : "secondary"
                  }
                  className="text-xs"
                >
                  {task.priority}
                </Badge>
              </div>
            ))}
            <Button variant="outline" className="w-full" onClick={() => navigate('/dashboard/customer/analytics')}>
              View All Tasks
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="shadow-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <span>Quick Actions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              className="bg-gradient-hero text-white hover:opacity-90 transition-opacity"
              onClick={() => navigate('/dashboard/customer/events/create')}
            >
              Create New Event
            </Button>
            <Button variant="outline" onClick={() => navigate('/dashboard/customer/vendors')}>
              Browse Vendors
            </Button>
            <Button variant="outline" onClick={() => navigate('/dashboard/customer/finance')}>
              View Budget Report
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Auto Vendor Matching */}
      <Card className="shadow-card border-0">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-primary" />
            <span>Smart Vendor Recommendations</span>
            <Badge variant="secondary" className="ml-2">Auto-Match</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {autoVendorSuggestions.map((suggestion, index) => (
              <div key={index} className="space-y-3">
                <h4 className="font-semibold text-primary">{suggestion.eventType}</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {suggestion.vendors.map((vendor, vIndex) => (
                    <div key={vIndex} className="border rounded-lg p-4 bg-gradient-subtle hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-medium">{vendor.name}</h5>
                        <div className="flex items-center space-x-1">
                          <span className="text-yellow-500">★</span>
                          <span className="text-sm">{vendor.rating}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{vendor.category}</p>
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-primary">{vendor.price}</span>
                        <Button size="sm" variant="outline" onClick={() => navigate('/dashboard/customer/vendors')}>
                          Contact
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}