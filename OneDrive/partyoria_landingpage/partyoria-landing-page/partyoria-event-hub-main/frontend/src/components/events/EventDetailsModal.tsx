import React, { useState, useEffect } from 'react';
import { X, Calendar, MapPin, Users, DollarSign, Edit, User, Briefcase } from 'lucide-react';
import { apiService, ApiEvent, ApiVendor } from '../../services/api';

interface EventDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
  eventId: string;
}

const EventDetailsModal: React.FC<EventDetailsModalProps> = ({
  isOpen,
  onClose,
  onEdit,
  eventId,
}) => {
  const [event, setEvent] = useState<ApiEvent | null>(null);
  const [vendors, setVendors] = useState<ApiVendor[]>([]);
  const [organizer, setOrganizer] = useState<ApiVendor | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && eventId) {
      loadEventDetails();
    }
  }, [isOpen, eventId]);

  const loadEventDetails = async () => {
    setLoading(true);
    try {
      const eventData = await apiService.getEvent(parseInt(eventId));
      setEvent(eventData);
    } catch (error) {
      console.error('Error loading event details:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getBudgetText = (event: ApiEvent) => {
    if (event.budget_min !== undefined && event.budget_max !== undefined) {
      if (event.budget_min > 0 && event.budget_max > 0) {
        return `₹${event.budget_min.toLocaleString()} - ₹${event.budget_max.toLocaleString()}`;
      } else if (event.budget_min > 0) {
        return `₹${event.budget_min.toLocaleString()}+`;
      }
    }
    
    const ranges = {
      'under_5k': 'Under ₹5,000',
      '5k_15k': '₹5,000 - ₹15,000',
      '15k_30k': '₹15,000 - ₹30,000',
      '30k_50k': '₹30,000 - ₹50,000',
      'over_50k': 'Over ₹50,000'
    };
    return ranges[event.budget_range as keyof typeof ranges] || event.budget_range;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Event Details</h2>
            <p className="text-gray-600">Complete event information</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={onEdit}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="Edit Event"
            >
              <Edit size={20} />
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto max-h-[80vh] p-6">
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
              <p className="mt-2 text-gray-500">Loading event details...</p>
            </div>
          ) : event ? (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{event.title}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="text-purple-600" size={20} />
                    <span>{formatDate(event.date)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="text-purple-600" size={20} />
                    <span>{event.city}, {event.state}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="text-purple-600" size={20} />
                    <span>{event.guest_count} attendees</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="text-purple-600" size={20} />
                    <span>{getBudgetText(event)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Client Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <span className="text-sm font-medium text-gray-700">Name:</span>
                    <p className="text-gray-900">{event.contact_name}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-700">Email:</span>
                    <p className="text-gray-900">{event.contact_email}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-700">Phone:</span>
                    <p className="text-gray-900">{event.contact_phone}</p>
                  </div>
                </div>
              </div>

              {event.venue_details && (
                <div className="bg-green-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Venue Details</h4>
                  <p className="text-gray-700">{event.venue_details}</p>
                </div>
              )}

              {event.description && (
                <div className="bg-yellow-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Event Description</h4>
                  <p className="text-gray-700">{event.description}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">Event not found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetailsModal;