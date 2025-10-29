import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Home, Calendar, Users, DollarSign, FileText, MessageCircle, 
  BarChart3, Settings, Menu, X, ChevronDown, Sparkles 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const navigationItems = [
  { title: "Dashboard", href: "/dashboard/customer", icon: Home },
  { 
    title: "Events", 
    href: "/dashboard/customer/events", 
    icon: Calendar,
    children: [
      { title: "All Events", href: "/dashboard/customer/events" },
      { title: "Create Event", href: "/dashboard/customer/events/create" },
    ]
  },
  { 
    title: "Vendors", 
    href: "/dashboard/customer/vendors", 
    icon: Users,
    children: [
      { title: "Browse", href: "/dashboard/customer/vendors" },
      { title: "RFQ", href: "/dashboard/customer/vendors/rfq" },
      { title: "Preferred", href: "/dashboard/customer/vendors/preferred" },
    ]
  },
  { 
    title: "Budget & Finance", 
    href: "/dashboard/customer/finance", 
    icon: DollarSign,
    children: [
      { title: "Budget", href: "/dashboard/customer/finance" },
      { title: "Expenses", href: "/dashboard/customer/finance/expenses" },
      { title: "Payments", href: "/dashboard/customer/finance/payments" },
    ]
  },
  { title: "Documents", href: "/dashboard/customer/documents", icon: FileText },
  { title: "Communication", href: "/dashboard/customer/communication", icon: MessageCircle },
  { title: "Analytics", href: "/dashboard/customer/analytics", icon: BarChart3 },
  { title: "Settings", href: "/dashboard/customer/settings", icon: Settings },
];

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const location = useLocation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleExpanded = (title: string) => {
    setExpandedItems(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title)
        : [...prev, title]
    );
  };

  const isActive = (href: string) => {
    return location.pathname === href || 
           (href !== "/dashboard/customer" && location.pathname.startsWith(href));
  };

  const isExpanded = (title: string) => {
    return expandedItems.includes(title) || 
           navigationItems.find(item => 
             item.title === title && 
             item.children?.some(child => isActive(child.href))
           );
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed left-0 top-0 z-50 h-full w-64 bg-gradient-hero transform transition-transform duration-300 ease-in-out md:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">EventPro</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/10 md:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navigationItems.map((item) => (
              <div key={item.title}>
                {item.children ? (
                  <div>
                    <button
                      onClick={() => toggleExpanded(item.title)}
                      className="w-full flex items-center justify-between px-3 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <item.icon className="h-5 w-5" />
                        <span className="font-medium">{item.title}</span>
                      </div>
                      <ChevronDown className={cn(
                        "h-4 w-4 transition-transform",
                        isExpanded(item.title) ? "rotate-180" : ""
                      )} />
                    </button>
                    {isExpanded(item.title) && (
                      <div className="mt-2 ml-8 space-y-1">
                        {item.children.map((child) => (
                          <NavLink
                            key={child.href}
                            to={child.href}
                            className={cn(
                              "block px-3 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 rounded-md transition-colors",
                              isActive(child.href) && "bg-white/20 text-white font-medium"
                            )}
                          >
                            {child.title}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <NavLink
                    to={item.href}
                    className={cn(
                      "flex items-center space-x-3 px-3 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-colors",
                      isActive(item.href) && "bg-white/20 text-white font-medium"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="font-medium">{item.title}</span>
                  </NavLink>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="md:ml-64 min-h-screen">
        {/* Top bar */}
        <header className="bg-white/80 backdrop-blur-sm border-b border-border sticky top-0 z-30">
          <div className="flex items-center justify-between px-6 py-4">
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-muted-foreground">
                Welcome back, {user?.name?.split('@')[0] || 'Customer'}
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  logout();
                  navigate('/');
                }}
              >
                Logout
              </Button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}