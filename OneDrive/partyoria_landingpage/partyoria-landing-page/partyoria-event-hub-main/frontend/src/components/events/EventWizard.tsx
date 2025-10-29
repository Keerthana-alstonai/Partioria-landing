import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Calendar } from 'lucide-react';
import { eventSections } from '../../data/eventSections';
import { EventFormData, ValidationErrors } from '../../types';
import { validateForm, isFormValid } from '../../utils/validation';
import { eventStorage } from '../../utils/localStorage';
import VendorSelectionModal from './VendorSelectionModal';
import VendorChoiceModal from './VendorChoiceModal';
import OrganizerSelectionModal from './OrganizerSelectionModal';
import LocationSelector from './LocationSelector';
import TraditionSelector from './TraditionSelector';
import Breadcrumb from './Breadcrumb';
import ProgressIndicator from './ProgressIndicator';
import SuccessModal from './SuccessModal';

export function EventWizard() {
  const { id, sectionId, subsectionId } = useParams();
  const isEditMode = Boolean(id);
  const currentSectionId = sectionId || 'social';
  const currentSubsectionId = subsectionId || 'wedding';
  const onBack = () => window.history.back();
  const onEventCreated = (eventName: string, clientName: string) => {
    console.log('Event created:', eventName, clientName);
  };
  const editEventId = id;
  const [formData, setFormData] = useState<EventFormData>({
    eventName: '',
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    dateTime: '',
    duration: '',
    customDuration: '',
    state: '',
    city: '',
    venueDetails: '',
    traditionStyle: '',
    attendees: 0,
    budget: { min: 0, max: 0 },
    description: '',
    selectedVendors: [],
    customRequirements: '',
    specialInstructions: '',
    accessibilityNeeds: '',
    needsVendor: false,
    eventPriority: 'medium',
    contactPreference: 'both',
    timeline: [],
    foodPreferences: [],
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showVendorChoiceModal, setShowVendorChoiceModal] = useState(false);
  const [showVendorModal, setShowVendorModal] = useState(false);
  const [showOrganizerModal, setShowOrganizerModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [createdEventData, setCreatedEventData] = useState<any>(null);

  const section = eventSections.find(s => s.id === currentSectionId);
  const subsection = section?.subsections.find(s => s.id === currentSubsectionId);

  useEffect(() => {
    const loadEventData = async () => {
      if (editEventId) {
        try {
          const { apiService, convertApiEventToFormData } = await import('../../services/api');
          const eventData = await apiService.getEvent(parseInt(editEventId));
          const formData = convertApiEventToFormData(eventData);
          formData.dateTime = eventData.date.slice(0, 16);
          setFormData(formData);
          return;
        } catch (error) {
          console.warn('Failed to load event from API, trying localStorage:', error);
        }
        
        const existingEvent = eventStorage.getEvent(editEventId);
        if (existingEvent) {
          setFormData(existingEvent);
          return;
        }
      } else {
        setFormData({
          eventName: subsection?.name || '',
          clientName: '',
          clientEmail: '',
          clientPhone: '',
          dateTime: '',
          duration: '',
          customDuration: '',
          state: '',
          city: '',
          venueDetails: '',
          traditionStyle: '',
          attendees: 0,
          budget: { min: 0, max: 0 },
          description: '',
          selectedVendors: [],
          customRequirements: '',
          specialInstructions: '',
          accessibilityNeeds: '',
          needsVendor: false,
          eventPriority: 'medium',
          contactPreference: 'both',
          inspirationImage: null,
          timeline: [],
          foodPreferences: [],
        });
      }
    };
    
    loadEventData();
  }, [subsection?.name, editEventId]);

  const handleInputChange = (field: keyof EventFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleBudgetChange = (type: 'min' | 'max', value: number) => {
    setFormData(prev => ({
      ...prev,
      budget: { ...prev.budget, [type]: value }
    }));
    if (errors.budget) {
      setErrors(prev => ({ ...prev, budget: undefined }));
    }
  };

  const handleChooseVendors = () => {
    setShowVendorChoiceModal(false);
    setShowVendorModal(true);
  };

  const handleSkipVendors = () => {
    setShowVendorChoiceModal(false);
    setShowOrganizerModal(true);
  };

  const handleVendorSelectionComplete = async (selectedVendors: string[]) => {
    if (createdEventData && selectedVendors.length > 0) {
      const { apiService } = await import('../../services/api');
      for (const vendorId of selectedVendors) {
        try {
          const numericVendorId = parseInt(vendorId);
          if (!isNaN(numericVendorId) && numericVendorId > 0) {
            await apiService.createVendorBooking({
              vendor_id: numericVendorId,
              event_id: createdEventData.id!,
              booking_date: formData.dateTime,
              status: 'pending',
            });
          }
        } catch (error) {
          console.warn('Failed to book vendor:', vendorId, error);
        }
      }
    }
    setShowVendorModal(false);
    setShowSuccessModal(true);
  };

  const handleOrganizerSelectionComplete = async (selectedOrganizer: string | null) => {
    if (createdEventData && selectedOrganizer) {
      const { apiService } = await import('../../services/api');
      try {
        await apiService.createVendorBooking({
          vendor_id: parseInt(selectedOrganizer),
          event_id: createdEventData.id!,
          booking_date: formData.dateTime,
          status: 'pending',
        });
      } catch (error) {
        console.warn('Failed to book organizer:', selectedOrganizer, error);
      }
      setShowOrganizerModal(false);
      setShowSuccessModal(true);
    } else {
      setShowOrganizerModal(false);
      setShowVendorModal(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);
    
    if (!isFormValid(validationErrors)) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const { apiService, convertFormDataToApiEvent } = await import('../../services/api');
      
      const apiEvent = convertFormDataToApiEvent(formData, currentSectionId, currentSubsectionId);
      apiEvent.date = new Date(formData.dateTime).toISOString();
      apiEvent.venue_details = formData.venueDetails;
      

      
      let savedEvent;
      if (editEventId) {
        savedEvent = await apiService.updateEvent(parseInt(editEventId), apiEvent);
        onEventCreated(formData.eventName, formData.clientName);
      } else {
        savedEvent = await apiService.createEvent(apiEvent);
        setCreatedEventData(savedEvent);
        eventStorage.clearDraft();
        setShowVendorChoiceModal(true);
      }
    } catch (error) {
      console.error('Error saving event:', error);
      alert('Error creating event. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getVendorsForEvent = () => {
    if (!subsection) return [];
    return subsection.vendors;
  };

  if (!section || !subsection) {
    return <div>Event not found</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb
          sectionName={section.name}
          subsectionName={subsection.name}
          onBack={onBack}
        />

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <ProgressIndicator formData={formData} />
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center">
              <Calendar className="text-purple-600" size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{subsection.name}</h1>
              <p className="text-gray-600">Create your perfect event</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Event Name *
                  </label>
                  <input
                    type="text"
                    value={formData.eventName}
                    onChange={(e) => handleInputChange('eventName', e.target.value)}
                    className={`w-full border-2 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all ${
                      errors.eventName ? 'border-red-500' : 'border-gray-200'
                    }`}
                    placeholder="Enter event name"
                  />
                  {errors.eventName && (
                    <p className="text-red-500 text-sm mt-1">{errors.eventName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    value={formData.clientName}
                    onChange={(e) => handleInputChange('clientName', e.target.value)}
                    className={`w-full border-2 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all ${
                      errors.clientName ? 'border-red-500' : 'border-gray-200'
                    }`}
                    placeholder="Enter client name"
                  />
                  {errors.clientName && (
                    <p className="text-red-500 text-sm mt-1">{errors.clientName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Client Email *
                  </label>
                  <input
                    type="email"
                    value={formData.clientEmail}
                    onChange={(e) => handleInputChange('clientEmail', e.target.value)}
                    className={`w-full border-2 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all ${
                      errors.clientEmail ? 'border-red-500' : 'border-gray-200'
                    }`}
                    placeholder="Enter client email"
                  />
                  {errors.clientEmail && (
                    <p className="text-red-500 text-sm mt-1">{errors.clientEmail}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.clientPhone}
                    onChange={(e) => handleInputChange('clientPhone', e.target.value)}
                    className={`w-full border-2 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all ${
                      errors.clientPhone ? 'border-red-500' : 'border-gray-200'
                    }`}
                    placeholder="Enter phone number"
                  />
                  {errors.clientPhone && (
                    <p className="text-red-500 text-sm mt-1">{errors.clientPhone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expected Attendees *
                  </label>
                  <input
                    type="number"
                    value={formData.attendees || ''}
                    onChange={(e) => handleInputChange('attendees', parseInt(e.target.value) || 0)}
                    className={`w-full border-2 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all ${
                      errors.attendees ? 'border-red-500' : 'border-gray-200'
                    }`}
                    placeholder="Number of attendees"
                    min="1"
                  />
                  {errors.attendees && (
                    <p className="text-red-500 text-sm mt-1">{errors.attendees}</p>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date & Time *
                  </label>
                  <input
                    type="datetime-local"
                    value={formData.dateTime}
                    onChange={(e) => handleInputChange('dateTime', e.target.value)}
                    min={new Date().toISOString().slice(0, 16)}
                    className={`w-full border-2 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all ${
                      errors.dateTime ? 'border-red-500' : 'border-gray-200'
                    }`}
                  />
                  {errors.dateTime && (
                    <p className="text-red-500 text-sm mt-1">{errors.dateTime}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Event Duration *
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <select
                      value={formData.duration || ''}
                      onChange={(e) => handleInputChange('duration', e.target.value)}
                      className={`w-full border-2 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all ${
                        errors.duration ? 'border-red-500' : 'border-gray-200'
                      }`}
                    >
                      <option value="">Select duration</option>
                      <option value="2-hours">2 Hours</option>
                      <option value="4-hours">4 Hours</option>
                      <option value="6-hours">6 Hours</option>
                      <option value="full-day">Full Day</option>
                      <option value="custom">Custom</option>
                    </select>
                    {formData.duration === 'custom' && (
                      <input
                        type="text"
                        value={formData.customDuration || ''}
                        onChange={(e) => handleInputChange('customDuration', e.target.value)}
                        className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                        placeholder="Specify duration"
                      />
                    )}
                  </div>
                  {errors.duration && (
                    <p className="text-red-500 text-sm mt-1">{errors.duration}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Preference
                  </label>
                  <select
                    value={formData.contactPreference || 'both'}
                    onChange={(e) => handleInputChange('contactPreference', e.target.value)}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                  >
                    <option value="email">Email Only</option>
                    <option value="phone">Phone Only</option>
                    <option value="both">Both Email & Phone</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Event Priority
                  </label>
                  <select
                    value={formData.eventPriority || 'medium'}
                    onChange={(e) => handleInputChange('eventPriority', e.target.value)}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                  >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                  </select>
                </div>
              </div>
            </div>
            
            <LocationSelector
              selectedState={formData.state}
              selectedCity={formData.city}
              onStateChange={(state) => handleInputChange('state', state)}
              onCityChange={(city) => handleInputChange('city', city)}
              error={errors.venue}
            />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Venue Details (Optional)
                </label>
                <textarea
                  value={formData.venueDetails}
                  onChange={(e) => handleInputChange('venueDetails', e.target.value)}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                  rows={3}
                  placeholder="Specific venue requirements..."
                  maxLength={300}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Description (Optional)
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                  rows={3}
                  placeholder="Describe your event..."
                  maxLength={500}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Budget Range * (₹)
              </label>
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => {handleBudgetChange('min', 10000); handleBudgetChange('max', 25000);}}
                    className="px-4 py-2 text-sm bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200 transition-colors"
                  >
                    ₹10K - ₹25K
                  </button>
                  <button
                    type="button"
                    onClick={() => {handleBudgetChange('min', 25000); handleBudgetChange('max', 50000);}}
                    className="px-4 py-2 text-sm bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200 transition-colors"
                  >
                    ₹25K - ₹50K
                  </button>
                  <button
                    type="button"
                    onClick={() => {handleBudgetChange('min', 50000); handleBudgetChange('max', 100000);}}
                    className="px-4 py-2 text-sm bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200 transition-colors"
                  >
                    ₹50K - ₹1L
                  </button>
                  <button
                    type="button"
                    onClick={() => {handleBudgetChange('min', 100000); handleBudgetChange('max', 200000);}}
                    className="px-4 py-2 text-sm bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200 transition-colors"
                  >
                    ₹1L - ₹2L
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  value={formData.budget.min || ''}
                  onChange={(e) => handleBudgetChange('min', parseInt(e.target.value) || 0)}
                  className={`w-full border-2 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all ${
                    errors.budget ? 'border-red-500' : 'border-gray-200'
                  }`}
                  placeholder="Minimum budget"
                  min="0"
                />
                <input
                  type="number"
                  value={formData.budget.max || ''}
                  onChange={(e) => handleBudgetChange('max', parseInt(e.target.value) || 0)}
                  className={`w-full border-2 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all ${
                    errors.budget ? 'border-red-500' : 'border-gray-200'
                  }`}
                  placeholder="Maximum budget"
                  min="0"
                />
              </div>
              {errors.budget && (
                <p className="text-red-500 text-sm mt-1">{errors.budget}</p>
              )}
            </div>

            <TraditionSelector
              eventType={currentSectionId}
              selectedTradition={formData.traditionStyle}
              onTraditionChange={(tradition) => handleInputChange('traditionStyle', tradition)}
              subsectionName={subsection?.name}
            />
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Inspiration Image (Optional)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleInputChange('inspirationImage', e.target.files?.[0] || null)}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
              />
              <p className="text-sm text-gray-500 mt-1">Upload an image to help vendors understand your vision</p>
            </div>
            
            {!subsection?.name.toLowerCase().includes('virtual') && !subsection?.name.toLowerCase().includes('online') && (
              <div className="bg-orange-50 rounded-2xl p-6 border-2 border-orange-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">🍽️ Food Preferences</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Food Type</h4>
                    <div className="flex flex-wrap gap-2">
                      {['Vegetarian', 'Non-Vegetarian', 'Vegan', 'Jain'].map((type) => (
                        <label key={type} className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-orange-200">
                          <input
                            type="checkbox"
                            checked={formData.foodPreferences.includes(type)}
                            onChange={(e) => {
                              const updated = e.target.checked
                                ? [...formData.foodPreferences, type]
                                : formData.foodPreferences.filter(f => f !== type);
                              setFormData({...formData, foodPreferences: updated});
                            }}
                            className="text-orange-500 focus:ring-orange-500"
                          />
                          <span className="text-sm">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Cuisine Types</h4>
                    <div className="flex flex-wrap gap-2">
                      {['South Indian', 'North Indian', 'Chinese', 'Italian', 'Continental', 'Mexican', 'Thai', 'Japanese'].map((cuisine) => (
                        <label key={cuisine} className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-orange-200">
                          <input
                            type="checkbox"
                            checked={formData.foodPreferences.includes(cuisine)}
                            onChange={(e) => {
                              const updated = e.target.checked
                                ? [...formData.foodPreferences, cuisine]
                                : formData.foodPreferences.filter(f => f !== cuisine);
                              setFormData({...formData, foodPreferences: updated});
                            }}
                            className="text-orange-500 focus:ring-orange-500"
                          />
                          <span className="text-sm">{cuisine}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-green-50 rounded-2xl p-6 border-2 border-green-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">⏰ Event Timeline</h3>
                <button
                  type="button"
                  onClick={() => {
                    const newEvent = {
                      id: Date.now().toString(),
                      title: '',
                      time: ''
                    };
                    setFormData({...formData, timeline: [...(formData.timeline || []), newEvent]});
                  }}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Event
                </button>
              </div>
              
              <div className="space-y-3">
                {(formData.timeline || []).map((event, index) => (
                  <div key={event.id} className="flex gap-3 items-center bg-white p-3 rounded-lg border border-green-200">
                    <input
                      type="text"
                      value={event.title}
                      onChange={(e) => {
                        const updatedTimeline = [...(formData.timeline || [])];
                        updatedTimeline[index].title = e.target.value;
                        setFormData({...formData, timeline: updatedTimeline});
                      }}
                      className="flex-1 px-3 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Event title (e.g., Ceremony, Reception)"
                    />
                    <input
                      type="time"
                      value={event.time}
                      onChange={(e) => {
                        const updatedTimeline = [...(formData.timeline || [])];
                        updatedTimeline[index].time = e.target.value;
                        setFormData({...formData, timeline: updatedTimeline});
                      }}
                      className="px-3 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const updatedTimeline = (formData.timeline || []).filter((_, i) => i !== index);
                        setFormData({...formData, timeline: updatedTimeline});
                      }}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}
                {(formData.timeline || []).length === 0 && (
                  <div className="text-center py-8 text-green-600">
                    <p>No timeline events added yet. Click "Add Event" to start.</p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Custom Requirements
                </label>
                <textarea
                  value={formData.customRequirements}
                  onChange={(e) => handleInputChange('customRequirements', e.target.value)}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                  rows={3}
                  placeholder="Specific vendor requirements..."
                  maxLength={300}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Special Instructions
                </label>
                <textarea
                  value={formData.specialInstructions}
                  onChange={(e) => handleInputChange('specialInstructions', e.target.value)}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                  rows={3}
                  placeholder="Setup instructions..."
                  maxLength={300}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Accessibility Needs
                </label>
                <textarea
                  value={formData.accessibilityNeeds}
                  onChange={(e) => handleInputChange('accessibilityNeeds', e.target.value)}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                  rows={3}
                  placeholder="Special accommodations..."
                  maxLength={200}
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
              <button
                type="button"
                onClick={onBack}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-8 rounded-xl transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-8 rounded-xl shadow-lg transition-all hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex-1"
              >
                {isSubmitting ? (editEventId ? 'Updating Event...' : 'Creating Event...') : (editEventId ? 'Update Event' : 'Create Event')}
              </button>
            </div>
          </form>
        </div>
      </div>

      <VendorChoiceModal
        isOpen={showVendorChoiceModal}
        onClose={() => setShowVendorChoiceModal(false)}
        onChooseVendors={handleChooseVendors}
        onSkipVendors={handleSkipVendors}
        eventName={formData.eventName}
      />
      
      <VendorSelectionModal
        isOpen={showVendorModal}
        onClose={() => setShowVendorModal(false)}
        onComplete={handleVendorSelectionComplete}
        vendors={getVendorsForEvent()}
        eventName={formData.eventName}
      />
      
      <OrganizerSelectionModal
        isOpen={showOrganizerModal}
        onClose={() => setShowOrganizerModal(false)}
        onComplete={handleOrganizerSelectionComplete}
        eventName={formData.eventName}
      />
      
      {showSuccessModal && (
        <SuccessModal
          eventName={formData.eventName}
          clientName={formData.clientName}
          onClose={() => {
            setShowSuccessModal(false);
            window.history.back();
          }}
        />
      )}
    </div>
  );
};

