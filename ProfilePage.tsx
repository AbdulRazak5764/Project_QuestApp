import React, { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { useQuest } from '../contexts/QuestContext';
import { useShop } from '../contexts/ShopContext';
import { 
  Trophy, 
  Gift, 
  ShoppingBag, 
  Settings, 
  LogOut, 
  Edit,
  Star,
  Clock,
  ChevronRight
} from 'lucide-react';

const ProfilePage = () => {
  const { user, updateUser } = useUser();
  const { completedQuests } = useQuest();
  const { purchaseHistory } = useShop();
  const [activeTab, setActiveTab] = useState('overview');

  if (!user) {
    return <div>Loading...</div>;
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <Trophy className="h-5 w-5" /> },
    { id: 'quests', label: 'Completed Quests', icon: <Star className="h-5 w-5" /> },
    { id: 'purchases', label: 'Purchase History', icon: <ShoppingBag className="h-5 w-5" /> },
    { id: 'rewards', label: 'Rewards', icon: <Gift className="h-5 w-5" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="h-5 w-5" /> },
  ];

  // Calculate user stats
  const totalQuestsCompleted = completedQuests.length;
  const totalQuestCoinsEarned = completedQuests.reduce((sum, quest) => sum + quest.reward, 0);
  const totalPurchases = purchaseHistory.length;

  // Calculate progress to next level
  const experienceToNextLevel = 1000;
  const currentExperience = (user.level * 1000) - 200;
  const progressPercentage = (currentExperience / experienceToNextLevel) * 100;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex flex-col md:flex-row items-center md:items-start">
          <div className="relative mb-4 md:mb-0 md:mr-6">
            <div className="h-24 w-24 rounded-full bg-purple-600 flex items-center justify-center text-white text-4xl font-bold">
              {user.avatar}
            </div>
            <button className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md">
              <Edit className="h-4 w-4 text-gray-600" />
            </button>
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                <p className="text-gray-600">Joined April 2025</p>
              </div>
              
              <div className="mt-4 md:mt-0 flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-200 w-full sm:w-auto">
                  Edit Profile
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-200 flex items-center justify-center w-full sm:w-auto">
                  <LogOut className="h-4 w-4 mr-2" /> Sign Out
                </button>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-purple-50 rounded-lg p-4 text-center">
                <p className="text-sm text-gray-600">Level</p>
                <p className="text-2xl font-bold text-purple-700">{user.level}</p>
              </div>
              
              <div className="bg-purple-50 rounded-lg p-4 text-center">
                <p className="text-sm text-gray-600">QuestCoins</p>
                <p className="text-2xl font-bold text-purple-700">{user.questCoins}</p>
              </div>
              
              <div className="bg-purple-50 rounded-lg p-4 text-center">
                <p className="text-sm text-gray-600">Quests Completed</p>
                <p className="text-2xl font-bold text-purple-700">{totalQuestsCompleted}</p>
              </div>
              
              <div className="bg-purple-50 rounded-lg p-4 text-center">
                <p className="text-sm text-gray-600">Purchases</p>
                <p className="text-2xl font-bold text-purple-700">{totalPurchases}</p>
              </div>
            </div>
            
            <div className="mt-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Level {user.level} → Level {user.level + 1}</span>
                <span className="text-sm text-gray-600">{currentExperience}/{experienceToNextLevel} XP</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-purple-600 h-2.5 rounded-full" 
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white rounded-xl shadow-sm mb-8 overflow-x-auto">
        <div className="flex p-1 min-w-max">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg mx-1 ${
                activeTab === tab.id
                  ? 'bg-purple-100 text-purple-800'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        {activeTab === 'overview' && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Overview</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Recent Activity */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {completedQuests.slice(0, 3).map((quest) => (
                    <div key={quest.id} className="flex items-start p-3 bg-gray-50 rounded-lg">
                      <div className="bg-purple-100 p-2 rounded-lg mr-3">
                        <Star className="h-5 w-5 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{quest.title}</p>
                        <p className="text-sm text-gray-600">Completed quest and earned {quest.reward} QuestCoins</p>
                      </div>
                      <div className="text-xs text-gray-500 whitespace-nowrap">
                        <Clock className="h-3 w-3 inline mr-1" />
                        2h ago
                      </div>
                    </div>
                  ))}
                  
                  {purchaseHistory.slice(0, 2).map((purchase) => (
                    <div key={purchase.id} className="flex items-start p-3 bg-gray-50 rounded-lg">
                      <div className="bg-purple-100 p-2 rounded-lg mr-3">
                        <ShoppingBag className="h-5 w-5 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{purchase.productName}</p>
                        <p className="text-sm text-gray-600">Purchased for ${purchase.price}</p>
                      </div>
                      <div className="text-xs text-gray-500 whitespace-nowrap">
                        <Clock className="h-3 w-3 inline mr-1" />
                        1d ago
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Stats & Achievements */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Stats & Achievements</h3>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Total QuestCoins Earned</p>
                    <p className="text-2xl font-bold text-purple-700">{totalQuestCoinsEarned}</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Quests Streak</p>
                    <p className="text-2xl font-bold text-purple-700">5 days</p>
                  </div>
                </div>
                
                <h4 className="font-medium text-gray-900 mb-3">Recent Achievements</h4>
                <div className="space-y-3">
                  <div className="flex items-center p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="bg-yellow-100 p-2 rounded-full mr-3">
                      <Trophy className="h-5 w-5 text-yellow-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">First Quest Completed</p>
                      <p className="text-sm text-gray-600">Completed your first quest</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-3 bg-purple-50 border border-purple-200 rounded-lg">
                    <div className="bg-purple-100 p-2 rounded-full mr-3">
                      <ShoppingBag className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">First Purchase</p>
                      <p className="text-sm text-gray-600">Made your first purchase</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'quests' && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Completed Quests</h2>
            
            {completedQuests.length > 0 ? (
              <div className="space-y-4">
                {completedQuests.map((quest) => (
                  <div key={quest.id} className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <div className="bg-purple-100 p-3 rounded-lg mr-4">
                      <Star className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{quest.title}</h3>
                      <p className="text-sm text-gray-600">{quest.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-purple-700">+{quest.reward} QC</p>
                      <p className="text-xs text-gray-500">Completed on April 15, 2025</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Star className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No quests completed yet</h3>
                <p className="text-gray-600 mb-6">Start completing quests to earn rewards and see them here.</p>
                <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-200">
                  Explore Quests
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'purchases' && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Purchase History</h2>
            
            {purchaseHistory.length > 0 ? (
              <div className="space-y-4">
                {purchaseHistory.map((purchase) => (
                  <div key={purchase.id} className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <div className="h-16 w-16 bg-gray-200 rounded-lg mr-4 overflow-hidden">
                      <img 
                        src={purchase.image} 
                        alt={purchase.productName} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{purchase.productName}</h3>
                      <p className="text-sm text-gray-600">Order #{purchase.orderId}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">${purchase.price}</p>
                      <p className="text-xs text-gray-500">Purchased on April 10, 2025</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No purchases yet</h3>
                <p className="text-gray-600 mb-6">Your purchase history will appear here once you buy something.</p>
                <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-200">
                  Start Shopping
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'rewards' && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Your Rewards</h2>
            
            <div className="bg-purple-50 rounded-lg p-4 mb-8 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Available QuestCoins</p>
                <p className="text-2xl font-bold text-purple-700">{user.questCoins} QC</p>
              </div>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-200">
                Redeem Coins
              </button>
            </div>
            
            <h3 className="font-medium text-gray-900 mb-4">Available Rewards</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-lg p-4 flex justify-between items-center">
                <div className="flex items-center">
                  <div className="bg-purple-100 p-3 rounded-lg mr-4">
                    <Gift className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">10% Off Next Purchase</h4>
                    <p className="text-sm text-gray-600">Valid for 30 days</p>
                  </div>
                </div>
                <button className="px-3 py-1 bg-purple-600 text-white text-sm rounded hover:bg-purple-700 transition duration-200">
                  200 QC
                </button>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 flex justify-between items-center">
                <div className="flex items-center">
                  <div className="bg-purple-100 p-3 rounded-lg mr-4">
                    <Gift className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Free Shipping</h4>
                    <p className="text-sm text-gray-600">On your next order</p>
                  </div>
                </div>
                <button className="px-3 py-1 bg-purple-600 text-white text-sm rounded hover:bg-purple-700 transition duration-200">
                  150 QC
                </button>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 flex justify-between items-center">
                <div className="flex items-center">
                  <div className="bg-purple-100 p-3 rounded-lg mr-4">
                    <Gift className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Exclusive Product Access</h4>
                    <p className="text-sm text-gray-600">Limited edition items</p>
                  </div>
                </div>
                <button className="px-3 py-1 bg-purple-600 text-white text-sm rounded hover:bg-purple-700 transition duration-200">
                  500 QC
                </button>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 flex justify-between items-center">
                <div className="flex items-center">
                  <div className="bg-purple-100 p-3 rounded-lg mr-4">
                    <Gift className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Mystery Box</h4>
                    <p className="text-sm text-gray-600">Surprise products and rewards</p>
                  </div>
                </div>
                <button className="px-3 py-1 bg-purple-600 text-white text-sm rounded hover:bg-purple-700 transition duration-200">
                  300 QC
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Account Settings</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Profile Information</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input 
                        type="text" 
                        value={user.name}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input 
                        type="email" 
                        value="user@example.com"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-200">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Preferences</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">Email Notifications</p>
                        <p className="text-sm text-gray-600">Receive emails about new quests and rewards</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">Push Notifications</p>
                        <p className="text-sm text-gray-600">Receive notifications about quest updates</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">Marketing Communications</p>
                        <p className="text-sm text-gray-600">Receive updates about promotions and offers</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Privacy & Security</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                  <button className="flex items-center justify-between w-full p-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition duration-200">
                    <span className="font-medium text-gray-900">Change Password</span>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </button>
                  
                  <button className="flex items-center justify-between w-full p-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition duration-200">
                    <span className="font-medium text-gray-900">Privacy Settings</span>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </button>
                  
                  <button className="flex items-center justify-between w-full p-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition duration-200">
                    <span className="font-medium text-gray-900">Delete Account</span>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;