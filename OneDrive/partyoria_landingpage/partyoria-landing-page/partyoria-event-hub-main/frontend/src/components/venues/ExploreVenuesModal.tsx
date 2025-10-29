import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Heart, X } from 'lucide-react';

interface ExploreVenuesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCitySelect: (city: string) => void;
}

import { INDIAN_CITIES } from '@/data/venueData';

const popularCities = [
  'Delhi', 'Mumbai', 'Bengaluru', 'Chennai', 'Kolkata', 
  'Hyderabad', 'Pune', 'Ahmedabad', 'Jaipur', 'Goa',
  'Meerut', 'Agra', 'Varanasi', 'Gurugram', 'Shimla'
];

const moreCities = INDIAN_CITIES.filter(city => !popularCities.includes(city));

export const ExploreVenuesModal = ({ isOpen, onClose, onCitySelect }: ExploreVenuesModalProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showMoreCities, setShowMoreCities] = useState(false);

  const handleCitySelect = (city: string) => {
    onCitySelect(city);
    onClose();
  };

  const useCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          handleCitySelect('Bengaluru');
        },
        () => {
          alert('Please search for your city manually');
        }
      );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader className="relative">
          <DialogTitle className="text-2xl font-bold text-[#6b46c1] pr-8">
            Get event venues curated for your city
          </DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search your event city"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              variant="outline"
              onClick={useCurrentLocation}
              className="text-[#d53f8c] border-[#d53f8c] hover:bg-[#d53f8c] hover:text-white"
            >
              <Heart className="h-4 w-4 mr-2" />
              Use my location
            </Button>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-black mb-4">Event City</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-4">
              {popularCities.map((city) => (
                <Button
                  key={city}
                  variant="outline"
                  onClick={() => handleCitySelect(city)}
                  className="h-12 text-sm hover:bg-[#6b46c1] hover:text-white"
                >
                  {city}
                </Button>
              ))}
            </div>

            <h4 className="text-md font-medium text-gray-600 mb-3">Popular Cities</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {moreCities.slice(0, showMoreCities ? moreCities.length : 5).map((city) => (
                <Button
                  key={city}
                  variant="outline"
                  onClick={() => handleCitySelect(city)}
                  className="h-12 text-sm hover:bg-[#6b46c1] hover:text-white"
                >
                  {city}
                </Button>
              ))}
            </div>

            {!showMoreCities && (
              <Button
                variant="link"
                onClick={() => setShowMoreCities(true)}
                className="text-[#6b46c1] mt-2"
              >
                See More
              </Button>
            )}
          </div>

          <p className="text-center text-gray-400 text-sm">
            Not in these cities?{' '}
            <button className="text-[#6b46c1] underline">
              Search manually
            </button>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};