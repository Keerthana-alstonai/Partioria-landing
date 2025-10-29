import React from 'react';
import { ChevronLeft } from 'lucide-react';

interface BreadcrumbProps {
  sectionName: string;
  subsectionName: string;
  onBack: () => void;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  sectionName,
  subsectionName,
  onBack
}) => {
  return (
    <div className="flex items-center gap-2 mb-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-purple-600 hover:text-purple-700 transition-colors"
      >
        <ChevronLeft size={20} />
        Back
      </button>
      <span className="text-gray-400">/</span>
      <span className="text-gray-600">{sectionName}</span>
      <span className="text-gray-400">/</span>
      <span className="font-medium text-gray-900">{subsectionName}</span>
    </div>
  );
};

export default Breadcrumb;