import { useState } from "react";
import { Users, UserPlus, Mail, Phone, Calendar, QrCode, Download, Plus, Search, Filter, Edit, Trash2, CheckCircle, Clock, XCircle, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

interface Guest {
  id: string;
  name: string;
  email: string;
  phone: string;
  category: string;
  rsvpStatus: "confirmed" | "pending" | "declined";
  plusOne: boolean;
  dietary: string;
  checkedIn: boolean;
  checkedInAt?: string;
}

export function GuestManagement() {
  const [activeTab, setActiveTab] = useState("guest-list");
  const [guests, setGuests] = useState<Guest[]>([
    { id: "1", name: "John Doe", email: "john@example.com", phone: "+1234567890", category: "VIP", rsvpStatus: "confirmed", plusOne: true, dietary: "Vegetarian", checkedIn: true, checkedInAt: "2024-01-15 10:30 AM" },
    { id: "2", name: "Jane Smith", email: "jane@example.com", phone: "+1234567891", category: "Family", rsvpStatus: "pending", plusOne: false, dietary: "None", checkedIn: false },
    { id: "3", name: "Bob Wilson", email: "bob@example.com", phone: "+1234567892", category: "Friends", rsvpStatus: "declined", plusOne: false, dietary: "Gluten-free", checkedIn: false }
  ]);
  
  const [newGuest, setNewGuest] = useState({
    name: "", email: "", phone: "", category: "Friends", plusOne: false, dietary: ""
  });
  
  const [searchTerm, setSearchTerm] = useState("");
  const [customQuestions, setCustomQuestions] = useState([]);
  const [rsvpSettings, setRsvpSettings] = useState({
    deadline: "",
    responseOptions: ["attending", "not-attending", "maybe"],
    plusOnePolicy: "allowed",
    reminders: { week: true, threeDays: true, oneDay: true }
  });

  const stats = {
    confirmed: guests.filter(g => g.rsvpStatus === "confirmed").length,
    pending: guests.filter(g => g.rsvpStatus === "pending").length,
    declined: guests.filter(g => g.rsvpStatus === "declined").length,
    total: guests.length,
    checkedIn: guests.filter(g => g.checkedIn).length
  };

  const addGuest = () => {
    if (!newGuest.name || !newGuest.email) return;
    const guest: Guest = {
      id: Date.now().toString(),
      ...newGuest,
      rsvpStatus: "pending",
      checkedIn: false
    };
    setGuests([...guests, guest]);
    setNewGuest({ name: "", email: "", phone: "", category: "Friends", plusOne: false, dietary: "" });
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      confirmed: "bg-green-500",
      pending: "bg-yellow-500", 
      declined: "bg-red-500"
    };
    return <Badge className={`${colors[status]} text-white`}>{status}</Badge>;
  };

  const filteredGuests = guests.filter(guest => 
    guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guest.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-8 rounded-lg mb-6">
        <h1 className="text-3xl font-bold mb-2">Guest Management & RSVP</h1>
        <p className="text-purple-100">Manage your event guests, RSVPs, and attendance tracking</p>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-gray-800">
          <TabsTrigger value="guest-list">Guest List</TabsTrigger>
          <TabsTrigger value="rsvp-forms">RSVP Forms</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Guest List Tab */}
        <TabsContent value="guest-list" className="space-y-6">
          {/* Add Guest Form */}
          <Card className="bg-gray-800 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="h-5 w-5" />
                Add New Guest
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <Input
                  placeholder="Full Name"
                  value={newGuest.name}
                  onChange={(e) => setNewGuest({...newGuest, name: e.target.value})}
                  className="bg-gray-700 border-gray-600"
                />
                <Input
                  placeholder="Email"
                  type="email"
                  value={newGuest.email}
                  onChange={(e) => setNewGuest({...newGuest, email: e.target.value})}
                  className="bg-gray-700 border-gray-600"
                />
                <Input
                  placeholder="Phone"
                  value={newGuest.phone}
                  onChange={(e) => setNewGuest({...newGuest, phone: e.target.value})}
                  className="bg-gray-700 border-gray-600"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <Select value={newGuest.category} onValueChange={(value) => setNewGuest({...newGuest, category: value})}>
                  <SelectTrigger className="bg-gray-700 border-gray-600">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="VIP">VIP</SelectItem>
                    <SelectItem value="Family">Family</SelectItem>
                    <SelectItem value="Friends">Friends</SelectItem>
                    <SelectItem value="Colleagues">Colleagues</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={newGuest.plusOne ? "yes" : "no"} onValueChange={(value) => setNewGuest({...newGuest, plusOne: value === "yes"})}>
                  <SelectTrigger className="bg-gray-700 border-gray-600">
                    <SelectValue placeholder="Plus-One Allowed" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  placeholder="Dietary Restrictions"
                  value={newGuest.dietary}
                  onChange={(e) => setNewGuest({...newGuest, dietary: e.target.value})}
                  className="bg-gray-700 border-gray-600"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={addGuest} className="bg-gradient-to-r from-purple-600 to-pink-500">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Guest
                </Button>
                <Button variant="outline" className="border-gray-600">
                  <Download className="h-4 w-4 mr-2" />
                  Import CSV
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* RSVP Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-gray-800 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-green-500 mb-2">{stats.confirmed}</div>
                <div className="text-sm text-gray-400">Confirmed</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-yellow-500 mb-2">{stats.pending}</div>
                <div className="text-sm text-gray-400">Pending</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-red-500 mb-2">{stats.declined}</div>
                <div className="text-sm text-gray-400">Declined</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-blue-500 mb-2">{stats.total}</div>
                <div className="text-sm text-gray-400">Total Invited</div>
              </CardContent>
            </Card>
          </div>

          {/* Guest List Table */}
          <Card className="bg-gray-800 shadow-lg">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Guest List
                </CardTitle>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                    <Input
                      placeholder="Search guests..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-gray-700 border-gray-600"
                    />
                  </div>
                  <Button variant="outline" size="sm" className="border-gray-600">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="text-left p-4">Guest Name</th>
                      <th className="text-left p-4">Email</th>
                      <th className="text-left p-4">Category</th>
                      <th className="text-left p-4">RSVP Status</th>
                      <th className="text-left p-4">Plus-One</th>
                      <th className="text-left p-4">Dietary</th>
                      <th className="text-left p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredGuests.map((guest) => (
                      <tr key={guest.id} className="border-b border-gray-700">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-sm font-bold">
                              {guest.name.charAt(0)}
                            </div>
                            {guest.name}
                          </div>
                        </td>
                        <td className="p-4 text-gray-400">{guest.email}</td>
                        <td className="p-4">
                          <Badge variant="outline">{guest.category}</Badge>
                        </td>
                        <td className="p-4">{getStatusBadge(guest.rsvpStatus)}</td>
                        <td className="p-4">{guest.plusOne ? "Yes" : "No"}</td>
                        <td className="p-4 text-gray-400">{guest.dietary || "None"}</td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-400">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* RSVP Forms Tab */}
        <TabsContent value="rsvp-forms" className="space-y-6">
          <Card className="bg-gray-800 shadow-lg">
            <CardHeader>
              <CardTitle>RSVP Form Builder</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>RSVP Deadline</Label>
                  <Input
                    type="datetime-local"
                    value={rsvpSettings.deadline}
                    onChange={(e) => setRsvpSettings({...rsvpSettings, deadline: e.target.value})}
                    className="bg-gray-700 border-gray-600"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Plus-One Policy</Label>
                  <Select value={rsvpSettings.plusOnePolicy} onValueChange={(value) => setRsvpSettings({...rsvpSettings, plusOnePolicy: value})}>
                    <SelectTrigger className="bg-gray-700 border-gray-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="allowed">Allowed</SelectItem>
                      <SelectItem value="not-allowed">Not Allowed</SelectItem>
                      <SelectItem value="by-invitation">By Invitation Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-3">
                <Label>Response Options</Label>
                <div className="flex gap-4">
                  {["attending", "not-attending", "maybe"].map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <Checkbox
                        id={option}
                        checked={rsvpSettings.responseOptions.includes(option)}
                        onCheckedChange={(checked) => {
                          const options = checked
                            ? [...rsvpSettings.responseOptions, option]
                            : rsvpSettings.responseOptions.filter(o => o !== option);
                          setRsvpSettings({...rsvpSettings, responseOptions: options});
                        }}
                      />
                      <Label htmlFor={option} className="capitalize">{option.replace("-", " ")}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="bg-gradient-to-r from-purple-600 to-pink-500">Save Draft</Button>
                <Button variant="outline" className="border-gray-600">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Invitations
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Attendance Tab */}
        <TabsContent value="attendance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gray-800 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-green-500 mb-2">{stats.checkedIn}</div>
                <div className="text-sm text-gray-400">Checked In</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-blue-500 mb-2">{stats.confirmed}</div>
                <div className="text-sm text-gray-400">Expected</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-red-500 mb-2">{stats.confirmed - stats.checkedIn}</div>
                <div className="text-sm text-gray-400">No Shows</div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gray-800 shadow-lg">
            <CardHeader>
              <CardTitle>Check-In Management</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="flex gap-4">
                <Button className="bg-gradient-to-r from-purple-600 to-pink-500">
                  <QrCode className="h-4 w-4 mr-2" />
                  Generate QR Code
                </Button>
                <div className="flex-1">
                  <Input
                    placeholder="Search guest for manual check-in..."
                    className="bg-gray-700 border-gray-600"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">Recent Check-ins</h4>
                {guests.filter(g => g.checkedIn).map((guest) => (
                  <div key={guest.id} className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
                    <div>
                      <span className="font-medium">{guest.name}</span>
                      <span className="text-gray-400 ml-2">{guest.checkedInAt}</span>
                    </div>
                    <Badge className="bg-green-500 text-white">Checked In</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <Card className="bg-gray-800 shadow-lg">
            <CardHeader>
              <CardTitle>Automated Communications</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-3">
                <Label>Reminder Settings</Label>
                <div className="space-y-2">
                  {[
                    { key: "week", label: "1 week before deadline" },
                    { key: "threeDays", label: "3 days before deadline" },
                    { key: "oneDay", label: "1 day before deadline" }
                  ].map((reminder) => (
                    <div key={reminder.key} className="flex items-center space-x-2">
                      <Checkbox
                        id={reminder.key}
                        checked={rsvpSettings.reminders[reminder.key]}
                        onCheckedChange={(checked) => 
                          setRsvpSettings({
                            ...rsvpSettings,
                            reminders: { ...rsvpSettings.reminders, [reminder.key]: checked }
                          })
                        }
                      />
                      <Label htmlFor={reminder.key}>{reminder.label}</Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <Button className="bg-gradient-to-r from-purple-600 to-pink-500">
                Save Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}