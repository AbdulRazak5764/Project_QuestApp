import React from 'react';
import { useQuest } from '../contexts/QuestContext';
import { Compass, Clock, Gift, ChevronRight, Users, Trophy, Star, Check } from 'lucide-react';
import { QUEST_TYPES, DIFFICULTY_LEVELS } from '../constants/questConstants';

interface QuestCardProps {
  quest: {
    id: string;
    title: string;
    description: string;
    type: typeof QUEST_TYPES[number];
    difficulty: typeof DIFFICULTY_LEVELS[number];
    reward: number;
    timeLimit?: number;
    participants?: number;
    image?: string;
    progress?: number;
    isCompleted?: boolean;
  };
}

const QuestCard: React.FC<QuestCardProps> = ({ quest }) => {
  const { startQuest, completeQuest } = useQuest();

  const handleStartQuest = () => {
    startQuest(quest.id);
  };

  const handleCompleteQuest = () => {
    completeQuest(quest.id);
  };

  // Determine icon based on quest type
  const getQuestIcon = () => {
    switch (quest.type) {
      case 'daily':
        return <Compass className="h-6 w-6 text-purple-600" />;
      case 'social':
        return <Users className="h-6 w-6 text-purple-600" />;
      case 'exclusive':
        return <Star className="h-6 w-6 text-purple-600" />;
      default:
        return <Trophy className="h-6 w-6 text-purple-600" />;
    }
  };

  // Determine background color based on difficulty
  const getDifficultyColor = () => {
    switch (quest.difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Quest Image */}
      {quest.image && (
        <div className="relative h-40 overflow-hidden">
          <img 
            src={quest.image} 
            alt={quest.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute top-0 left-0 m-3">
            <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${getDifficultyColor()}`}>
              {quest.difficulty.charAt(0).toUpperCase() + quest.difficulty.slice(1)}
            </span>
          </div>
          <div className="absolute top-0 right-0 m-3">
            <span className="inline-block px-2 py-1 bg-purple-100 text-purple-800 text-xs font-semibold rounded-full">
              {quest.type.charAt(0).toUpperCase() + quest.type.slice(1)}
            </span>
          </div>
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-start mb-4">
          <div className="bg-purple-100 p-3 rounded-lg mr-4">
            {getQuestIcon()}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{quest.title}</h3>
            <p className="text-sm text-gray-600">{quest.description}</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="h-4 w-4 mr-1" />
            {quest.timeLimit ? `${quest.timeLimit} mins` : 'No time limit'}
          </div>
          
          <div className="flex items-center text-sm text-purple-700 font-medium">
            <Gift className="h-4 w-4 mr-1" />
            {quest.reward} QuestCoins
          </div>
        </div>
        
        {/* Progress Bar (if quest is in progress) */}
        {quest.progress !== undefined && !quest.isCompleted && (
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-medium text-gray-700">Progress</span>
              <span className="text-xs text-gray-600">{quest.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-purple-600 h-2 rounded-full" 
                style={{ width: `${quest.progress}%` }}
              ></div>
            </div>
          </div>
        )}
        
        {/* Action Button */}
        {quest.isCompleted ? (
          <div className="flex items-center justify-center p-2 bg-green-100 text-green-800 rounded-lg">
            <div className="flex items-center">
              <div className="bg-green-200 p-1 rounded-full mr-2">
                <Check className="h-4 w-4 text-green-700" />
              </div>
              <span className="text-sm font-medium">Completed</span>
            </div>
          </div>
        ) : quest.progress !== undefined ? (
          <button
            onClick={handleCompleteQuest}
            className="w-full py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition duration-200 flex items-center justify-center"
          >
            Complete Quest <ChevronRight className="ml-1 h-4 w-4" />
          </button>
        ) : (
          <button
            onClick={handleStartQuest}
            className="w-full py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition duration-200 flex items-center justify-center"
          >
            Start Quest <ChevronRight className="ml-1 h-4 w-4" />
          </button>
        )}
        
        {/* Social Participants (if applicable) */}
        {quest.type === 'social' && quest.participants && (
          <div className="mt-4 flex items-center justify-center">
            <div className="flex -space-x-2">
              {[...Array(Math.min(quest.participants, 5))].map((_, i) => (
                <div 
                  key={i} 
                  className="h-6 w-6 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-bold text-gray-600"
                >
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <span className="ml-2 text-xs text-gray-600">
              {quest.participants} {quest.participants === 1 ? 'participant' : 'participants'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestCard;
