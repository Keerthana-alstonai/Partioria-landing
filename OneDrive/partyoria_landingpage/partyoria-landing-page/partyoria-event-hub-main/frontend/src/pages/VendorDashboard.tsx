import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Store, TrendingUp, Calendar } from "lucide-react";

const VendorDashboard = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gold-gradient mb-8">Vendor Dashboard</h1>
        
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="card-party">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Store className="h-5 w-5" />
                My Services
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button className="w-full btn-gold">Manage Services</Button>
            </CardContent>
          </Card>
          
          <Card className="card-party">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Bookings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button className="w-full btn-gold">View Bookings</Button>
            </CardContent>
          </Card>
          
          <Card className="card-party">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button className="w-full btn-gold">View Stats</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;