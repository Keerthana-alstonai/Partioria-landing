import { Routes, Route } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { DashboardHome } from "@/components/dashboard/DashboardHome";
import { AllEvents } from "@/components/events/AllEvents";
import { EventWizard } from "@/components/events/EventWizard";
import EventCategorySelector from "@/components/events/EventCategorySelector";
import { BrowseVendors } from "@/components/vendors/BrowseVendors";
import { BudgetDashboard } from "@/components/finance/BudgetDashboard";
import { DocumentsLibrary } from "@/components/documents/DocumentsLibrary";
import { CommunicationHub } from "@/components/communication/CommunicationHub";
import { AnalyticsDashboard } from "@/components/analytics/AnalyticsDashboard";
import { ProfileSettings } from "@/components/settings/ProfileSettings";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LogIn, UserPlus } from "lucide-react";
import partyBackground from "@/assets/party-background.jpg";

const CustomerDashboard = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center bg-no-repeat relative"
        style={{ backgroundImage: `url(${partyBackground})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/30" />
        
        <Card className="w-full max-w-md glass animate-fade-in relative z-10">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Login Required
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Login is required to book a venue and access event planning features
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <Button className="w-full bg-gradient-primary hover:opacity-90 transition-opacity" asChild>
              <Link to="/login">
                <LogIn className="mr-2 h-4 w-4" />
                Login to Continue
              </Link>
            </Button>
            
            <Button variant="outline" className="w-full" asChild>
              <Link to="/simple-signup">
                <UserPlus className="mr-2 h-4 w-4" />
                Create New Account
              </Link>
            </Button>
            
            <div className="text-center pt-4">
              <p className="text-sm text-muted-foreground">
                New to Partyoria?{" "}
                <Link to="/" className="text-primary hover:underline font-medium">
                  Learn more about our services
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <Routes>
        <Route index element={<DashboardHome />} />
        <Route path="events" element={<AllEvents />} />
        <Route path="events/create" element={<EventCategorySelector />} />
        <Route path="create-event/:sectionId/:subsectionId" element={<EventWizard />} />
        <Route path="events/edit/:id" element={<EventWizard />} />
        <Route path="vendors" element={<BrowseVendors />} />
        <Route path="finance" element={<BudgetDashboard />} />
        <Route path="documents" element={<DocumentsLibrary />} />
        <Route path="communication" element={<CommunicationHub />} />
        <Route path="analytics" element={<AnalyticsDashboard />} />
        <Route path="settings" element={<ProfileSettings />} />
      </Routes>
    </DashboardLayout>
  );
};

export default CustomerDashboard;