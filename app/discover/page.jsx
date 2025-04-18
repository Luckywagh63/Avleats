'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function DiscoverPage() {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Track mouse position and scroll
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Custom cursor styling
  const cursorVariants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
    }
  };

  // Product data
  const products = [
    {
      name: 'Coke',
      img: './coke.jpeg',
      description: 'Phosphoric acid, caffeine, artificial sweeteners.',
      chemicals: 'Phosphoric acid, Caffeine, Aspartame, High-fructose corn syrup, Sodium benzoate.',
      type: 'beverage',
      healthIndex: 2,
      color: 'from-red-500 to-red-700'
    },
    {
      name: 'Cadbury',
      img: './cadbury.jpg',
      description: 'Cocoa, sugar, milk powder.',
      chemicals: 'Sugar, Milk powder, Cocoa mass, Cocoa butter, Emulsifiers.',
      type: 'chocolate',
      healthIndex: 4,
      color: 'from-purple-500 to-purple-700'
    },
    {
      name: 'Dairy Milk',
      img: './dairymilk.jpg',
      description: 'Cocoa mass, sugar, milk powder.',
      chemicals: 'Sugar, Milk powder, Cocoa mass, Cocoa butter, Emulsifiers.',
      type: 'chocolate',
      healthIndex: 4,
      color: 'from-blue-500 to-blue-700'
    },
    {
      name: 'Pepsi',
      img: './pepsi.jpg',
      description: 'Caffeine, phosphoric acid, sweeteners.',
      chemicals: 'Carbonated water, High-fructose corn syrup, Caffeine, Phosphoric acid, Caramel color.',
      type: 'beverage',
      healthIndex: 2,
      color: 'from-blue-600 to-blue-800'
    },
    {
      name: 'Lays',
      img: './lays.jpg',
      description: 'Potato, salt, vegetable oil.',
      chemicals: 'Potato, Sunflower oil, Salt, Artificial flavoring, Mono- and diglycerides.',
      type: 'snack',
      healthIndex: 3,
      color: 'from-yellow-500 to-yellow-700'
    },
    {
      name: 'Doritos',
      img: './doritos.jpeg',
      description: 'Corn, vegetable oil, cheese flavoring.',
      chemicals: 'Corn, Vegetable oil, Cheese powder, Salt, Artificial color (Yellow 6, Yellow 5).',
      type: 'snack',
      healthIndex: 2,
      color: 'from-orange-500 to-orange-700'
    },
    {
      name: 'Nestle',
      img: './nestle.jpg',
      description: 'Sugar, milk powder, cocoa.',
      chemicals: 'Sugar, Milk powder, Cocoa, Emulsifiers, Artificial flavoring.',
      type: 'chocolate',
      healthIndex: 3,
      color: 'from-blue-400 to-blue-600'
    },
    {
      name: 'Sprite',
      img: './sprite.jpg',
      description: 'Citric acid, sodium citrate, artificial sweeteners.',
      chemicals: 'Carbonated water, High-fructose corn syrup, Citric acid, Sodium citrate, Artificial flavoring.',
      type: 'beverage',
      healthIndex: 2,
      color: 'from-green-400 to-green-600'
    },
    {
      name: 'Red Bull',
      img: './redbull.jpg',
      description: 'Caffeine, taurine, sugar.',
      chemicals: 'Water, Sugar, Caffeine, Taurine, Glucuronolactone, B-vitamins.',
      type: 'beverage',
      healthIndex: 1,
      color: 'from-blue-500 to-blue-700'
    },
    {
      name: 'KitKat',
      img: './kitkat.jpg',
      description: 'Sugar, milk chocolate, cocoa.',
      chemicals: 'Sugar, Milk chocolate (Sugar, Cocoa mass, Cocoa butter, Milk powder), Whey powder, Emulsifiers.',
      type: 'chocolate',
      healthIndex: 3,
      color: 'from-red-600 to-red-800'
    },
  ];

  // Filter products based on type and search query
  const filteredProducts = products.filter(product => 
    (filterType === 'all' || product.type === filterType) && 
    (searchQuery === '' || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.chemicals.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  // Function to handle product details modal
  const openProductDetails = (product) => {
    setSelectedProduct(product);
  };

  // Parallax factor for background elements
  const parallaxFactor = scrollY * 0.5;

  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-black text-white relative overflow-hidden pb-20">
      {/* Custom cursor */}
      <motion.div
        className="w-8 h-8 border-2 border-white rounded-full fixed top-0 left-0 z-50 pointer-events-none mix-blend-difference"
        variants={cursorVariants}
        animate="default"
      />
      
      {/* Unique floating geometric background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight,
              rotate: Math.random() * 360,
              opacity: Math.random() * 0.3 + 0.1
            }}
            animate={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight,
              rotate: Math.random() * 360
            }}
            transition={{ 
              duration: 15 + Math.random() * 20, 
              repeat: Infinity, 
              repeatType: 'reverse' 
            }}
            style={{ y: (i % 2 === 0) ? parallaxFactor : -parallaxFactor }}
            className="absolute w-24 h-24 bg-gradient-to-br from-purple-600 to-transparent"
            style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
          />
        ))}
      </div>

      {/* Vertical navigation bar */}
      <motion.div 
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="fixed left-8 top-1/2 transform -translate-y-1/2 z-30"
      >
        <div className="flex flex-col items-center space-y-8">
          <Link href="/">
            <div className="w-3 h-3 bg-white rounded-full relative group">
              <span className="absolute left-6 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Home</span>
            </div>
          </Link>
          <Link href="/about">
            <div className="w-3 h-3 bg-white rounded-full relative group">
              <span className="absolute left-6 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">About</span>
            </div>
          </Link>
          <Link href="/discover">
            <div className="w-3 h-3 bg-white opacity-75 rounded-full relative group">
              <span className="absolute left-6 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Discover</span>
            </div>
          </Link>
          <Link href="/contact">
            <div className="w-3 h-3 bg-white rounded-full relative group">
              <span className="absolute left-6 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Contact</span>
            </div>
          </Link>
        </div>
      </motion.div>

      {/* Header Section with animated title */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-full pt-32 pb-12 z-10 relative"
      >
        <div className="container mx-auto px-8 text-center">
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-7xl font-bold mb-6">
              <span className="relative inline-block">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
                  Discover
                </span>
                <motion.span
                  className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                ></motion.span>
              </span>{' '}
              <span className="text-white">Our Products</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Explore and analyze the detailed composition of everyday food products and make informed choices for a healthier lifestyle.
            </p>
          </motion.div>
        </div>
      </motion.header>

      {/* Interactive Filter Bar */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full py-6 z-10 relative"
      >
        <div className="container mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <motion.button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gray-800 rounded-full text-white font-semibold flex items-center space-x-2"
              >
                <span>Filter Products</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`h-5 w-5 transition-transform duration-300 ${isFilterOpen ? 'rotate-180' : ''}`} 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </motion.button>
            </div>
            
            <div className="relative">
              <div className="flex items-center bg-gray-800 rounded-full pl-4 pr-2 py-2">
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border-none focus:outline-none text-white w-48 md:w-64"
                />
                <button className="ml-2 p-2 bg-gray-700 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          {/* Filter Options - slide down animation */}
          <motion.div 
            className="mt-4 bg-gray-900 rounded-xl p-6"
            initial={{ height: 0, opacity: 0 }}
            animate={{ 
              height: isFilterOpen ? 'auto' : 0,
              opacity: isFilterOpen ? 1 : 0
            }}
            transition={{ duration: 0.3 }}
            style={{ overflow: 'hidden' }}
          >
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {['all', 'beverage', 'chocolate', 'snack'].map((type) => (
                <motion.button
                  key={type}
                  onClick={() => setFilterType(type)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-3 rounded-full capitalize font-medium ${filterType === type ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white' : 'bg-gray-800 text-gray-300'}`}
                >
                  {type}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Products Grid Section with animations */}
      <section className="w-full py-12 z-10 relative">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group"
                onClick={() => openProductDetails(product)}
              >
                {/* Card with gradient border effect */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${product.color} rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300`}></div>
                <div className="relative bg-gray-900 rounded-xl overflow-hidden h-full">
                  {/* Chemical health index indicator */}
                  <div className="absolute top-4 right-4 z-10">
                    <div 
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                        product.healthIndex <= 2 ? 'bg-red-500' : 
                        product.healthIndex === 3 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                    >
                      {product.healthIndex}/5
                    </div>
                  </div>
                  
                  {/* Product image with hover zoom effect */}
                  <div className="h-48 overflow-hidden">
                    <img
                      src={product.img || "/api/placeholder/400/320"}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
                  </div>
                  
                  {/* Product content */}
                  <div className="p-6">
                    <h3 className={`text-2xl font-bold mb-2 bg-gradient-to-r ${product.color} bg-clip-text text-transparent`}>{product.name}</h3>
                    <p className="text-gray-300 mb-4">{product.description}</p>
                    
                    {/* Chemical list with custom styling */}
                    <div className="mt-4">
                      <h4 className="text-sm uppercase tracking-wider text-gray-400 mb-2">Chemical Composition</h4>
                      <p className="text-sm text-gray-300 line-clamp-2">{product.chemicals}</p>
                    </div>
                    
                    {/* View details button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`mt-6 w-full px-4 py-2 bg-gradient-to-r ${product.color} rounded-md text-white font-medium flex items-center justify-center space-x-2`}
                    >
                      <span>View Details</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-80"
          onClick={() => setSelectedProduct(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-3xl bg-gray-900 rounded-2xl overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 text-white"
            >
              ✕
            </button>
            
            <div className="flex flex-col md:flex-row">
              <div className="md:w-2/5">
                <div className="h-64 md:h-full">
                  <img
                    src={selectedProduct.img || "/api/placeholder/400/320"}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="md:w-3/5 p-8">
                <h2 className={`text-3xl font-bold bg-gradient-to-r ${selectedProduct.color} bg-clip-text text-transparent`}>
                  {selectedProduct.name}
                </h2>
                
                <div className="mt-6 space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Description</h3>
                    <p className="text-gray-300">{selectedProduct.description}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Chemical Composition</h3>
                    <p className="text-gray-300">{selectedProduct.chemicals}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Health Index</h3>
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((index) => (
                        <div 
                          key={index}
                          className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                            index <= selectedProduct.healthIndex ? 
                            `bg-gradient-to-r ${selectedProduct.color}` : 'bg-gray-700'
                          }`}
                        >
                          {index}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Healthier Alternatives</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {products
                        .filter(p => p.type === selectedProduct.type && p.healthIndex > selectedProduct.healthIndex)
                        .slice(0, 3)
                        .map((alt, idx) => (
                          <div key={idx} className="bg-gray-800 p-2 rounded text-center">
                            <p className="text-sm font-medium">{alt.name}</p>
                            <span className="text-xs text-gray-400">Index: {alt.healthIndex}/5</span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Footer */}
      <footer className="w-full bg-gradient-to-r from-gray-900 to-black py-8 z-10 relative mt-20">
        <div className="container mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-6 mb-4 md:mb-0">
              <Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
              <Link href="/about" className="text-gray-400 hover:text-white transition-colors">About</Link>
              <Link href="/discover" className="text-gray-400 hover:text-white transition-colors">Discover</Link>
              <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link>
            </div>
            
            <p className="text-gray-500">
              © {new Date().getFullYear()} Chemical-Free Food Lookup. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}