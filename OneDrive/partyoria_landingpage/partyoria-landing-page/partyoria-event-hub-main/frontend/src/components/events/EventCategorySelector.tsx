import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Briefcase, Heart, Palette, Church, Sparkles, Flag, 
  Trophy, GraduationCap, Activity, Leaf, Monitor, Search, ArrowLeft 
} from 'lucide-react';
import { eventSections } from '../../data/eventSections';

const iconMap = {
  Briefcase, Heart, Palette, Church, Sparkles, Flag,
  Trophy, GraduationCap, Activity, Leaf, Monitor
};

const EventCategorySelector: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  const getIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName as keyof typeof iconMap];
    return IconComponent ? <IconComponent size={32} /> : <Briefcase size={32} />;
  };

  const filteredSections = eventSections.filter(section =>
    section.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    section.subsections.some(sub => 
      sub.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const selectedSectionData = eventSections.find(s => s.id === selectedSection);

  const handleSectionSelect = (sectionId: string) => {
    setSelectedSection(sectionId);
  };

  const handleSubsectionSelect = (subsectionId: string) => {
    navigate(`/dashboard/customer/create-event/${selectedSection}/${subsectionId}`);
  };

  const handleBack = () => {
    setSelectedSection(null);
  };

  if (selectedSection && selectedSectionData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium mb-4"
            >
              <ArrowLeft size={20} />
              Back to Categories
            </button>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {selectedSectionData.name}
            </h1>
            <p className="text-gray-600">Choose your specific event type</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {selectedSectionData.subsections.map((subsection) => (
              <div
                key={subsection.id}
                onClick={() => handleSubsectionSelect(subsection.id)}
                className="bg-white rounded-2xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100"
              >
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl mb-4 mx-auto">
                  <div className="text-purple-600">
                    {getIcon(selectedSectionData.icon)}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
                  {subsection.name}
                </h3>
                <p className="text-sm text-gray-500 text-center">
                  {subsection.vendors.length} vendors available
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Create Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Event</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Choose from 11 event categories to get started
          </p>
          
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search event types..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredSections.map((section) => (
            <div
              key={section.id}
              onClick={() => handleSectionSelect(section.id)}
              className="bg-white rounded-2xl shadow-lg p-8 cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100"
            >
              <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl mb-6 mx-auto">
                <div className="text-purple-600">
                  {getIcon(section.icon)}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 text-center mb-3">
                {section.name}
              </h3>
              <p className="text-gray-500 text-center text-sm">
                {section.subsections.length} event types available
              </p>
            </div>
          ))}
        </div>

        {filteredSections.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No events found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCategorySelector;