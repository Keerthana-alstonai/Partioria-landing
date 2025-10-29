import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Users, Trophy } from "lucide-react";

const OrganizerDashboard = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-party-gradient mb-8">Organizer Dashboard</h1>
        
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="card-party">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                My Projects
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button className="w-full btn-party">View Projects</Button>
            </CardContent>
          </Card>
          
          <Card className="card-party">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Clients
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button className="w-full btn-party">Manage Clients</Button>
            </CardContent>
          </Card>
          
          <Card className="card-party">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button className="w-full btn-party">View Performance</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrganizerDashboard;