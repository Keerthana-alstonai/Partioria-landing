import React, { useState, useMemo, useEffect } from 'react';
import { Search, Users, CheckCircle } from 'lucide-react';
import { Vendor } from '../../types';
import { apiService, ApiVendor } from '../../services/api';

interface VendorSelectorProps {
  vendors: Vendor[];
  selectedVendors: string[];
  onVendorToggle: (vendorId: string) => void;
  error?: string;
}

const VendorSelector: React.FC<VendorSelectorProps> = ({
  vendors,
  selectedVendors,
  onVendorToggle,
  error,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [apiVendors, setApiVendors] = useState<ApiVendor[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadVendors = async () => {
      setLoading(true);
      try {
        const vendorData = await apiService.getVendors();
        setApiVendors(vendorData);
      } catch (error) {
        console.error('Error loading vendors:', error);
      } finally {
        setLoading(false);
      }
    };
    loadVendors();
  }, []);

  const allVendors = useMemo(() => {
    const staticVendors = vendors.map(v => ({
      id: v.id,
      name: v.name,
      category: v.category,
      description: '',
      contact_email: '',
      contact_phone: '',
      location: '',
      price_range_min: 0,
      price_range_max: 0,
      rating: 0,
      is_available: true
    }));
    
    if (!Array.isArray(apiVendors)) {
      return staticVendors;
    }
    
    const apiVendorsWithStringId = apiVendors.map(v => ({
      ...v,
      id: v.id.toString()
    }));
    return [...staticVendors, ...apiVendorsWithStringId];
  }, [vendors, apiVendors]);

  const categoryDisplayNames: { [key: string]: string } = {
    'venue': 'Venues',
    'Catering': 'Catering',
    'Photography': 'Photography',
    'Decoration': 'Decoration',
    'Entertainment': 'Entertainment',
    'Technical': 'Technical',
    'Security': 'Security',
    'Coordination': 'Coordination',
    'Speaking': 'Speaking',
    'Services': 'Services',
    'Religious': 'Religious',
    'Beauty': 'Beauty'
  };

  const categories = useMemo(() => {
    const cats = Array.from(new Set(allVendors.map(v => v.category)));
    return ['all', ...cats];
  }, [allVendors]);

  const filteredVendors = useMemo(() => {
    return allVendors.filter(vendor => {
      const matchesSearch = vendor.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || vendor.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [allVendors, searchQuery, selectedCategory]);

  const vendorsByCategory = useMemo(() => {
    const grouped: { [key: string]: any[] } = {};
    filteredVendors.forEach(vendor => {
      if (!grouped[vendor.category]) {
        grouped[vendor.category] = [];
      }
      grouped[vendor.category].push(vendor);
    });
    return grouped;
  }, [filteredVendors]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">
          Vendor Selection ({selectedVendors.length} selected)
        </h2>
      </div>

      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search vendors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category === 'all' ? 'All Categories' : (categoryDisplayNames[category] || category)}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-6">
        {Object.entries(vendorsByCategory).map(([category, categoryVendors]) => (
          <div key={category} className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Users size={20} />
              {categoryDisplayNames[category] || category} ({categoryVendors.filter(v => selectedVendors.includes(v.id)).length}/{categoryVendors.length})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {categoryVendors.map((vendor) => (
                <div
                  key={vendor.id}
                  onClick={() => onVendorToggle(vendor.id)}
                  className={`p-3 border rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedVendors.includes(vendor.id)
                      ? 'border-purple-500 bg-purple-50 shadow-md'
                      : 'border-gray-200 hover:border-purple-300 hover:bg-purple-25'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <span className="font-medium text-gray-900">{vendor.name}</span>
                      {vendor.location && (
                        <div className="text-sm text-gray-500">📍 {vendor.location}</div>
                      )}
                      {vendor.rating > 0 && (
                        <div className="text-sm text-gray-500">★ {vendor.rating}</div>
                      )}
                    </div>
                    {selectedVendors.includes(vendor.id) && (
                      <CheckCircle className="text-purple-600" size={20} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {filteredVendors.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No vendors found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default VendorSelector;