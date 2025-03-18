import React, { useState } from 'react';
import { useQuest } from '../contexts/QuestContext';
import QuestCard from '../components/QuestCard';
import { Compass, Calendar, Users, Star, Filter } from 'lucide-react';

const QuestsPage = () => {
  const { quests } = useQuest();
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const questTypes = [
    { id: 'all', label: 'All Quests', icon: <Compass className="h-5 w-5" /> },
    { id: 'daily', label: 'Daily', icon: <Calendar className="h-5 w-5" /> },
    { id: 'social', label: 'Social', icon: <Users className="h-5 w-5" /> },
    { id: 'exclusive', label: 'Exclusive', icon: <Star className="h-5 w-5" /> },
  ];

  const filteredQuests = quests.filter(quest => {
    const matchesFilter = activeFilter === 'all' || quest.type === activeFilter;
    const matchesSearch = quest.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          quest.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quests & Challenges</h1>
          <p className="text-gray-600 mt-2">Complete quests to earn QuestCoins and unlock exclusive rewards.</p>
        </div>
        
        <div className="mt-4 md:mt-0 relative">
          <input
            type="text"
            placeholder="Search quests..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 w-full md:w-64"
          />
          <Filter className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      {/* Quest Type Filters */}
      <div className="flex overflow-x-auto pb-2 mb-8 hide-scrollbar">
        <div className="flex space-x-2">
          {questTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setActiveFilter(type.id)}
              className={`flex items-center px-4 py-2 rounded-full whitespace-nowrap ${
                activeFilter === type.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              } transition duration-200`}
            >
              <span className="mr-2">{type.icon}</span>
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* Quests Grid */}
      {filteredQuests.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuests.map((quest) => (
            <QuestCard key={quest.id} quest={quest} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Compass className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">No quests found</h3>
          <p className="text-gray-600">
            Try adjusting your filters or check back later for new quests.
          </p>
        </div>
      )}
    </div>
  );
};

export default QuestsPage;