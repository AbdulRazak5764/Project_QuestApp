import React, { useState } from 'react';
import { useShop } from '../contexts/ShopContext';
import ProductCard from '../components/ProductCard';
import { Filter, ShoppingBag, ChevronDown } from 'lucide-react';

const ShopPage = () => {
  const { products, categories } = useShop();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max;
    return matchesCategory && matchesSearch && matchesPrice;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    // Default: popular
    return b.popularity - a.popularity;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Shop</h1>
          <p className="text-gray-600 mt-2">Discover products and unlock exclusive deals with your QuestCoins.</p>
        </div>
        
        <div className="mt-4 md:mt-0 relative">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 w-full md:w-64"
          />
          <Filter className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters - Mobile Toggle */}
        <div className="lg:hidden mb-4">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="w-full flex items-center justify-between px-4 py-2 bg-white rounded-lg border border-gray-300"
          >
            <span className="font-medium">Filters</span>
            <ChevronDown className={`h-5 w-5 transition-transform ${showFilters ? 'transform rotate-180' : ''}`} />
          </button>
        </div>

        {/* Filters Sidebar */}
        <div className={`${showFilters ? 'block' : 'hidden'} lg:block lg:w-64 flex-shrink-0`}>
          <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
            <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
            <div className="space-y-2 mb-6">
              <button
                onClick={() => setActiveCategory('all')}
                className={`w-full text-left px-3 py-2 rounded-lg ${
                  activeCategory === 'all' 
                    ? 'bg-purple-100 text-purple-800' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                All Products
              </button>
              
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg ${
                    activeCategory === category.id 
                      ? 'bg-purple-100 text-purple-800' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            <h3 className="font-semibold text-gray-900 mb-4">Price Range</h3>
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">${priceRange.min}</span>
                <span className="text-sm text-gray-600">${priceRange.max}</span>
              </div>
              <input
                type="range"
                min="0"
                max="1000"
                step="10"
                value={priceRange.max}
                onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <h3 className="font-semibold text-gray-900 mb-4">Sort By</h3>
            <div className="space-y-2">
              {[
                { id: 'popular', label: 'Most Popular' },
                { id: 'newest', label: 'Newest First' },
                { id: 'price-low', label: 'Price: Low to High' },
                { id: 'price-high', label: 'Price: High to Low' },
              ].map((option) => (
                <button
                  key={option.id}
                  onClick={() => setSortBy(option.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg ${
                    sortBy === option.id 
                      ? 'bg-purple-100 text-purple-800' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          {sortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl">
              <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600">
                Try adjusting your filters or search for something else.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;