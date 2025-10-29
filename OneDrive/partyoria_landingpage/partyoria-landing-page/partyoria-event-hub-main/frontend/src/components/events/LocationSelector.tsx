import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/api';

interface LocationSelectorProps {
  selectedState: string;
  selectedCity: string;
  onStateChange: (state: string) => void;
  onCityChange: (city: string) => void;
  error?: string;
}

// Fallback data in case API is not available
const fallbackStates = [
  'Andhra Pradesh', 'Karnataka', 'Maharashtra', 'Tamil Nadu', 'Gujarat', 
  'Rajasthan', 'West Bengal', 'Uttar Pradesh', 'Telangana', 'Kerala',
  'Punjab', 'Haryana', 'Delhi'
];

const fallbackCities = {
  'Maharashtra': ['Mumbai', 'Pune', 'Nagpur'],
  'Karnataka': ['Bengaluru', 'Mysuru', 'Mangaluru'],
  'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai'],
  'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara'],
  'Delhi': ['Delhi'],
  'Andhra Pradesh': ['Visakhapatnam', 'Vijayawada', 'Guntur'],
  'Rajasthan': ['Jaipur'],
  'West Bengal': ['Kolkata', 'Siliguri', 'Durgapur'],
  'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Agra'],
  'Telangana': ['Hyderabad', 'Warangal'],
  'Kerala': ['Thiruvananthapuram', 'Kochi', 'Kozhikode'],
  'Punjab': ['Amritsar', 'Ludhiana'],
  'Haryana': ['Gurugram', 'Faridabad']
};

const LocationSelector: React.FC<LocationSelectorProps> = ({
  selectedState,
  selectedCity,
  onStateChange,
  onCityChange,
  error
}) => {
  const [states, setStates] = useState<string[]>(fallbackStates);
  const [citiesByState, setCitiesByState] = useState<Record<string, string[]>>(fallbackCities);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLocations = async () => {
      try {
        const data = await apiService.getLocations();
        setStates(data.states);
        setCitiesByState(data.cities_by_state);
      } catch (error) {
        console.log('Using fallback location data');
        // Keep fallback data
      } finally {
        setLoading(false);
      }
    };

    loadLocations();
  }, []);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">📍 Event Location</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
          <select
            value={selectedState}
            onChange={(e) => {
              onStateChange(e.target.value);
              onCityChange('');
            }}
            disabled={loading}
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all disabled:opacity-50"
          >
            <option value="">{loading ? 'Loading states...' : 'Select State'}</option>
            {states.map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
          <select
            value={selectedCity}
            onChange={(e) => onCityChange(e.target.value)}
            disabled={!selectedState || loading}
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all disabled:opacity-50"
          >
            <option value="">{loading ? 'Loading cities...' : 'Select City'}</option>
            {selectedState && citiesByState[selectedState]?.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default LocationSelector;