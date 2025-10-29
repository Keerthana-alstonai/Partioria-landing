import { EventFormData, ValidationErrors } from '../types';

export const validateForm = (formData: EventFormData): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!formData.eventName?.trim()) {
    errors.eventName = 'Event name is required';
  }

  if (!formData.clientName?.trim()) {
    errors.clientName = 'Client name is required';
  }

  if (!formData.clientEmail?.trim()) {
    errors.clientEmail = 'Client email is required';
  } else if (!/\S+@\S+\.\S+/.test(formData.clientEmail)) {
    errors.clientEmail = 'Please enter a valid email address';
  }

  if (!formData.clientPhone?.trim()) {
    errors.clientPhone = 'Phone number is required';
  }

  if (!formData.dateTime) {
    errors.dateTime = 'Date and time is required';
  }

  if (!formData.duration) {
    errors.duration = 'Duration is required';
  }

  if (!formData.attendees || formData.attendees <= 0) {
    errors.attendees = 'Number of attendees is required';
  }

  if (!formData.budget.min || !formData.budget.max) {
    errors.budget = 'Budget range is required';
  } else if (formData.budget.min >= formData.budget.max) {
    errors.budget = 'Maximum budget must be greater than minimum budget';
  }

  return errors;
};

export const isFormValid = (errors: ValidationErrors): boolean => {
  return Object.keys(errors).length === 0;
};