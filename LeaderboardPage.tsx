import React, { useState, useMemo } from 'react';
import { Trophy, Medal, Filter, ChevronDown, ChevronUp } from 'lucide-react';

interface LeaderboardData {
  id: number;
  name: string;
  avatar: string;
  level: number;
  questCoins: number;
  questsCompleted: number;
  rank: number;
}

const LeaderboardPage: React.FC = () => {
  const [timeFrame, setTimeFrame] = useState('weekly');
  const [sortBy, setSortBy] = useState('questCoins');
  const [sortDirection, setSortDirection] = useState('desc');

  // Mock leaderboard data
  const leaderboardData: LeaderboardData[] = useMemo(() => [
    { id: 1, name: 'Alex Johnson', avatar: 'A', level: 15, questCoins: 3450, questsCompleted: 42, rank: 1 },
    { id: 2, name: 'Sarah Williams', avatar: 'S', level: 14, questCoins: 3200, questsCompleted: 38, rank: 2 },
    { id: 3, name: 'Michael Chen', avatar: 'M', level: 13, questCoins: 2980, questsCompleted: 35, rank: 3 },
    { id: 4, name: 'Jessica Lee', avatar: 'J', level: 12, questCoins: 2750, questsCompleted: 32, rank: 4 },
    { id: 5, name: 'David Kim', avatar: 'D', level: 11, questCoins: 2600, questsCompleted: 30, rank: 5 },
    { id: 6, name: 'Emily Davis', avatar: 'E', level: 10, questCoins: 2450, questsCompleted: 28, rank: 6 },
    { id: 7, name: 'Robert Wilson', avatar: 'R', level: 9, questCoins: 2300, questsCompleted: 26, rank: 7 },
    { id: 8, name: 'Lisa Martinez', avatar: 'L', level: 8, questCoins: 2150, questsCompleted: 24, rank: 8 },
    { id: 9, name: 'James Taylor', avatar: 'J', level: 7, questCoins: 2000, questsCompleted: 22, rank: 9 },
    { id: 10, name: 'Olivia Brown', avatar: 'O', level: 6, questCoins: 1850, questsCompleted: 20, rank: 10 },
  ], []);

  // Sort the leaderboard data
  const sortedLeaderboard = useMemo(() => {
    return [...leaderboardData].sort((a: LeaderboardData, b: LeaderboardData) => {
      const multiplier = sortDirection === 'desc' ? -1 : 1;
      const aValue = a[sortBy as keyof LeaderboardData] as number;
      const bValue = b[sortBy as keyof LeaderboardData] as number;
      return multiplier * (aValue - bValue);
    });
  }, [leaderboardData, sortBy, sortDirection]);

  const handleSort = (column: keyof LeaderboardData) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === 'desc' ? 'asc' : 'desc');
    } else {
      setSortBy(column);
      setSortDirection('desc');
    }
  };

  const renderSortIcon = (column: string) => {
    if (sortBy !== column) return null;
    return sortDirection === 'desc' ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Leaderboard</h1>
          <p className="text-gray-600">
            Compete with other shoppers and climb the ranks to earn exclusive rewards.
          </p>
        </div>
        
        <div className="mt-4 md:mt-0 flex items-center space-x-2">
          <div className="relative">
            <select
              value={timeFrame}
              onChange={(e) => setTimeFrame(e.target.value)}
              className="appearance-none pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="allTime">All Time</option>
            </select>
            <Filter className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Top 3 Winners Highlight */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {sortedLeaderboard.slice(0, 3).map((user, index) => (
          <div 
            key={user.id} 
            className={`relative bg-white rounded-xl shadow-sm p-6 text-center ${
              index === 0 ? 'border-2 border-yellow-400 md:transform md:-translate-y-4' : 
              index === 1 ? 'border-2 border-gray-400' : 
              'border-2 border-amber-600'
            }`}
          >
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              {index === 0 ? (
                <div className="bg-yellow-400 text-white p-2 rounded-full">
                  <Trophy className="h-6 w-6" />
                </div>
              ) : (
                <div className={`${index === 1 ? 'bg-gray-400' : 'bg-amber-600'} text-white p-2 rounded-full`}>
                  <Medal className="h-6 w-6" />
                </div>
              )}
            </div>
            
            <div className="mt-4 flex flex-col items-center">
              <div className={`h-20 w-20 rounded-full flex items-center justify-center text-white text-2xl font-bold ${
                index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-500' : 'bg-amber-700'
              }`}>
                {user.avatar}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mt-4">{user.name}</h3>
              <p className="text-gray-600">Level {user.level}</p>
              
              <div className="mt-4 grid grid-cols-2 gap-4 w-full">
                <div>
                  <p className="text-sm text-gray-600">QuestCoins</p>
                  <p className="text-xl font-bold text-purple-700">{user.questCoins}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Quests</p>
                  <p className="text-xl font-bold text-purple-700">{user.questsCompleted}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Full Leaderboard Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rank
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('level')}
                >
                  <div className="flex items-center">
                    Level
                    {renderSortIcon('level')}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('questCoins')}
                >
                  <div className="flex items-center">
                    QuestCoins
                    {renderSortIcon('questCoins')}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('questsCompleted')}
                >
                  <div className="flex items-center">
                    Quests Completed
                    {renderSortIcon('questsCompleted')}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedLeaderboard.map((user, index) => (
                <tr key={user.id} className={index < 3 ? 'bg-purple-50' : ''}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className={`flex items-center justify-center h-6 w-6 rounded-full text-xs font-medium ${
                        index === 0 ? 'bg-yellow-100 text-yellow-800' : 
                        index === 1 ? 'bg-gray-100 text-gray-800' : 
                        index === 2 ? 'bg-amber-100 text-amber-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {index + 1}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold mr-3">
                        {user.avatar}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.level}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-purple-700">{user.questCoins}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.questsCompleted}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Rewards Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Leaderboard Rewards</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border-t-4 border-yellow-400">
            <div className="flex items-center mb-4">
              <div className="bg-yellow-100 p-2 rounded-full mr-3">
                <Trophy className="h-6 w-6 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">1st Place</h3>
            </div>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center">
                <span className="h-2 w-2 bg-purple-600 rounded-full mr-2"></span>
                500 QuestCoins Bonus
              </li>
              <li className="flex items-center">
                <span className="h-2 w-2 bg-purple-600 rounded-full mr-2"></span>
                Exclusive Limited Edition Product
              </li>
              <li className="flex items-center">
                <span className="h-2 w-2 bg-purple-600 rounded-full mr-2"></span>
                25% Off Coupon for Any Purchase
              </li>
              <li className="flex items-center">
                <span className="h-2 w-2 bg-purple-600 rounded-full mr-2"></span>
                Gold Badge on Profile
              </li>
            </ul>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border-t-4 border-gray-400">
            <div className="flex items-center mb-4">
              <div className="bg-gray-100 p-2 rounded-full mr-3">
                <Medal className="h-6 w-6 text-gray-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">2nd Place</h3>
            </div>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center">
                <span className="h-2 w-2 bg-purple-600 rounded-full mr-2"></span>
                300 QuestCoins Bonus
              </li>
              <li className="flex items-center">
                <span className="h-2 w-2 bg-purple-600 rounded-full mr-2"></span>
                15% Off Coupon for Any Purchase
              </li>
              <li className="flex items-center">
                <span className="h-2 w-2 bg-purple-600 rounded-full mr-2"></span>
                Silver Badge on Profile
              </li>
            </ul>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border-t-4 border-amber-600">
            <div className="flex items-center mb-4">
              <div className="bg-amber-100 p-2 rounded-full mr-3">
                <Medal className="h-6 w-6 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">3rd Place</h3>
            </div>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center">
                <span className="h-2 w-2 bg-purple-600 rounded-full mr-2"></span>
                150 QuestCoins Bonus
              </li>
              <li className="flex items-center">
                <span className="h-2 w-2 bg-purple-600 rounded-full mr-2"></span>
                10% Off Coupon for Any Purchase
              </li>
              <li className="flex items-center">
                <span className="h-2 w-2 bg-purple-600 rounded-full mr-2"></span>
                Bronze Badge on Profile
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;
