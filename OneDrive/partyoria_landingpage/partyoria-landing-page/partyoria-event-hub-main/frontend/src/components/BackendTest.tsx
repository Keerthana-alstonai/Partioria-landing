import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { apiService } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

export const BackendTest = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    event_type: 'birthday',
    date: '',
    location: '',
    attendees_count: 0
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { user, isAuthenticated } = useAuth();

  const testConnection = async () => {
    setLoading(true);
    setMessage('');
    try {
      const response = await fetch('http://localhost:8000/api/events/');
      if (response.ok) {
        setMessage('✅ Backend connection successful!');
        const data = await response.json();
        setEvents(data);
      } else {
        setMessage('❌ Backend connection failed');
      }
    } catch (error) {
      setMessage('❌ Backend not running or CORS issue');
    } finally {
      setLoading(false);
    }
  };

  const createEvent = async () => {
    if (!newEvent.title || !newEvent.date) return;
    
    setLoading(true);
    try {
      const eventData = {
        ...newEvent,
        organizer: user?.id || 1
      };
      await apiService.createEvent(eventData);
      setMessage('✅ Event created successfully!');
      setNewEvent({
        title: '',
        description: '',
        event_type: 'birthday',
        date: '',
        location: '',
        attendees_count: 0
      });
      testConnection(); // Refresh events
    } catch (error) {
      setMessage('❌ Failed to create event');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    testConnection();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Backend Connection Test</CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={testConnection} disabled={loading} className="mb-4">
            {loading ? 'Testing...' : 'Test Backend Connection'}
          </Button>
          {message && (
            <div className={`p-3 rounded ${message.includes('✅') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {message}
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Create Test Event</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Event Title"
            value={newEvent.title}
            onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
          />
          <Input
            placeholder="Description"
            value={newEvent.description}
            onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
          />
          <Input
            type="datetime-local"
            value={newEvent.date}
            onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
          />
          <Input
            placeholder="Location"
            value={newEvent.location}
            onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
          />
          <Input
            type="number"
            placeholder="Number of Attendees"
            value={newEvent.attendees_count}
            onChange={(e) => setNewEvent({...newEvent, attendees_count: parseInt(e.target.value) || 0})}
          />
          <Button onClick={createEvent} disabled={loading}>
            {loading ? 'Creating...' : 'Create Event'}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Events from Backend ({events.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {events.length === 0 ? (
            <p className="text-gray-500">No events found</p>
          ) : (
            <div className="space-y-2">
              {events.map((event: any) => (
                <div key={event.id} className="p-3 border rounded">
                  <h3 className="font-semibold">{event.title}</h3>
                  <p className="text-sm text-gray-600">{event.description}</p>
                  <p className="text-sm">📅 {new Date(event.date).toLocaleDateString()}</p>
                  <p className="text-sm">📍 {event.location}</p>
                  <p className="text-sm">👥 {event.attendees_count} attendees</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};