import { useState } from "react";
import { Plus, Trash2, Clock, AlertTriangle, CheckCircle2, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

interface TimelineItem {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: "low" | "medium" | "high" | "critical";
  category: "pre-event" | "day-of" | "post-event" | "vendor";
  dependencies: string[];
  completed: boolean;
  assignedTo: string;
}

interface TimelineManagerProps {
  items: TimelineItem[];
  onItemsChange: (items: TimelineItem[]) => void;
}

export function TimelineManager({ items, onItemsChange }: TimelineManagerProps) {
  const [newItem, setNewItem] = useState<Partial<TimelineItem>>({
    title: "",
    description: "",
    dueDate: "",
    priority: "medium",
    category: "pre-event",
    dependencies: [],
    completed: false,
    assignedTo: ""
  });

  const addItem = () => {
    if (!newItem.title || !newItem.dueDate) return;
    
    const item: TimelineItem = {
      id: Date.now().toString(),
      title: newItem.title,
      description: newItem.description || "",
      dueDate: newItem.dueDate,
      priority: newItem.priority as TimelineItem["priority"],
      category: newItem.category as TimelineItem["category"],
      dependencies: newItem.dependencies || [],
      completed: false,
      assignedTo: newItem.assignedTo || ""
    };
    
    onItemsChange([...items, item]);
    setNewItem({
      title: "",
      description: "",
      dueDate: "",
      priority: "medium",
      category: "pre-event",
      dependencies: [],
      completed: false,
      assignedTo: ""
    });
  };

  const removeItem = (id: string) => {
    onItemsChange(items.filter(item => item.id !== id));
  };

  const toggleComplete = (id: string) => {
    onItemsChange(items.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical": return "bg-red-500";
      case "high": return "bg-orange-500";
      case "medium": return "bg-yellow-500";
      case "low": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "pre-event": return <Calendar className="h-4 w-4" />;
      case "day-of": return <Clock className="h-4 w-4" />;
      case "post-event": return <CheckCircle2 className="h-4 w-4" />;
      case "vendor": return <AlertTriangle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const sortedItems = [...items].sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

  return (
    <div className="space-y-6">
      {/* Add New Timeline Item */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add Timeline Item
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Task Title</Label>
              <Input
                placeholder="Enter task title"
                value={newItem.title}
                onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Due Date</Label>
              <Input
                type="datetime-local"
                value={newItem.dueDate}
                onChange={(e) => setNewItem({ ...newItem, dueDate: e.target.value })}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Priority</Label>
              <Select value={newItem.priority} onValueChange={(value) => setNewItem({ ...newItem, priority: value as TimelineItem["priority"] })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={newItem.category} onValueChange={(value) => setNewItem({ ...newItem, category: value as TimelineItem["category"] })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pre-event">Pre-Event</SelectItem>
                  <SelectItem value="day-of">Day-of-Event</SelectItem>
                  <SelectItem value="post-event">Post-Event</SelectItem>
                  <SelectItem value="vendor">Vendor Coordination</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Assigned To</Label>
              <Input
                placeholder="Person responsible"
                value={newItem.assignedTo}
                onChange={(e) => setNewItem({ ...newItem, assignedTo: e.target.value })}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              placeholder="Task description and details"
              value={newItem.description}
              onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
            />
          </div>
          
          <Button onClick={addItem} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Timeline Item
          </Button>
        </CardContent>
      </Card>

      {/* Timeline Items List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Timeline Overview</h3>
        {sortedItems.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center text-muted-foreground">
              No timeline items added yet. Create your first milestone above.
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {sortedItems.map((item) => (
              <Card key={item.id} className={`transition-all ${item.completed ? 'opacity-60' : ''}`}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <Checkbox
                        checked={item.completed}
                        onCheckedChange={() => toggleComplete(item.id)}
                      />
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          {getCategoryIcon(item.category)}
                          <h4 className={`font-medium ${item.completed ? 'line-through' : ''}`}>
                            {item.title}
                          </h4>
                          <div className={`w-2 h-2 rounded-full ${getPriorityColor(item.priority)}`} />
                        </div>
                        {item.description && (
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        )}
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>Due: {new Date(item.dueDate).toLocaleDateString()}</span>
                          {item.assignedTo && <span>Assigned: {item.assignedTo}</span>}
                          <Badge variant="outline" className="text-xs">
                            {item.category.replace('-', ' ')}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {item.priority}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}