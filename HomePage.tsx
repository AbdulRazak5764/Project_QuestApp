import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Trophy, Gift, Users, Zap, ShoppingBag } from 'lucide-react';
import QuestCard from '../components/QuestCard';
import ProductCard from '../components/ProductCard';
import { useQuest } from '../contexts/QuestContext';
import { useShop } from '../contexts/ShopContext';

const HomePage = () => {
  const { featuredQuests } = useQuest();
  const { trendingProducts } = useShop();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="relative rounded-xl overflow-hidden mb-12">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-90"></div>
        <img 
          src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
          alt="Shopping Adventure" 
          className="w-full h-96 object-cover"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Shopping is Now an Adventure
          </h1>
          <p className="text-xl text-white mb-8 max-w-2xl">
            Complete quests, earn rewards, and unlock exclusive products in our gamified shopping experience.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Link 
              to="/quests" 
              className="px-8 py-3 bg-white text-purple-700 font-semibold rounded-full hover:bg-gray-100 transition duration-300 shadow-lg"
            >
              Start Questing
            </Link>
            <Link 
              to="/shop" 
              className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:bg-opacity-10 transition duration-300"
            >
              Explore Shop
            </Link>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How QuestMart Works</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Turn your shopping experience into an exciting adventure with quests, challenges, and rewards.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Compass className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Complete Quests</h3>
            <p className="text-gray-600">
              Embark on daily quests, challenges, and missions to earn QuestCoins and unlock rewards.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Earn Rewards</h3>
            <p className="text-gray-600">
              Collect QuestCoins and climb the leaderboard to unlock exclusive discounts and products.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Gift className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Unlock Exclusives</h3>
            <p className="text-gray-600">
              Gain access to limited-edition items and special deals that are only available to questers.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Quests Section */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Featured Quests</h2>
          <Link to="/quests" className="text-purple-600 hover:text-purple-800 font-medium">
            View All Quests
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredQuests.map((quest) => (
            <QuestCard key={quest.id} quest={quest} />
          ))}
        </div>
      </section>

      {/* Trending Products Section */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Trending Products</h2>
          <Link to="/shop" className="text-purple-600 hover:text-purple-800 font-medium">
            View All Products
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose QuestMart</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We're not just another e-commerce platform. We're a shopping adventure.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-md p-6 flex">
            <div className="mr-4">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center">
                <Zap className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Gamified Shopping</h3>
              <p className="text-gray-600">
                Turn your shopping experience into a fun, interactive adventure with quests, challenges, and rewards.
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 flex">
            <div className="mr-4">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center">
                <Gift className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Exclusive Rewards</h3>
              <p className="text-gray-600">
                Unlock unique products and discounts that can only be accessed through gameplay.
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 flex">
            <div className="mr-4">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Social Interaction</h3>
              <p className="text-gray-600">
                Shop with friends, compete on leaderboards, and share your achievements on social media.
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 flex">
            <div className="mr-4">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center">
                <ShoppingBag className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Personalized Experience</h3>
              <p className="text-gray-600">
                Enjoy quests and product recommendations tailored to your interests and shopping behavior.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Your Shopping Adventure?</h2>
        <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
          Join thousands of shoppers who have transformed their shopping experience with QuestMart.
        </p>
        <Link 
          to="/quests" 
          className="px-8 py-3 bg-white text-purple-700 font-semibold rounded-full hover:bg-gray-100 transition duration-300 shadow-lg"
        >
          Start Your First Quest
        </Link>
      </section>
    </div>
  );
};

export default HomePage;