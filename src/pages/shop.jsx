import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import '../app/globals.css';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

const ShopPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = [
    { id: 'all', name: 'All Gear' },
    { id: 'Sports', name: 'Sports' },
    { id: 'Clothing', name: 'Clothing' },
    // { id: 'soccer', name: 'Soccer' },
    // { id: 'fitness', name: 'Fitness' }
  ];
  const [sortOption, setSortOption] = useState('featured');

  // ... existing useEffect for fetching products ...

  // Sort products based on selected option
  const sortedAndFilteredProducts = products
    .filter(product => 
      (activeCategory === 'all' || product.category === activeCategory) &&
      (product.price >= priceRange[0] && product.price <= priceRange[1])
    )
    .sort((a, b) => {
      switch (sortOption) {
        case 'price-low-high':
          return a.price - b.price;
        case 'price-high-low':
          return b.price - a.price;
        case 'newest':
          // Assuming you have a createdAt field in your products
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'top-rated':
          return (b.rating || 0) - (a.rating || 0);
        case 'featured':
        default:
          // Default sorting (could be whatever makes sense for "featured")
          return (b.isFeatured || false) - (a.isFeatured || false) || 
                 (b.rating || 0) - (a.rating || 0);
      }
    });

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/products/view');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on selected category and price range
  const filteredProducts = products.filter(product => 
    (activeCategory === 'all' || product.category === activeCategory) &&
    (product.price >= priceRange[0] && product.price <= priceRange[1])
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <Navbar />
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <Navbar />
        <div className="flex justify-center items-center h-screen">
          <div className="text-red-500 text-lg">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-pattern.svg')]"></div>
        </div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            Premium <span className="text-amber-300">Sports Gear</span>
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto text-blue-100 animate-fade-in delay-100">
            Equipment engineered for peak performance
          </p>
        </div>
      </section>

      {/* Shop Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Filters */}
          <div className="mb-12 bg-white rounded-2xl shadow-lg p-6 animate-fade-in delay-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              {/* Category Filter */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Category</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === category.id 
                        ? 'bg-indigo-600 text-white shadow-md' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="flex-1 max-w-md">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Price Range</h3>
                <div className="flex items-center gap-4">
                  <input 
                    type="range" 
                    min="0" 
                    max="500" 
                    value={priceRange[1]} 
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-gray-700 font-medium">${priceRange[0]} - ${priceRange[1]}</span>
                </div>
              </div>

              {/* Sort Dropdown */}
              <div>
      <h3 className="text-sm font-medium text-gray-500 mb-2">Sort By</h3>
      <select 
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
        className="bg-gray-100 border-0 rounded-full px-4 py-2 text-gray-700 focus:ring-2 focus:ring-indigo-500"
      >
        <option value="featured">Featured</option>
        <option value="price-low-high">Price: Low to High</option>
        <option value="price-high-low">Price: High to Low</option>
        <option value="newest">Newest Arrivals</option>
        <option value="top-rated">Top Rated</option>
      </select>
    </div>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {sortedAndFilteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-700">No products found matching your criteria</h3>
              <p className="text-gray-500 mt-2">Try adjusting your filters</p>
            </div>
          )}

          {/* Pagination */}
          <div className="mt-16 flex justify-center">
            <nav className="flex items-center gap-2">
              <button className="w-10 h-10 flex items-center justify-center rounded-full bg-indigo-600 text-white">
                1
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-gray-700 hover:bg-gray-100">
                2
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-gray-700 hover:bg-gray-100">
                3
              </button>
              <span className="px-2">...</span>
              <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-gray-700 hover:bg-gray-100">
                8
              </button>
            </nav>
          </div>
        </div>
      </section>

      {/* Featured Brands */}
      <Footer/>
    </div>
  );
};

export default ShopPage;