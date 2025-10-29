import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Plus, Search, Filter, MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import EventDetailsModal from "./EventDetailsModal";

const events = [
  {
    id: 1,
    name: "Wedding (North Indian)",
    date: "2024-12-15",
    venue: "Grand Ballroom Hotel",
    guests: 250,
    budget: "₹1,50,000",
    spent: "₹1,12,500",
    status: "In Progress",
    completion: 75,
    nextMilestone: "Catering Finalization"
  },
  {
    id: 2,
    name: "Birthday Party",
    date: "2025-01-10",
    venue: "Tech Hub Convention Center",
    guests: 150,
    budget: "₹80,000",
    spent: "₹24,000",
    status: "Planning",
    completion: 30,
    nextMilestone: "Vendor Selection"
  },
  {
    id: 3,
    name: "Team Building Event",
    date: "2025-02-05",
    venue: "Outdoor Adventure Park",
    guests: 50,
    budget: "₹15,000",
    spent: "₹1,500",
    status: "Draft",
    completion: 10,
    nextMilestone: "Venue Booking"
  },
  {
    id: 4,
    name: "Client Appreciation Dinner",
    date: "2025-03-20",
    venue: "Rooftop Restaurant",
    guests: 80,
    budget: "₹45,000",
    spent: "₹0",
    status: "Draft",
    completion: 5,
    nextMilestone: "Budget Approval"
  },
];

export function AllEvents() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [eventsList, setEventsList] = useState(events);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    status: "all",
    dateRange: "all"
  });
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress": return "default";
      case "Planning": return "secondary";
      case "Draft": return "outline";
      default: return "outline";
    }
  };

  const filteredEvents = eventsList.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filters.status === "all" || event.status === filters.status;
    const eventDate = new Date(event.date);
    const today = new Date();
    const matchesDate = filters.dateRange === "all" || 
      (filters.dateRange === "upcoming" && eventDate > today) ||
      (filters.dateRange === "past" && eventDate < today);
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  const canEditEvent = (event) => {
    const eventDate = new Date(event.date);
    const today = new Date();
    return event.status === "Draft" || eventDate > today;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-hero rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">All Events</h1>
            <p className="text-white/90">Manage and track all your events in one place</p>
          </div>
          <Button size="lg" className="bg-white text-primary hover:bg-white/90" onClick={() => navigate('/dashboard/customer/events/create')}>
            <Plus className="h-5 w-5 mr-2" />
            Create New Event
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-card">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" onClick={() => setShowFilters(true)}>
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Events Table */}
      <Card className="border-0 shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-primary" />
            <span>Events ({filteredEvents.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Event Name</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Venue</TableHead>
                  <TableHead>Guests</TableHead>
                  <TableHead>Budget</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Next Milestone</TableHead>
                  <TableHead className="w-[50px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEvents.map((event) => (
                  <TableRow key={event.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{event.name}</TableCell>
                    <TableCell>{new Date(event.date).toLocaleDateString()}</TableCell>
                    <TableCell>{event.venue}</TableCell>
                    <TableCell>{event.guests}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{event.budget}</div>
                        <div className="text-sm text-muted-foreground">Spent: {event.spent}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(event.status)}>
                        {event.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 h-2 bg-muted rounded-full">
                          <div 
                            className="h-full bg-gradient-accent rounded-full"
                            style={{ width: `${event.completion}%` }}
                          />
                        </div>
                        <span className="text-sm">{event.completion}%</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{event.nextMilestone}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => {
                            setSelectedEventId(event.id.toString());
                            setShowDetailsModal(true);
                          }}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          {canEditEvent(event) && (
                            <DropdownMenuItem onClick={() => navigate(`/dashboard/customer/events/edit/${event.id}`)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Event
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem className="text-orange-600" onClick={() => {
                            setEventToDelete(event);
                            setShowDeleteModal(true);
                          }}>
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* View Details Modal */}
      {showViewModal && selectedEvent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Event Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><strong>Event Name:</strong> {selectedEvent.name}</div>
                <div><strong>Date:</strong> {new Date(selectedEvent.date).toLocaleDateString()}</div>
                <div><strong>Venue:</strong> {selectedEvent.venue}</div>
                <div><strong>Guests:</strong> {selectedEvent.guests}</div>
                <div><strong>Budget:</strong> {selectedEvent.budget}</div>
                <div><strong>Spent:</strong> {selectedEvent.spent}</div>
                <div><strong>Status:</strong> {selectedEvent.status}</div>
                <div><strong>Progress:</strong> {selectedEvent.completion}%</div>
                <div className="col-span-2"><strong>Next Milestone:</strong> {selectedEvent.nextMilestone}</div>
              </div>
              <div className="flex gap-2 pt-4">
                <Button onClick={() => setShowViewModal(false)} variant="outline">Close</Button>
                {canEditEvent(selectedEvent) && (
                  <Button onClick={() => {
                    setShowViewModal(false);
                    navigate(`/dashboard/customer/events/edit/${selectedEvent.id}`);
                  }}>Edit Event</Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && eventToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-md w-full">
            <CardHeader>
              <CardTitle className="text-orange-600">Delete Event</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Are you sure you want to delete <strong>{eventToDelete.name}</strong>?</p>
              <p className="text-sm text-muted-foreground">This action cannot be undone.</p>
              <div className="flex gap-2 pt-4">
                <Button onClick={() => setShowDeleteModal(false)} variant="outline">Cancel</Button>
                <Button onClick={() => {
                  setEventsList(prev => prev.filter(event => event.id !== eventToDelete.id));
                  setShowDeleteModal(false);
                  setEventToDelete(null);
                }} className="bg-orange-600 hover:bg-orange-700 text-white">Delete Event</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Filters Modal */}
      {showFilters && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-md w-full">
            <CardHeader>
              <CardTitle>Filter Events</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={filters.status} onValueChange={(value) => setFilters(prev => ({...prev, status: value}))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Planning">Planning</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Date Range</Label>
                <Select value={filters.dateRange} onValueChange={(value) => setFilters(prev => ({...prev, dateRange: value}))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Dates</SelectItem>
                    <SelectItem value="upcoming">Upcoming Events</SelectItem>
                    <SelectItem value="past">Past Events</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2 pt-4">
                <Button onClick={() => setShowFilters(false)} variant="outline">Close</Button>
                <Button onClick={() => {
                  setFilters({ status: "all", dateRange: "all" });
                }}>Clear Filters</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      
      <EventDetailsModal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        onEdit={() => {
          setShowDetailsModal(false);
          if (selectedEventId) {
            navigate(`/dashboard/customer/events/edit/${selectedEventId}`);
          }
        }}
        eventId={selectedEventId || ''}
      />
    </div>
  );
}