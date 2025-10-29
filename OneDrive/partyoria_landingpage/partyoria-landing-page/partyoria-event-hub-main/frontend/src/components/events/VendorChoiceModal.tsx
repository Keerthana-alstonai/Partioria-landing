import React from 'react';

interface VendorChoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onChooseVendors: () => void;
  onSkipVendors: () => void;
  eventName: string;
}

const VendorChoiceModal: React.FC<VendorChoiceModalProps> = ({
  isOpen,
  onClose,
  onChooseVendors,
  onSkipVendors,
  eventName
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Event Created Successfully!</h2>
        <p className="text-gray-600 mb-6">
          Your event "{eventName}" has been created. Would you like to select vendors now?
        </p>
        <div className="flex gap-4">
          <button
            onClick={onSkipVendors}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-xl transition-all"
          >
            Skip for Now
          </button>
          <button
            onClick={onChooseVendors}
            className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-xl transition-all"
          >
            Choose Vendors
          </button>
        </div>
      </div>
    </div>
  );
};

export default VendorChoiceModal;