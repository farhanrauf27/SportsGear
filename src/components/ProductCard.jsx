import '../app/globals.css';
import { useState } from 'react';
import { FiX } from 'react-icons/fi';
const ProductCard = ({ product }) => {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const openQuickView = () => setIsQuickViewOpen(true);
  const closeQuickView = () => setIsQuickViewOpen(false);
    return (
      <div className="group relative bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300">
        {/* Badges */}
        <div className="absolute top-4 left-4 z-10 flex gap-2">
          {product.isNew && (
            <span className="bg-amber-400 text-amber-900 text-xs font-bold px-2 py-1 rounded-full">
              NEW
            </span>
          )}
          {product.rating > 4.5 && (
            <span className="bg-indigo-600 text-white text-xs font-bold px-2 py-1 rounded-full">
              TOP
            </span>
          )}
        </div>
  
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.picture}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Quick View Button */}
          <div className="group relative">
      {/* Your existing product card content */}
      <button 
        onClick={openQuickView}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white text-indigo-600 font-medium py-2 px-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg hover:bg-indigo-600 hover:text-white"
      >
        Quick View
      </button>

      {/* Quick View Modal */}
      {isQuickViewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="relative bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <button 
              onClick={closeQuickView}
              className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 z-10"
            >
              <FiX className="w-5 h-5" />
            </button>

            <div className="grid md:grid-cols-2 gap-8 p-6">
              {/* Product Image */}
              <div className="sticky top-0">
                <img
                  src={product.picture}
                  alt={product.name}
                  className="w-full h-auto rounded-lg object-cover"
                />
              </div>

              {/* Product Details */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h2>
                
                <div className="flex items-center mb-4">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${i < Math.floor(4) ? 'fill-current' : 'fill-none'}`}
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-gray-600 ml-2">{product.rating} ({50} reviews)</span>
                </div>

                <p className="text-3xl font-bold text-gray-900 mb-4">${product.price}</p>

                <p className="text-gray-700 mb-6">{product.description}</p>

                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-900">Details</h3>
                  <ul className="mt-2 text-gray-700 space-y-1">
                    <li>Category: {product.category}</li>
                    <li>Brand: {product.brand}</li>
                    <li>SKU: {product.subcategory}</li>
                    {product.sizes && (
                      <li>Available Sizes: {product.sizes.join(', ')}</li>
                    )}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors">
                    Add to Cart
                  </button>
                  <button className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors">
                    Add to Wishlist
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
        </div>
  
        {/* Product Info */}
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-gray-800">{product.name}</h3>
            <span className="font-bold text-indigo-600">${product.price}</span>
          </div>
          
          {/* Rating */}
          <div className="flex items-center mb-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-amber-400' : 'text-gray-300'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-1">({product.rating})</span>
          </div>
  
          <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition-colors duration-300 font-medium">
            Add to Cart
          </button>
        </div>
      </div>
    );
  };

  export default ProductCard;