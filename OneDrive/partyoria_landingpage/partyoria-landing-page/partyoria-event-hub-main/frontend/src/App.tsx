import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import SignUp from "./pages/SignUp";
import SimpleSignUp from "./pages/SimpleSignUp";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import AuthPromptPage from "./pages/AuthPromptPage";
import CreateEvent from "./pages/CreateEvent";
import BookingDetailsPage from "./pages/BookingDetailsPage";
import BookingConfirmedPage from "./pages/BookingConfirmedPage";
import ExploreVenues from "./pages/ExploreVenues";
import BookingDetails from "./pages/BookingDetails";
import BookingConfirmation from "./pages/BookingConfirmation";
import CustomerDashboard from "./pages/CustomerDashboard";
import VendorDashboard from "./pages/VendorDashboard";
import OrganizerDashboard from "./pages/OrganizerDashboard";
import NotFound from "./pages/NotFound";
import { BackendTest } from "./components/BackendTest";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/simple-signup" element={<SimpleSignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/authprompt" element={<AuthPromptPage />} />
            <Route path="/create-event" element={<CreateEvent />} />
            <Route path="/booking-details-page" element={<BookingDetailsPage />} />
            <Route path="/booking-details-page/:venueId" element={<BookingDetailsPage />} />
            <Route path="/booking-confirmed" element={<BookingConfirmedPage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/explore-venues" element={<ExploreVenues />} />
            <Route path="/find-venues" element={<ExploreVenues />} />
            <Route path="/booking-details" element={<BookingDetails />} />
            <Route path="/booking-confirmation" element={<BookingConfirmation />} />
            <Route path="/backend-test" element={<BackendTest />} />
            <Route path="/dashboard/customer/*" element={<CustomerDashboard />} />
            <Route path="/dashboard/vendor" element={<ProtectedRoute><VendorDashboard /></ProtectedRoute>} />
            <Route path="/dashboard/organizer" element={<ProtectedRoute><OrganizerDashboard /></ProtectedRoute>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
