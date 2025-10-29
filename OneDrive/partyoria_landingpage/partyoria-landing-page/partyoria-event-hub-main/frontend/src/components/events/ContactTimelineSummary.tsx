import { Phone, Mail, Clock, Users, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ContactTimelineSummaryProps {
  formData: any;
}

export function ContactTimelineSummary({ formData }: ContactTimelineSummaryProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Contact Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5" />
            Contact Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <p className="font-medium">Primary Contact</p>
            <p className="text-sm text-muted-foreground">
              {formData.primaryContact.name || "Not specified"} • {formData.primaryContact.phone || "No phone"} • {formData.primaryContact.email || "No email"}
            </p>
          </div>
          {formData.secondaryContact.name && (
            <div>
              <p className="font-medium">Secondary Contact</p>
              <p className="text-sm text-muted-foreground">
                {formData.secondaryContact.name} • {formData.secondaryContact.phone} • {formData.secondaryContact.email}
              </p>
            </div>
          )}
          <div className="flex gap-2">
            <Badge variant="outline">Preferred: {formData.preferredComm}</Badge>
            <Badge variant="outline">Available: {formData.availabilityHours.start}-{formData.availabilityHours.end}</Badge>
          </div>
        </CardContent>
      </Card>

      {/* RSVP Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            RSVP Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-2">
            {formData.rsvpSettings.responseOptions.map((option: string) => (
              <Badge key={option} variant="secondary">{option}</Badge>
            ))}
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <CheckCircle2 className={`h-4 w-4 ${formData.rsvpSettings.collectDietary ? 'text-green-500' : 'text-gray-400'}`} />
              <span className="text-sm">Dietary restrictions collection</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className={`h-4 w-4 ${formData.rsvpSettings.allowPlusOne ? 'text-green-500' : 'text-gray-400'}`} />
              <span className="text-sm">Plus-one guests allowed</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            {formData.rsvpSettings.customQuestions.length} custom questions configured
          </p>
        </CardContent>
      </Card>

      {/* Timeline Summary */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Timeline Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{formData.timelineItems.length}</p>
              <p className="text-sm text-muted-foreground">Timeline Items</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-500">
                {formData.timelineItems.filter((item: any) => item.completed).length}
              </p>
              <p className="text-sm text-muted-foreground">Completed</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-amber-500">
                {formData.timelineItems.filter((item: any) => item.priority === 'critical').length}
              </p>
              <p className="text-sm text-muted-foreground">Critical Tasks</p>
            </div>
          </div>
          {formData.reminders.enabled && (
            <div className="mt-4 pt-4 border-t">
              <p className="text-sm font-medium mb-2">Automated Reminders:</p>
              <div className="flex gap-2">
                {formData.reminders.schedule.map((time: string) => (
                  <Badge key={time} variant="outline">{time}</Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}