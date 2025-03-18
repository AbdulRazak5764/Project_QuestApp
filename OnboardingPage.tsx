import React, { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { ShoppingBag, ArrowRight, Check } from 'lucide-react';

interface OnboardingPageProps {
  onComplete: () => void;
}

const OnboardingPage: React.FC<OnboardingPageProps> = ({ onComplete }) => {
  const { updateUser } = useUser();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    avatar: 'A', // Default avatar is first initial
    interests: [] as string[],
  });

  const availableInterests = [
    { id: 'fashion', label: 'Fashion' },
    { id: 'tech', label: 'Technology' },
    { id: 'home', label: 'Home Decor' },
    { id: 'beauty', label: 'Beauty' },
    { id: 'sports', label: 'Sports' },
    { id: 'books', label: 'Books' },
    { id: 'gaming', label: 'Gaming' },
    { id: 'food', label: 'Food & Cooking' },
  ];

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      avatar: value.charAt(0).toUpperCase() || 'A',
    });
  };

  const toggleInterest = (interestId: string) => {
    setFormData({
      ...formData,
      interests: formData.interests.includes(interestId)
        ? formData.interests.filter(id => id !== interestId)
        : [...formData.interests, interestId],
    });
  };

  const handleComplete = () => {
    updateUser({
      name: formData.name,
      avatar: formData.avatar,
      interests: formData.interests,
      level: 1,
      questCoins: 100, // Starting coins
      completedQuests: [],
    });
    onComplete();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-600 flex flex-col justify-center items-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-8">
        <div className="flex items-center justify-center mb-8">
          <ShoppingBag className="h-10 w-10 text-purple-600" />
          <span className="ml-2 text-2xl font-bold text-gray-900">QuestMart</span>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-between mb-8">
          <div className={`w-1/3 h-1 rounded-full ${step >= 1 ? 'bg-purple-600' : 'bg-gray-200'}`}></div>
          <div className={`w-1/3 h-1 rounded-full mx-1 ${step >= 2 ? 'bg-purple-600' : 'bg-gray-200'}`}></div>
          <div className={`w-1/3 h-1 rounded-full ${step >= 3 ? 'bg-purple-600' : 'bg-gray-200'}`}></div>
        </div>

        {/* Step 1: Welcome */}
        {step === 1 && (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to QuestMart!</h2>
            <p className="text-gray-600 mb-8">
              Get ready to transform your shopping experience into an exciting adventure.
            </p>
            <button
              onClick={handleNextStep}
              className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition duration-300 flex items-center justify-center"
            >
              Let's Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        )}

        {/* Step 2: Create Profile */}
        {step === 2 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Create Your Profile</h2>
            <p className="text-gray-600 mb-6">
              Tell us a bit about yourself to personalize your questing experience.
            </p>
            
            <div className="mb-6">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                What should we call you?
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your name or username"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div className="mb-8 flex items-center">
              <div className="h-16 w-16 rounded-full bg-purple-600 flex items-center justify-center text-white text-2xl font-bold mr-4">
                {formData.avatar}
              </div>
              <div className="text-sm text-gray-600">
                This will be your avatar in QuestMart. We'll use the first letter of your name.
              </div>
            </div>

            <button
              onClick={handleNextStep}
              disabled={!formData.name}
              className={`w-full py-3 font-semibold rounded-lg flex items-center justify-center ${
                formData.name 
                  ? 'bg-purple-600 text-white hover:bg-purple-700' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              } transition duration-300`}
            >
              Continue <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        )}

        {/* Step 3: Select Interests */}
        {step === 3 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Select Your Interests</h2>
            <p className="text-gray-600 mb-6">
              Choose categories that interest you to personalize your quests and product recommendations.
            </p>
            
            <div className="grid grid-cols-2 gap-3 mb-8">
              {availableInterests.map((interest) => (
                <button
                  key={interest.id}
                  onClick={() => toggleInterest(interest.id)}
                  className={`px-4 py-3 rounded-lg border ${
                    formData.interests.includes(interest.id)
                      ? 'bg-purple-100 border-purple-600 text-purple-800'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  } flex items-center justify-between transition duration-200`}
                >
                  <span>{interest.label}</span>
                  {formData.interests.includes(interest.id) && (
                    <Check className="h-5 w-5 text-purple-600" />
                  )}
                </button>
              ))}
            </div>

            <button
              onClick={handleComplete}
              disabled={formData.interests.length === 0}
              className={`w-full py-3 font-semibold rounded-lg flex items-center justify-center ${
                formData.interests.length > 0
                  ? 'bg-purple-600 text-white hover:bg-purple-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              } transition duration-300`}
            >
              Start Your Adventure <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        )}
      </div>

      {/* Skip option (for development purposes) */}
      <button 
        onClick={onComplete}
        className="mt-4 text-white text-sm opacity-70 hover:opacity-100"
      >
        Skip for now
      </button>
    </div>
  );
};

export default OnboardingPage;