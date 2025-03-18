import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useShop } from '../contexts/ShopContext';
import { ChevronRight } from 'lucide-react';

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const { getProductById } = useShop();

  // Get product by ID
  const product = getProductById(id || '');
  
  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
        <p className="text-gray-600 mb-8">The product you're looking for doesn't exist or has been removed.</p>
        <Link 
          to="/shop" 
          className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition duration-300"
        >
          Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <nav className="flex mb-8" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <Link to="/" className="text-sm text-gray-500 hover:text-gray-700">Home</Link>
          </li>
          <li>
            <div className="flex items-center">
              <ChevronRight className="h-4 w-4 text-gray-400" />
              <Link to="/shop" className="ml-1 text-sm text-gray-500 hover:text-gray-700">Shop</Link>
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <ChevronRight className="h-4 w-4 text-gray-400" />
              <Link to={`/shop?category=${product.category}`} className="ml-1 text-sm text-gray-500 hover:text-gray-700">
                {product.category.charAt(0).toUpperCase() + "I'll continue creating the QuestMart platform from where I left off."}
              </Link>
            </div>
          </li>
        </ol>
      </nav>
      {/* Rest of the ProductPage component */}
    </div>
  );
};

export default ProductPage;
