import React, { useState } from 'react';
import { Vendor } from '../../types';

interface VendorSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (selectedVendors: string[]) => void;
  vendors: Vendor[];
  eventName: string;
}

const VendorSelectionModal: React.FC<VendorSelectionModalProps> = ({
  isOpen,
  onClose,
  onComplete,
  vendors,
  eventName
}) => {
  const [selectedVendors, setSelectedVendors] = useState<string[]>([]);

  if (!isOpen) return null;

  const handleVendorToggle = (vendorId: string) => {
    setSelectedVendors(prev => 
      prev.includes(vendorId) 
        ? prev.filter(id => id !== vendorId)
        : [...prev, vendorId]
    );
  };

  const handleComplete = () => {
    onComplete(selectedVendors);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Select Vendors for {eventName}</h2>
        <div className="space-y-3 mb-6">
          {vendors.map((vendor) => (
            <label key={vendor.id} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50">
              <input
                type="checkbox"
                checked={selectedVendors.includes(vendor.id)}
                onChange={() => handleVendorToggle(vendor.id)}
                className="text-purple-600 focus:ring-purple-500"
              />
              <div>
                <div className="font-medium">{vendor.name}</div>
                <div className="text-sm text-gray-500">{vendor.category}</div>
              </div>
            </label>
          ))}
        </div>
        <div className="flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-xl transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleComplete}
            className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-xl transition-all"
          >
            Complete ({selectedVendors.length} selected)
          </button>
        </div>
      </div>
    </div>
  );
};

export default VendorSelectionModal;