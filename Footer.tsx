import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Facebook, Twitter, Instagram, Youtube, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center">
              <ShoppingBag className="h-8 w-8 text-purple-400" />
              <span className="ml-2 text-xl font-bold">QuestMart</span>
            </div>
            <p className="text-gray-400 text-sm">
              Turn shopping into an adventure with quests, challenges, and rewards.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Shop</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/shop" className="text-gray-400 hover:text-white">All Products</Link></li>
              <li><Link to="/shop?category=fashion" className="text-gray-400 hover:text-white">Fashion</Link></li>
              <li><Link to="/shop?category=tech" className="text-gray-400 hover:text-white">Tech</Link></li>
              <li><Link to="/shop?category=home" className="text-gray-400 hover:text-white">Home</Link></li>
              <li><Link to="/shop?category=exclusive" className="text-gray-400 hover:text-white">Exclusive Items</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Quests</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/quests" className="text-gray-400 hover:text-white">Daily Quests</Link></li>
              <li><Link to="/quests?type=weekly" className="text-gray-400 hover:text-white">Weekly Challenges</Link></li>
              <li><Link to="/quests?type=social" className="text-gray-400 hover:text-white">Social Missions</Link></li>
              <li><Link to="/leaderboard" className="text-gray-400 hover:text-white">Leaderboard</Link></li>
              <li><Link to="/quests?type=events" className="text-gray-400 hover:text-white">Live Events</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Support</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">Help Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Contact Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Shipping Info</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Returns & Refunds</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Terms & Conditions</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} QuestMart. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <Mail className="h-4 w-4" />
                <span>Subscribe to our newsletter</span>
              </div>
              <div className="mt-2 flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-4 py-2 rounded-l-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button className="px-4 py-2 bg-purple-600 rounded-r-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
