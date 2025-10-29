import { EventFormData } from '../types';

const STORAGE_KEY = 'partyoria_events';
const DRAFT_KEY = 'partyoria_draft';

export const eventStorage = {
  saveEvent: (eventId: string, eventData: EventFormData): void => {
    try {
      const existingEvents = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      existingEvents[eventId] = eventData;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existingEvents));
    } catch (error) {
      console.error('Error saving event to localStorage:', error);
    }
  },

  getEvent: (eventId: string): EventFormData | null => {
    try {
      const existingEvents = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      return existingEvents[eventId] || null;
    } catch (error) {
      console.error('Error getting event from localStorage:', error);
      return null;
    }
  },

  getAllEvents: (): Record<string, EventFormData> => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    } catch (error) {
      console.error('Error getting all events from localStorage:', error);
      return {};
    }
  },

  deleteEvent: (eventId: string): void => {
    try {
      const existingEvents = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      delete existingEvents[eventId];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existingEvents));
    } catch (error) {
      console.error('Error deleting event from localStorage:', error);
    }
  },

  saveDraft: (draftData: Partial<EventFormData>): void => {
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(draftData));
    } catch (error) {
      console.error('Error saving draft to localStorage:', error);
    }
  },

  getDraft: (): Partial<EventFormData> | null => {
    try {
      const draft = localStorage.getItem(DRAFT_KEY);
      return draft ? JSON.parse(draft) : null;
    } catch (error) {
      console.error('Error getting draft from localStorage:', error);
      return null;
    }
  },

  clearDraft: (): void => {
    try {
      localStorage.removeItem(DRAFT_KEY);
    } catch (error) {
      console.error('Error clearing draft from localStorage:', error);
    }
  },
};