import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';

interface PreferenceData {
  eventType: string;
  date: Date | undefined;
  attendees: string;
  city: string;
  budget: string;
  duration: string;
  timeOfDay: string;
  style: string;
  specialRequests: string;
}

interface PreferenceQuestionnaireProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (preferences: PreferenceData) => void;
}

const PreferenceQuestionnaire = ({ isOpen, onClose, onComplete }: PreferenceQuestionnaireProps) => {
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState<PreferenceData>({
    eventType: '',
    date: undefined,
    attendees: '',
    city: '',
    budget: '',
    duration: '',
    timeOfDay: '',
    style: '',
    specialRequests: ''
  });

  const totalSteps = 3;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onComplete(preferences);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return preferences.eventType && preferences.date && preferences.attendees;
      case 2:
        return preferences.city && preferences.budget;
      case 3:
        return preferences.duration && preferences.timeOfDay;
      default:
        return false;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Tell us about your event</DialogTitle>
          <div className="flex space-x-2 mt-4">
            {Array.from({ length: totalSteps }, (_, i) => (
              <div
                key={i}
                className={`h-2 flex-1 rounded ${
                  i + 1 <= step ? 'bg-primary' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {step === 1 && (
            <>
              <div>
                <Label>Event Type</Label>
                <Select value={preferences.eventType} onValueChange={(value) => 
                  setPreferences({ ...preferences, eventType: value })
                }>
                  <SelectTrigger>
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="birthday">Birthday Party</SelectItem>
                    <SelectItem value="wedding">Wedding</SelectItem>
                    <SelectItem value="corporate">Corporate Event</SelectItem>
                    <SelectItem value="anniversary">Anniversary</SelectItem>
                    <SelectItem value="graduation">Graduation</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Event Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {preferences.date ? preferences.date.toLocaleDateString() : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={preferences.date}
                      onSelect={(date) => setPreferences({ ...preferences, date })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Label>Number of Attendees</Label>
                <Select value={preferences.attendees} onValueChange={(value) => 
                  setPreferences({ ...preferences, attendees: value })
                }>
                  <SelectTrigger>
                    <SelectValue placeholder="Select attendee count" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-10">1-10 people</SelectItem>
                    <SelectItem value="11-25">11-25 people</SelectItem>
                    <SelectItem value="26-50">26-50 people</SelectItem>
                    <SelectItem value="51-100">51-100 people</SelectItem>
                    <SelectItem value="100+">100+ people</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div>
                <Label>City/Location</Label>
                <Input
                  placeholder="Enter your city"
                  value={preferences.city}
                  onChange={(e) => setPreferences({ ...preferences, city: e.target.value })}
                />
              </div>

              <div>
                <Label>Budget Range</Label>
                <Select value={preferences.budget} onValueChange={(value) => 
                  setPreferences({ ...preferences, budget: value })
                }>
                  <SelectTrigger>
                    <SelectValue placeholder="Select budget range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under-1000">Under $1,000</SelectItem>
                    <SelectItem value="1000-2500">$1,000 - $2,500</SelectItem>
                    <SelectItem value="2500-5000">$2,500 - $5,000</SelectItem>
                    <SelectItem value="5000-10000">$5,000 - $10,000</SelectItem>
                    <SelectItem value="10000+">$10,000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Event Style</Label>
                <Select value={preferences.style} onValueChange={(value) => 
                  setPreferences({ ...preferences, style: value })
                }>
                  <SelectTrigger>
                    <SelectValue placeholder="Select event style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="casual">Casual</SelectItem>
                    <SelectItem value="formal">Formal</SelectItem>
                    <SelectItem value="elegant">Elegant</SelectItem>
                    <SelectItem value="fun">Fun & Playful</SelectItem>
                    <SelectItem value="traditional">Traditional</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div>
                <Label>Event Duration</Label>
                <Select value={preferences.duration} onValueChange={(value) => 
                  setPreferences({ ...preferences, duration: value })
                }>
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2-3">2-3 hours</SelectItem>
                    <SelectItem value="4-5">4-5 hours</SelectItem>
                    <SelectItem value="6-8">6-8 hours</SelectItem>
                    <SelectItem value="full-day">Full day</SelectItem>
                    <SelectItem value="multi-day">Multi-day</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Time of Day</Label>
                <Select value={preferences.timeOfDay} onValueChange={(value) => 
                  setPreferences({ ...preferences, timeOfDay: value })
                }>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time preference" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">Morning (9 AM - 12 PM)</SelectItem>
                    <SelectItem value="afternoon">Afternoon (12 PM - 5 PM)</SelectItem>
                    <SelectItem value="evening">Evening (5 PM - 10 PM)</SelectItem>
                    <SelectItem value="night">Night (10 PM+)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Special Requests (Optional)</Label>
                <Input
                  placeholder="Any special requirements or requests?"
                  value={preferences.specialRequests}
                  onChange={(e) => setPreferences({ ...preferences, specialRequests: e.target.value })}
                />
              </div>
            </>
          )}
        </div>

        <div className="flex justify-between pt-4">
          <Button
            variant="outline"
            onClick={step === 1 ? onClose : handleBack}
          >
            {step === 1 ? 'Cancel' : 'Back'}
          </Button>
          <Button
            onClick={handleNext}
            disabled={!isStepValid()}
          >
            {step === totalSteps ? 'Continue' : 'Next'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PreferenceQuestionnaire;