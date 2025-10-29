import { EventFormData } from '../types';

const API_BASE_URL = 'http://localhost:8000/api';

// Check if backend is available
let backendAvailable = false; // Default to false to prevent initial requests

export interface ApiUser {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  role: 'customer' | 'vendor' | 'organizer';
  phone?: string;
  profile_image?: string;
  created_at: string;
}

export interface ApiEvent {
  id?: number;
  title: string;
  description: string;
  event_type: string;
  status: string;
  date: string;
  location: string;
  budget?: number;
  attendees_count: number;
  organizer: number;
  organizer_name?: string;
  guests?: any[];
  created_at?: string;
  updated_at?: string;
}

export interface ApiVenue {
  id: number;
  name: string;
  type: string;
  location: string;
  city: string;
  price: string;
  rating: number;
  reviews: number;
  image: string;
  suitability: string[];
  badges: string[];
  created_at: string;
}

export interface ApiVenueDetails {
  id: number;
  venue_name: string;
  location: string;
  capacity: number;
  price_range: string;
  image_url: string;
  description: string;
  created_at: string;
}

export interface ApiMediaUpload {
  id: number;
  title: string;
  description: string;
  file: string;
  file_url: string;
  media_type: 'image' | 'video' | 'document';
  file_size: number;
  uploaded_by: number;
  uploaded_by_name: string;
  event?: number;
  created_at: string;
}

class ApiService {
  private async request(endpoint: string, options: RequestInit = {}) {
    // Check backend availability first
    if (!backendAvailable) {
      throw new Error('Backend not available');
    }

    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      signal: AbortSignal.timeout(10000), // 10 second timeout
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }
      
      return response.json();
    } catch (error) {
      // Mark backend as unavailable on network errors
      if (error instanceof TypeError && error.message.includes('fetch')) {
        backendAvailable = false;
      }
      throw error;
    }
  }

  // User endpoints
  async registerUser(userData: any): Promise<{ user: ApiUser; message: string }> {
    return this.request('/users/register/', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async loginUser(credentials: { email: string; password: string }): Promise<{ user: ApiUser; message: string }> {
    return this.request('/users/login/', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async getUsers(): Promise<ApiUser[]> {
    return this.request('/users/');
  }

  async getUser(userId: number): Promise<ApiUser> {
    return this.request(`/users/${userId}/`);
  }

  // Event endpoints
  async createEvent(eventData: any): Promise<ApiEvent> {
    return this.request('/events/', {
      method: 'POST',
      body: JSON.stringify(eventData),
    });
  }

  async getEvents(): Promise<ApiEvent[]> {
    return this.request('/events/');
  }

  async getEvent(eventId: number): Promise<ApiEvent> {
    return this.request(`/events/${eventId}/`);
  }

  async updateEvent(eventId: number, eventData: any): Promise<ApiEvent> {
    return this.request(`/events/${eventId}/`, {
      method: 'PUT',
      body: JSON.stringify(eventData),
    });
  }

  async deleteEvent(eventId: number): Promise<void> {
    return this.request(`/events/${eventId}/`, {
      method: 'DELETE',
    });
  }

  async getEventStats(): Promise<any> {
    return this.request('/events/stats/');
  }

  // Venue endpoints
  async getVenues(city?: string): Promise<ApiVenue[]> {
    const endpoint = city ? `/events/venues/?city=${encodeURIComponent(city)}` : '/events/venues/';
    return this.request(endpoint);
  }

  async getVenue(venueId: number): Promise<ApiVenue> {
    return this.request(`/events/venues/${venueId}/`);
  }

  // Venue Details endpoints
  async getVenueDetails(city?: string): Promise<ApiVenueDetails[]> {
    const endpoint = city ? `/venue-details/?city=${encodeURIComponent(city)}` : '/venue-details/';
    return this.request(endpoint);
  }

  // Location endpoints
  async getLocations(): Promise<{ states: string[]; cities_by_state: Record<string, string[]>; popular_cities: string[] }> {
    try {
      return await this.request('/locations/');
    } catch (error) {
      // Return fallback data if backend is not available
      throw new Error('Backend not available - using fallback data');
    }
  }

  // Health check endpoint
  async healthCheck(): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/health/`, { 
        method: 'GET',
        signal: AbortSignal.timeout(3000)
      });
      backendAvailable = response.ok;
    } catch {
      backendAvailable = false;
    }
    return backendAvailable;
  }

  // Media upload endpoints
  async uploadFile(formData: FormData): Promise<ApiMediaUpload> {
    const url = `${API_BASE_URL}/media/upload/`;
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error(`Upload Error: ${response.status}`);
    }
    
    return response.json();
  }

  async getMediaUploads(): Promise<ApiMediaUpload[]> {
    return this.request('/media/');
  }

  async getMediaUpload(mediaId: number): Promise<ApiMediaUpload> {
    return this.request(`/media/${mediaId}/`);
  }
}

export const apiService = new ApiService();

export const convertFormDataToApiEvent = (formData: EventFormData, sectionId: string, subsectionId: string) => {
  return {
    name: formData.eventName,
    client_name: formData.clientName,
    client_email: formData.clientEmail,
    client_phone: formData.clientPhone,
    date: formData.dateTime,
    duration: formData.duration,
    custom_duration: formData.customDuration,
    state: formData.state,
    city: formData.city,
    venue_details: formData.venueDetails,
    tradition_style: formData.traditionStyle,
    attendees: formData.attendees,
    budget_min: formData.budget.min,
    budget_max: formData.budget.max,
    description: formData.description,
    custom_requirements: formData.customRequirements,
    special_instructions: formData.specialInstructions,
    accessibility_needs: formData.accessibilityNeeds,
    event_priority: formData.eventPriority,
    contact_preference: formData.contactPreference,
    timeline: formData.timeline,
    food_preferences: formData.foodPreferences,
    section_id: sectionId,
    subsection_id: subsectionId
  };
};

export const convertApiEventToFormData = (apiEvent: any): EventFormData => {
  return {
    eventName: apiEvent.name || '',
    clientName: apiEvent.client_name || '',
    clientEmail: apiEvent.client_email || '',
    clientPhone: apiEvent.client_phone || '',
    dateTime: apiEvent.date || '',
    duration: apiEvent.duration || '',
    customDuration: apiEvent.custom_duration || '',
    state: apiEvent.state || '',
    city: apiEvent.city || '',
    venueDetails: apiEvent.venue_details || '',
    traditionStyle: apiEvent.tradition_style || '',
    attendees: apiEvent.attendees || 0,
    budget: {
      min: apiEvent.budget_min || 0,
      max: apiEvent.budget_max || 0
    },
    description: apiEvent.description || '',
    selectedVendors: [],
    customRequirements: apiEvent.custom_requirements || '',
    specialInstructions: apiEvent.special_instructions || '',
    accessibilityNeeds: apiEvent.accessibility_needs || '',
    needsVendor: false,
    eventPriority: apiEvent.event_priority || 'medium',
    contactPreference: apiEvent.contact_preference || 'both',
    timeline: apiEvent.timeline || [],
    foodPreferences: apiEvent.food_preferences || []
  };
};