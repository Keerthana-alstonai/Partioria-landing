import { BarChart3, TrendingUp, DollarSign, Users, Calendar, PieChart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const spendingData = [
  { category: "Venue", amount: 75000, percentage: 35, color: "bg-gradient-hero" },
  { category: "Catering", amount: 45000, percentage: 21, color: "bg-gradient-card" },
  { category: "Decoration", amount: 30000, percentage: 14, color: "bg-gradient-accent" },
  { category: "Photography", amount: 25000, percentage: 12, color: "bg-blue-500" },
  { category: "Music & Entertainment", amount: 20000, percentage: 9, color: "bg-green-500" },
  { category: "Transportation", amount: 15000, percentage: 7, color: "bg-purple-500" },
  { category: "Miscellaneous", amount: 5000, percentage: 2, color: "bg-gray-500" }
];

const vendorPerformance = [
  { name: "Spice Garden Catering", rating: 4.8, projects: 3, onTime: 100, budgetAdherence: 95 },
  { name: "Dream Decorators", rating: 4.9, projects: 2, onTime: 100, budgetAdherence: 98 },
  { name: "Pixel Perfect Photography", rating: 4.7, projects: 4, onTime: 90, budgetAdherence: 92 },
  { name: "Sound Waves DJ", rating: 4.6, projects: 2, onTime: 85, budgetAdherence: 90 }
];

const monthlySpending = [
  { month: "Jan", spending: 45000, events: 1 },
  { month: "Feb", spending: 32000, events: 1 },
  { month: "Mar", spending: 58000, events: 2 },
  { month: "Apr", spending: 41000, events: 1 },
  { month: "May", spending: 67000, events: 2 },
  { month: "Jun", spending: 39000, events: 1 }
];

const eventMetrics = {
  totalEvents: 12,
  completedEvents: 8,
  averageBudget: 65000,
  averageGuests: 150,
  budgetAccuracy: 92,
  customerSatisfaction: 4.7
};

export function AnalyticsDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-card rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
        <p className="text-white/90">Get insights into your event spending, vendor performance, and success metrics</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Events</p>
                <p className="text-2xl font-bold">{eventMetrics.totalEvents}</p>
                <p className="text-xs text-green-600">+2 this month</p>
              </div>
              <div className="p-3 bg-gradient-hero rounded-lg">
                <Calendar className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Budget</p>
                <p className="text-2xl font-bold">₹{eventMetrics.averageBudget.toLocaleString()}</p>
                <p className="text-xs text-blue-600">{eventMetrics.budgetAccuracy}% accuracy</p>
              </div>
              <div className="p-3 bg-gradient-card rounded-lg">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Guests</p>
                <p className="text-2xl font-bold">{eventMetrics.averageGuests}</p>
                <p className="text-xs text-purple-600">Per event</p>
              </div>
              <div className="p-3 bg-gradient-accent rounded-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Satisfaction</p>
                <p className="text-2xl font-bold">{eventMetrics.customerSatisfaction}/5</p>
                <p className="text-xs text-green-600">Excellent rating</p>
              </div>
              <div className="p-3 bg-green-500 rounded-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="spending" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="spending">Spending Analysis</TabsTrigger>
          <TabsTrigger value="vendors">Vendor Performance</TabsTrigger>
          <TabsTrigger value="trends">Trends & Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="spending" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Spending Breakdown */}
            <Card className="border-0 shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <PieChart className="h-5 w-5 text-primary" />
                  <span>Spending by Category</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {spendingData.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{item.category}</span>
                      <span className="text-sm font-medium">₹{item.amount.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full ${item.color} rounded-full transition-all duration-300`}
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground">{item.percentage}%</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Monthly Spending Trend */}
            <Card className="border-0 shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  <span>Monthly Spending Trend</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {monthlySpending.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gradient-subtle rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="font-medium">{item.month}</div>
                      <Badge variant="outline" className="text-xs">
                        {item.events} event{item.events > 1 ? 's' : ''}
                      </Badge>
                    </div>
                    <div className="text-lg font-semibold">
                      ₹{item.spending.toLocaleString()}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="vendors" className="space-y-6">
          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-primary" />
                <span>Vendor Performance Scorecard</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <div className="space-y-4">
                  {vendorPerformance.map((vendor, index) => (
                    <div key={index} className="p-4 bg-gradient-subtle rounded-lg border border-border/50">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold">{vendor.name}</h3>
                        <Badge className="bg-gradient-hero text-white">
                          ⭐ {vendor.rating}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-primary">{vendor.projects}</p>
                          <p className="text-sm text-muted-foreground">Projects</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-green-600">{vendor.onTime}%</p>
                          <p className="text-sm text-muted-foreground">On-Time Delivery</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-blue-600">{vendor.budgetAdherence}%</p>
                          <p className="text-sm text-muted-foreground">Budget Adherence</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-0 shadow-card">
              <CardHeader>
                <CardTitle>Key Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    <span className="font-medium text-green-800">Cost Savings</span>
                  </div>
                  <p className="text-sm text-green-700">
                    You've saved 8% on average compared to initial budgets through smart vendor negotiations.
                  </p>
                </div>
                
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    <span className="font-medium text-blue-800">Vendor Loyalty</span>
                  </div>
                  <p className="text-sm text-blue-700">
                    75% of vendors are repeat partners, showing strong relationship building.
                  </p>
                </div>
                
                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Calendar className="h-5 w-5 text-purple-600" />
                    <span className="font-medium text-purple-800">Seasonal Trends</span>
                  </div>
                  <p className="text-sm text-purple-700">
                    Event budgets peak in December and March, plan accordingly for better rates.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-card">
              <CardHeader>
                <CardTitle>Recommendations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-gradient-subtle rounded-lg border border-border/50">
                  <h4 className="font-medium mb-2">Optimize Catering Costs</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Consider buffet-style service to reduce per-plate costs by up to 20%.
                  </p>
                  <Badge variant="outline" className="text-xs">Save ₹8,000+</Badge>
                </div>
                
                <div className="p-4 bg-gradient-subtle rounded-lg border border-border/50">
                  <h4 className="font-medium mb-2">Early Booking Discounts</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Book venues 3+ months ahead to secure 15% early bird discounts.
                  </p>
                  <Badge variant="outline" className="text-xs">Save ₹12,000+</Badge>
                </div>
                
                <div className="p-4 bg-gradient-subtle rounded-lg border border-border/50">
                  <h4 className="font-medium mb-2">Vendor Package Deals</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Bundle decoration and photography services for 10% combined savings.
                  </p>
                  <Badge variant="outline" className="text-xs">Save ₹5,500+</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}