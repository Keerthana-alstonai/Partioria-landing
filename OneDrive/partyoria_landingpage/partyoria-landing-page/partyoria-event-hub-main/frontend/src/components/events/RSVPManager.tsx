import { useState } from "react";
import { Plus, Trash2, Users, MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface RSVPQuestion {
  id: string;
  question: string;
  type: "text" | "select" | "radio" | "checkbox";
  options?: string[];
  required: boolean;
}

interface RSVPSettings {
  responseOptions: string[];
  collectDietary: boolean;
  allowPlusOne: boolean;
  maxPlusOnes: number;
  customQuestions: RSVPQuestion[];
  confirmationMessage: string;
}

interface RSVPManagerProps {
  settings: RSVPSettings;
  onSettingsChange: (settings: RSVPSettings) => void;
}

export function RSVPManager({ settings, onSettingsChange }: RSVPManagerProps) {
  const [newQuestion, setNewQuestion] = useState<Partial<RSVPQuestion>>({
    question: "",
    type: "text",
    options: [],
    required: false
  });

  const addCustomQuestion = () => {
    if (!newQuestion.question) return;
    
    const question: RSVPQuestion = {
      id: Date.now().toString(),
      question: newQuestion.question,
      type: newQuestion.type as RSVPQuestion["type"],
      options: newQuestion.options || [],
      required: newQuestion.required || false
    };
    
    onSettingsChange({
      ...settings,
      customQuestions: [...settings.customQuestions, question]
    });
    
    setNewQuestion({
      question: "",
      type: "text",
      options: [],
      required: false
    });
  };

  const removeQuestion = (id: string) => {
    onSettingsChange({
      ...settings,
      customQuestions: settings.customQuestions.filter(q => q.id !== id)
    });
  };

  const updateResponseOptions = (options: string[]) => {
    onSettingsChange({ ...settings, responseOptions: options });
  };

  const toggleResponseOption = (option: string) => {
    const newOptions = settings.responseOptions.includes(option)
      ? settings.responseOptions.filter(o => o !== option)
      : [...settings.responseOptions, option];
    updateResponseOptions(newOptions);
  };

  return (
    <div className="space-y-6">
      {/* RSVP Response Options */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            RSVP Response Options
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Label>Available Response Options</Label>
            <div className="grid grid-cols-2 gap-3">
              {["Attending", "Not Attending", "Maybe", "Tentative"].map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={option}
                    checked={settings.responseOptions.includes(option.toLowerCase().replace(" ", "-"))}
                    onChange={() => toggleResponseOption(option.toLowerCase().replace(" ", "-"))}
                    className="rounded"
                  />
                  <Label htmlFor={option}>{option}</Label>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Plus-One Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Plus-One Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Allow Plus-One Guests</Label>
            <Switch
              checked={settings.allowPlusOne}
              onCheckedChange={(checked) => onSettingsChange({ ...settings, allowPlusOne: checked })}
            />
          </div>
          
          {settings.allowPlusOne && (
            <div className="space-y-2">
              <Label>Maximum Plus-Ones per Guest</Label>
              <Select 
                value={settings.maxPlusOnes.toString()} 
                onValueChange={(value) => onSettingsChange({ ...settings, maxPlusOnes: parseInt(value) })}
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dietary Restrictions */}
      <Card>
        <CardHeader>
          <CardTitle>Dietary Restrictions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <Label>Collect Dietary Restrictions</Label>
              <p className="text-sm text-muted-foreground">Ask guests about food allergies and preferences</p>
            </div>
            <Switch
              checked={settings.collectDietary}
              onCheckedChange={(checked) => onSettingsChange({ ...settings, collectDietary: checked })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Custom RSVP Questions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Custom RSVP Questions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Add New Question Form */}
          <div className="space-y-4 p-4 border rounded-lg">
            <h4 className="font-medium">Add Custom Question</h4>
            
            <div className="space-y-3">
              <div className="space-y-2">
                <Label>Question</Label>
                <Input
                  placeholder="Enter your question"
                  value={newQuestion.question}
                  onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Question Type</Label>
                  <Select 
                    value={newQuestion.type} 
                    onValueChange={(value) => setNewQuestion({ ...newQuestion, type: value as RSVPQuestion["type"] })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="text">Text Input</SelectItem>
                      <SelectItem value="select">Dropdown</SelectItem>
                      <SelectItem value="radio">Multiple Choice</SelectItem>
                      <SelectItem value="checkbox">Checkboxes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center space-x-2 pt-6">
                  <input
                    type="checkbox"
                    id="required"
                    checked={newQuestion.required}
                    onChange={(e) => setNewQuestion({ ...newQuestion, required: e.target.checked })}
                    className="rounded"
                  />
                  <Label htmlFor="required">Required</Label>
                </div>
              </div>
              
              {(newQuestion.type === "select" || newQuestion.type === "radio" || newQuestion.type === "checkbox") && (
                <div className="space-y-2">
                  <Label>Options (one per line)</Label>
                  <Textarea
                    placeholder="Option 1&#10;Option 2&#10;Option 3"
                    value={newQuestion.options?.join("\n") || ""}
                    onChange={(e) => setNewQuestion({ 
                      ...newQuestion, 
                      options: e.target.value.split("\n").filter(o => o.trim()) 
                    })}
                  />
                </div>
              )}
            </div>
            
            <Button onClick={addCustomQuestion} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Question
            </Button>
          </div>

          {/* Existing Questions List */}
          {settings.customQuestions.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-medium">Custom Questions</h4>
              {settings.customQuestions.map((question) => (
                <div key={question.id} className="flex items-start justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{question.question}</span>
                      {question.required && (
                        <span className="text-red-500 text-sm">*</span>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Type: {question.type}
                      {question.options && question.options.length > 0 && (
                        <span> • Options: {question.options.join(", ")}</span>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeQuestion(question.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Confirmation Message */}
      <Card>
        <CardHeader>
          <CardTitle>RSVP Confirmation Message</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label>Custom Confirmation Message</Label>
            <Textarea
              placeholder="Thank you for your RSVP! We look forward to celebrating with you."
              value={settings.confirmationMessage}
              onChange={(e) => onSettingsChange({ ...settings, confirmationMessage: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}