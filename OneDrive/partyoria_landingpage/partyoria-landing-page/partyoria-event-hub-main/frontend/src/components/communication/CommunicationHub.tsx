import { useState } from "react";
import { MessageCircle, Send, Phone, Video, Bell, Search, Users, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const conversations = [
  {
    id: 1,
    name: "Spice Garden Catering",
    type: "vendor",
    avatar: "/api/placeholder/40/40",
    lastMessage: "The menu has been finalized. When would you like to schedule the tasting?",
    timestamp: "2 min ago",
    unread: 2,
    online: true
  },
  {
    id: 2,
    name: "Dream Decorators",
    type: "vendor",
    avatar: "/api/placeholder/40/40",
    lastMessage: "I've sent you the decoration mockups for review.",
    timestamp: "1 hour ago",
    unread: 0,
    online: false
  },
  {
    id: 3,
    name: "Event Planning Team",
    type: "team",
    avatar: "/api/placeholder/40/40",
    lastMessage: "Sarah: The venue has been confirmed for December 15th.",
    timestamp: "3 hours ago",
    unread: 5,
    online: true
  },
  {
    id: 4,
    name: "Pixel Perfect Photography",
    type: "vendor",
    avatar: "/api/placeholder/40/40",
    lastMessage: "Great! Looking forward to capturing your event.",
    timestamp: "Yesterday",
    unread: 0,
    online: true
  }
];

const messages = [
  {
    id: 1,
    sender: "Spice Garden Catering",
    message: "Good morning! I wanted to follow up on the catering requirements for your event.",
    timestamp: "10:00 AM",
    isOwn: false
  },
  {
    id: 2,
    sender: "You",
    message: "Hi! Yes, we're looking at catering for 250 guests. Do you have a tasting menu available?",
    timestamp: "10:15 AM",
    isOwn: true
  },
  {
    id: 3,
    sender: "Spice Garden Catering",
    message: "Absolutely! We have several tasting packages. I can arrange a session for this weekend.",
    timestamp: "10:20 AM",
    isOwn: false
  },
  {
    id: 4,
    sender: "You",
    message: "That sounds perfect. What time slots do you have available on Saturday?",
    timestamp: "10:25 AM",
    isOwn: true
  },
  {
    id: 5,
    sender: "Spice Garden Catering",
    message: "We have slots at 11 AM, 2 PM, and 4 PM. Which would work best for you?",
    timestamp: "10:30 AM",
    isOwn: false
  }
];

const notifications = [
  {
    id: 1,
    title: "New message from Dream Decorators",
    description: "Decoration mockups ready for review",
    timestamp: "5 min ago",
    type: "message"
  },
  {
    id: 2,
    title: "Payment reminder",
    description: "Venue advance payment due in 2 days",
    timestamp: "2 hours ago",
    type: "payment"
  },
  {
    id: 3,
    title: "Task completed",
    description: "Photography vendor has been confirmed",
    timestamp: "1 day ago",
    type: "task"
  },
  {
    id: 4,
    title: "Event milestone",
    description: "Catering selection deadline approaching",
    timestamp: "2 days ago",
    type: "milestone"
  }
];

export function CommunicationHub() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    if (newMessage.trim()) {
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-hero rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Communication Hub</h1>
        <p className="text-white/90">Stay connected with your vendors, team, and collaborators</p>
      </div>

      <Tabs defaultValue="messages" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="collaboration">Collaboration</TabsTrigger>
        </TabsList>

        <TabsContent value="messages" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
            {/* Conversations List */}
            <Card className="border-0 shadow-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <MessageCircle className="h-5 w-5 text-primary" />
                    <span>Conversations</span>
                  </CardTitle>
                  <Button size="sm" variant="outline">
                    <Users className="h-4 w-4" />
                  </Button>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search conversations..." className="pl-10" />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {conversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      className={`flex items-center space-x-3 p-4 cursor-pointer hover:bg-muted/50 transition-colors ${
                        selectedConversation.id === conversation.id ? "bg-muted" : ""
                      }`}
                      onClick={() => setSelectedConversation(conversation)}
                    >
                      <div className="relative">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={conversation.avatar} />
                          <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        {conversation.online && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-medium truncate">{conversation.name}</p>
                          <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          {conversation.lastMessage}
                        </p>
                      </div>
                      {conversation.unread > 0 && (
                        <Badge className="bg-primary text-primary-foreground">
                          {conversation.unread}
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Chat Area */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-card h-full flex flex-col">
                <CardHeader className="border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={selectedConversation.avatar} />
                        <AvatarFallback>{selectedConversation.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{selectedConversation.name}</h3>
                        <p className="text-sm text-muted-foreground capitalize">
                          {selectedConversation.type}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Video className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="flex-1 p-4 overflow-y-auto">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[70%] p-3 rounded-lg ${
                            message.isOwn
                              ? "bg-gradient-hero text-white"
                              : "bg-muted text-foreground"
                          }`}
                        >
                          <p className="text-sm">{message.message}</p>
                          <p
                            className={`text-xs mt-1 ${
                              message.isOwn ? "text-white/70" : "text-muted-foreground"
                            }`}
                          >
                            {message.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>

                <div className="border-t p-4">
                  <div className="flex space-x-2">
                    <Textarea
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="flex-1 min-h-[60px] resize-none"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          sendMessage();
                        }
                      }}
                    />
                    <Button 
                      className="bg-gradient-hero text-white hover:opacity-90"
                      onClick={sendMessage}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5 text-primary" />
                <span>Recent Notifications</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="flex items-start space-x-3 p-4 bg-gradient-subtle rounded-lg border border-border/50"
                >
                  <div className="p-2 bg-gradient-hero rounded-lg">
                    <Bell className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium mb-1">{notification.title}</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      {notification.description}
                    </p>
                    <p className="text-xs text-muted-foreground">{notification.timestamp}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {notification.type}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="collaboration" className="space-y-6">
          <Card className="border-0 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-primary" />
                <span>Team Collaboration</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Recent Updates</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-gradient-subtle rounded-lg">
                      <Calendar className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Venue Confirmed</p>
                        <p className="text-sm text-muted-foreground">Grand Ballroom booked for Dec 15</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gradient-subtle rounded-lg">
                      <Users className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Team Member Added</p>
                        <p className="text-sm text-muted-foreground">Sarah joined as coordinator</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Task Updates</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gradient-subtle rounded-lg">
                      <div>
                        <p className="font-medium">Catering Menu</p>
                        <p className="text-sm text-muted-foreground">In Progress</p>
                      </div>
                      <Badge>75%</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gradient-subtle rounded-lg">
                      <div>
                        <p className="font-medium">Photography</p>
                        <p className="text-sm text-muted-foreground">Completed</p>
                      </div>
                      <Badge variant="secondary">100%</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}