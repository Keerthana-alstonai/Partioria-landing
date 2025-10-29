import { useState } from "react";
import { User, Mail, Phone, MapPin, Building, Save, Upload, Bell, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const getProfileData = () => {
  const customerName = localStorage.getItem('customerName') || 'Customer';
  const customerEmail = localStorage.getItem('customerEmail') || '';
  const customerPhone = localStorage.getItem('customerPhone') || '';
  
  return {
    name: customerName.includes('@') ? customerName.split('@')[0] : customerName,
    email: customerEmail || (customerName.includes('@') ? customerName : ''),
    phone: customerPhone,
    address: localStorage.getItem('customerAddress') || '',
    bio: localStorage.getItem('customerBio') || '',
    avatar: localStorage.getItem('customerAvatar') || ''
  };
};

const eventPreferences = {
  defaultBudgetRange: "50000-100000",
  preferredVenues: ["Hotels", "Banquet Halls", "Outdoor Venues"],
  eventTypes: ["Corporate Events", "Product Launches", "Team Building"],
  communicationPreference: "email",
  budgetAlerts: true,
  vendorRecommendations: true
};

const notificationSettings = {
  emailNotifications: true,
  smsNotifications: false,
  pushNotifications: true,
  weeklyReports: true,
  budgetAlerts: true,
  vendorUpdates: true,
  eventReminders: true,
  paymentReminders: true
};

export function ProfileSettings() {
  const [profile, setProfile] = useState(getProfileData());
  const [preferences, setPreferences] = useState(eventPreferences);
  const [notifications, setNotifications] = useState(notificationSettings);
  const { toast } = useToast();

  const updateProfile = (field: string, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
    // Save to localStorage
    localStorage.setItem(`customer${field.charAt(0).toUpperCase() + field.slice(1)}`, value);
  };

  const updatePreferences = (field: string, value: any) => {
    setPreferences(prev => ({ ...prev, [field]: value }));
  };

  const updateNotifications = (field: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-subtle rounded-2xl p-8 border border-border">
        <h1 className="text-3xl font-bold mb-2">Profile & Settings</h1>
        <p className="text-muted-foreground">Manage your profile, preferences, and account settings</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5 text-primary" />
                <span>Personal Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={profile.avatar} />
                  <AvatarFallback className="text-lg">{profile.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <input
                    type="file"
                    id="photo-upload"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (event) => {
                          const imageUrl = event.target?.result as string;
                          updateProfile('avatar', imageUrl);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => document.getElementById('photo-upload')?.click()}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Change Photo
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    JPG, PNG or GIF. Max size 2MB.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => updateProfile("name", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => updateProfile("email", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => updateProfile("phone", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={profile.address}
                  onChange={(e) => updateProfile("address", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={profile.bio}
                  onChange={(e) => updateProfile("bio", e.target.value)}
                  placeholder="Tell us about yourself..."
                />
              </div>

              <Button 
                className="bg-gradient-hero text-white hover:opacity-90"
                onClick={() => {
                  // All profile data is already saved to localStorage via updateProfile
                  toast({
                    title: "Profile saved!",
                    description: "Your profile has been updated successfully.",
                  });
                }}
              >
                <Save className="h-4 w-4 mr-2" />
                Save Profile
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-6">
          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle>Event Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="budgetRange">Default Budget Range</Label>
                  <Select
                    value={preferences.defaultBudgetRange}
                    onValueChange={(value) => updatePreferences("defaultBudgetRange", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10000-50000">₹10,000 - ₹50,000</SelectItem>
                      <SelectItem value="50000-100000">₹50,000 - ₹1,00,000</SelectItem>
                      <SelectItem value="100000-250000">₹1,00,000 - ₹2,50,000</SelectItem>
                      <SelectItem value="250000+">₹2,50,000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Preferred Event Types</Label>
                  <div className="flex flex-wrap gap-2">
                    {["Corporate Events", "Product Launches", "Team Building", "Conferences", "Workshops"].map((type) => (
                      <Badge
                        key={type}
                        variant={preferences.eventTypes.includes(type) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => {
                          const newTypes = preferences.eventTypes.includes(type)
                            ? preferences.eventTypes.filter(t => t !== type)
                            : [...preferences.eventTypes, type];
                          updatePreferences("eventTypes", newTypes);
                        }}
                      >
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Preferred Venues</Label>
                  <div className="flex flex-wrap gap-2">
                    {["Hotels", "Banquet Halls", "Outdoor Venues", "Conference Centers", "Restaurants"].map((venue) => (
                      <Badge
                        key={venue}
                        variant={preferences.preferredVenues.includes(venue) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => {
                          const newVenues = preferences.preferredVenues.includes(venue)
                            ? preferences.preferredVenues.filter(v => v !== venue)
                            : [...preferences.preferredVenues, venue];
                          updatePreferences("preferredVenues", newVenues);
                        }}
                      >
                        {venue}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="communication">Communication Preference</Label>
                  <Select
                    value={preferences.communicationPreference}
                    onValueChange={(value) => updatePreferences("communicationPreference", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="phone">Phone</SelectItem>
                      <SelectItem value="whatsapp">WhatsApp</SelectItem>
                      <SelectItem value="in-app">In-App Messages</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Budget Alerts</Label>
                      <p className="text-sm text-muted-foreground">Get notified when approaching budget limits</p>
                    </div>
                    <Switch
                      checked={preferences.budgetAlerts}
                      onCheckedChange={(checked) => updatePreferences("budgetAlerts", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Vendor Recommendations</Label>
                      <p className="text-sm text-muted-foreground">Receive AI-powered vendor suggestions</p>
                    </div>
                    <Switch
                      checked={preferences.vendorRecommendations}
                      onCheckedChange={(checked) => updatePreferences("vendorRecommendations", checked)}
                    />
                  </div>
                </div>
              </div>

              <Button className="bg-gradient-hero text-white hover:opacity-90">
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5 text-primary" />
                <span>Notification Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <Switch
                    checked={notifications.emailNotifications}
                    onCheckedChange={(checked) => updateNotifications("emailNotifications", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications via SMS</p>
                  </div>
                  <Switch
                    checked={notifications.smsNotifications}
                    onCheckedChange={(checked) => updateNotifications("smsNotifications", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive push notifications in browser</p>
                  </div>
                  <Switch
                    checked={notifications.pushNotifications}
                    onCheckedChange={(checked) => updateNotifications("pushNotifications", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Weekly Reports</Label>
                    <p className="text-sm text-muted-foreground">Weekly summary of events and expenses</p>
                  </div>
                  <Switch
                    checked={notifications.weeklyReports}
                    onCheckedChange={(checked) => updateNotifications("weeklyReports", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Budget Alerts</Label>
                    <p className="text-sm text-muted-foreground">Notifications when budget thresholds are reached</p>
                  </div>
                  <Switch
                    checked={notifications.budgetAlerts}
                    onCheckedChange={(checked) => updateNotifications("budgetAlerts", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Vendor Updates</Label>
                    <p className="text-sm text-muted-foreground">Updates from your vendors and partners</p>
                  </div>
                  <Switch
                    checked={notifications.vendorUpdates}
                    onCheckedChange={(checked) => updateNotifications("vendorUpdates", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Event Reminders</Label>
                    <p className="text-sm text-muted-foreground">Reminders for upcoming events and deadlines</p>
                  </div>
                  <Switch
                    checked={notifications.eventReminders}
                    onCheckedChange={(checked) => updateNotifications("eventReminders", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Payment Reminders</Label>
                    <p className="text-sm text-muted-foreground">Reminders for pending payments</p>
                  </div>
                  <Switch
                    checked={notifications.paymentReminders}
                    onCheckedChange={(checked) => updateNotifications("paymentReminders", checked)}
                  />
                </div>
              </div>

              <Button className="bg-gradient-hero text-white hover:opacity-90">
                Save Notification Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lock className="h-5 w-5 text-primary" />
                <span>Security Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Two-Factor Authentication</h4>
                <div className="p-4 bg-gradient-subtle rounded-lg border border-border/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Enable 2FA</p>
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Button variant="outline">Enable</Button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Login Sessions</h4>
                <div className="space-y-3">
                  <div className="p-4 bg-gradient-subtle rounded-lg border border-border/50">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Current Session</p>
                        <p className="text-sm text-muted-foreground">Chrome on Windows • Mumbai, India</p>
                      </div>
                      <Badge variant="secondary">Active</Badge>
                    </div>
                  </div>
                </div>
              </div>

              <Button className="bg-gradient-hero text-white hover:opacity-90">
                Update Password
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}