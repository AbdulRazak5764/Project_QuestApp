import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Star, Gift } from 'lucide-react';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    salePrice?: number;
    rating: number;
    reviews: { id: string; rating: number; comment: string; date: string; }[];
    images: string[];
    category: string;
    isExclusive?: boolean;
    questCoinsPrice?: number;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden group">
      {/* Product Image */}
      <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden">
        <img 
          src={product.images[0]} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Sale Badge */}
        {product.salePrice && (
          <div className="absolute top-0 left-0 m-2">
            <span className="inline-block px-2 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded-full">
              {Math.round((1 - product.salePrice / product.price) * 100)}% OFF
            </span>
          </div>
        )}
        
        {/* Exclusive Badge */}
        {product.isExclusive && (
          <div className="absolute top-0 right-0 m-2">
            <span className="inline-block px-2 py-1 bg-purple-100 text-purple-800 text-xs font-semibold rounded-full">
              Exclusive
            </span>
          </div>
        )}
        
        {/* Quick Actions */}
        <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="flex space-x-2">
            <button className="p-2 bg-white rounded-full hover:bg-gray-100 transition duration-200">
              <ShoppingCart className="h-5 w-5 text-gray-700" />
            </button>
            <button className="p-2 bg-white rounded-full hover:bg-gray-100 transition duration-200">
              <Heart className="h-5 w-5 text-gray-700" />
            </button>
          </div>
        </div>
      </Link>
      
      <div className="p-4">
        {/* Category */}
        <div className="text-xs text-gray-500 mb-1">
          {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
        </div>
        
        {/* Product Name */}
        <Link to={`/product/${product.id}`}>
          <h3 className="text-lg font-medium text-gray-900 mb-1 hover:text-purple-700 transition duration-200">
            {product.name}
          </h3>
        </Link>
        
        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`h-4 w-4 ${i < product.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
              />
            ))}
          </div>
          <span className="ml-1 text-xs text-gray-500">({product.reviews.length})</span>
        </div>
        
        {/* Price */}
        <div className="flex items-center justify-between">
          <div>
            {product.salePrice ? (
              <div className="flex items-center">
                <span className="text-lg font-bold text-gray-900">${product.salePrice}</span>
                <span className="ml-1 text-sm text-gray-500 line-through">${product.price}</span>
              </div>
            ) : (
              <span className="text-lg font-bold text-gray-900">${product.price}</span>
            )}
            
            {/* QuestCoins Price */}
            {product.questCoinsPrice && (
              <div className="text-xs text-purple-700 flex items-center mt-1">
                <Gift className="h-3 w-3 mr-1" />
                Or {product.questCoinsPrice} QuestCoins
              </div>
            )}
          </div>
          
          <Link 
            to={`/product/${product.id}`}
            className="p-2 bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200 transition duration-200"
          >
            <ShoppingCart className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
