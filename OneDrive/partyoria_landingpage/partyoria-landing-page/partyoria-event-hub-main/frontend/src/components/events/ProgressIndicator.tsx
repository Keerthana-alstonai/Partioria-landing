import React from 'react';
import { CheckCircle, Circle } from 'lucide-react';

interface ProgressIndicatorProps {
  formData: any;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ formData }) => {
  const steps = [
    {
      id: 'basic',
      name: 'Basic Info',
      completed: formData.eventName && formData.clientName && formData.clientEmail && formData.clientPhone
    },
    {
      id: 'details',
      name: 'Event Details',
      completed: formData.dateTime && formData.duration && formData.state && formData.city && formData.attendees > 0
    },
    {
      id: 'budget',
      name: 'Budget & Style',
      completed: formData.budget.min > 0 && formData.budget.max > 0
    },
    {
      id: 'requirements',
      name: 'Requirements',
      completed: true // Optional section
    }
  ];

  const completedSteps = steps.filter(step => step.completed).length;
  const progressPercentage = (completedSteps / steps.length) * 100;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">Event Creation Progress</h3>
        <span className="text-sm text-gray-600">{completedSteps}/{steps.length} completed</span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
        <div 
          className="bg-purple-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      
      <div className="flex justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center">
            <div className="flex items-center">
              {step.completed ? (
                <CheckCircle className="text-green-500" size={20} />
              ) : (
                <Circle className="text-gray-300" size={20} />
              )}
            </div>
            <span className={`text-xs mt-1 ${step.completed ? 'text-green-600' : 'text-gray-400'}`}>
              {step.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator;