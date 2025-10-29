import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, X, Calendar, Plus } from 'lucide-react';

interface SuccessModalProps {
  eventName: string;
  clientName: string;
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ eventName, clientName, onClose }) => {
  const navigate = useNavigate();
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full animate-fade-in">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="text-green-600" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Event Created!</h3>
                <p className="text-gray-600">Your event has been successfully created</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition duration-200"
            >
              <X size={24} />
            </button>
          </div>

          <div className="bg-purple-50 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="text-purple-600" size={20} />
              <span className="font-medium text-purple-900">Event Details</span>
            </div>
            <p className="text-purple-800 font-semibold">{eventName}</p>
            <p className="text-purple-700 text-sm font-medium">Client: {clientName}</p>
            <p className="text-purple-700 text-sm">
              Your vendors will be notified and will contact you soon with availability and quotes.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">What's Next?</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                <span>Vendors will review your requirements and respond within 24 hours</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                <span>You'll receive quotes and availability confirmations via email</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                <span>Book your preferred vendors to finalize your event</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 p-6 flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => {
              onClose();
              navigate('/dashboard/customer/events/create');
            }}
            className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 flex-1"
          >
            <Plus size={20} />
            Create Another Event
          </button>
          <button
            onClick={() => {
              onClose();
              navigate('/dashboard/customer');
            }}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg transition duration-200"
          >
            View Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;