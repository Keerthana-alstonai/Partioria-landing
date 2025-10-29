import React, { useState } from 'react';

interface OrganizerSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (selectedOrganizer: string | null) => void;
  eventName: string;
}

const organizers = [
  { id: '1', name: 'Elite Event Organizers', rating: 4.8, experience: '10+ years' },
  { id: '2', name: 'Premium Party Planners', rating: 4.7, experience: '8+ years' },
  { id: '3', name: 'Royal Event Management', rating: 4.9, experience: '12+ years' },
  { id: '4', name: 'Creative Celebrations', rating: 4.6, experience: '6+ years' },
];

const OrganizerSelectionModal: React.FC<OrganizerSelectionModalProps> = ({
  isOpen,
  onClose,
  onComplete,
  eventName
}) => {
  const [selectedOrganizer, setSelectedOrganizer] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleComplete = () => {
    onComplete(selectedOrganizer);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Select Event Organizer for {eventName}</h2>
        <p className="text-gray-600 mb-6">Choose a professional organizer to help manage your event</p>
        <div className="space-y-3 mb-6">
          {organizers.map((organizer) => (
            <label key={organizer.id} className="flex items-center gap-3 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <input
                type="radio"
                name="organizer"
                value={organizer.id}
                checked={selectedOrganizer === organizer.id}
                onChange={() => setSelectedOrganizer(organizer.id)}
                className="text-purple-600 focus:ring-purple-500"
              />
              <div className="flex-1">
                <div className="font-medium">{organizer.name}</div>
                <div className="text-sm text-gray-500">
                  ⭐ {organizer.rating} • {organizer.experience}
                </div>
              </div>
            </label>
          ))}
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => onComplete(null)}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-xl transition-all"
          >
            Skip Organizer
          </button>
          <button
            onClick={handleComplete}
            disabled={!selectedOrganizer}
            className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Select Organizer
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrganizerSelectionModal;