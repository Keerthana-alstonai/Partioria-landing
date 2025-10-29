import React from 'react';

interface TraditionSelectorProps {
  eventType: string;
  selectedTradition: string;
  onTraditionChange: (tradition: string) => void;
  subsectionName?: string;
}

const traditions = {
  'social': ['North Indian', 'South Indian', 'Bengali', 'Punjabi', 'Gujarati', 'Maharashtrian'],
  'festival': ['Traditional', 'Modern', 'Fusion', 'Regional'],
  'religious': ['Hindu', 'Muslim', 'Christian', 'Sikh', 'Buddhist'],
  'default': ['Traditional', 'Modern', 'Contemporary', 'Fusion']
};

const TraditionSelector: React.FC<TraditionSelectorProps> = ({
  eventType,
  selectedTradition,
  onTraditionChange,
  subsectionName
}) => {
  const availableTraditions = traditions[eventType] || traditions.default;

  return (
    <div className="bg-yellow-50 rounded-2xl p-6 border-2 border-yellow-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">🎭 Tradition & Style</h3>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Style for {subsectionName}
        </label>
        <select
          value={selectedTradition}
          onChange={(e) => onTraditionChange(e.target.value)}
          className="w-full border-2 border-yellow-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all"
        >
          <option value="">Select Tradition/Style</option>
          {availableTraditions.map((tradition) => (
            <option key={tradition} value={tradition}>{tradition}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TraditionSelector;