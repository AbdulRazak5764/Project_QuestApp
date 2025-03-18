import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { 
  ShoppingBag, 
  Compass, 
  Trophy, 
  User, 
  Menu, 
  X, 
  Search,
  Bell
} from 'lucide-react';

const Navbar = () => {
  const { user } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <ShoppingBag className="h-8 w-8 text-purple-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">QuestMart</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products or quests..."
                className="w-64 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            
            <Link to="/shop" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50">
              Shop
            </Link>
            <Link to="/quests" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50">
              Quests
            </Link>
            <Link to="/leaderboard" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50">
              Leaderboard
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button className="relative p-2 rounded-full text-gray-600 hover:text-purple-600 hover:bg-purple-50">
              <Bell className="h-6 w-6" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
            </button>
            
            <Link to="/profile" className="flex items-center space-x-2">
              <div className="relative">
                <div className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center text-white">
                  {user?.avatar || <User className="h-5 w-5" />}
                </div>
                <span className="absolute -top-1 -right-1 bg-yellow-400 text-xs font-bold px-1 rounded-full">
                  {user?.level || 1}
                </span>
              </div>
              <div className="text-sm">
                <p className="font-medium text-gray-700">{user?.name || 'Adventurer'}</p>
                <p className="text-xs text-gray-500">{user?.questCoins || 0} QC</p>
              </div>
            </Link>
          </div>

          {/* Mobile Navigation */}
          <div className="flex md:hidden items-center space-x-2">
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-purple-600 hover:bg-purple-50"
            >
              <Search className="h-6 w-6" />
            </button>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-purple-600 hover:bg-purple-50"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      {isSearchOpen && (
        <div className="md:hidden px-4 pb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for products or quests..."
              className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link 
              to="/shop" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center">
                <ShoppingBag className="h-5 w-5 mr-2" />
                Shop
              </div>
            </Link>
            <Link 
              to="/quests" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center">
                <Compass className="h-5 w-5 mr-2" />
                Quests
              </div>
            </Link>
            <Link 
              to="/leaderboard" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center">
                <Trophy className="h-5 w-5 mr-2" />
                Leaderboard
              </div>
            </Link>
            <Link 
              to="/profile" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Profile
              </div>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;