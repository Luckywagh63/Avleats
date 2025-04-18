'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import VoiceChatbot from '@/components/Chatbot';

export default function HomePage() {
  const router = useRouter();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  // Track mouse position for interactive elements
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
  
  // Parallax factor for background elements
  const parallaxFactor = scrollY * 0.5;

  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-black text-white relative overflow-hidden">
      {/* Custom cursor */}
      <motion.div
        className="w-8 h-8 border-2 border-white rounded-full fixed top-0 left-0 z-50 pointer-events-none mix-blend-difference"
        variants={cursorVariants}
        animate="default"
      />
      
      {/* Unique floating hexagon background */}
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
            style={{
              y: (i % 2 === 0) ? parallaxFactor : -parallaxFactor,
              clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"
            }}
            className="absolute w-24 h-24 bg-gradient-to-br from-purple-600 to-transparent"
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
            <div className="w-3 h-3 bg-white rounded-full relative group">
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

      {/* Asymmetric Header */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="relative w-full pt-32 pb-20 z-10"
      >
        <div className="container mx-auto px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="md:w-1/2 mb-10 md:mb-0"
            >
              <h1 className="text-7xl font-bold leading-tight">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">Chemical</span>
                <span className="block -mt-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Free Food</span>
                <span className="block -mt-2">Lookup</span>
              </h1>
              <p className="mt-6 text-xl text-gray-300 max-w-md">
                Discover what's in your food. Make informed choices and embrace a chemical-free lifestyle today.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="md:w-1/2 relative"
            >
              <div className="w-64 h-64 mx-auto relative">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-green-300 via-blue-500 to-purple-600 absolute animate-spin-slow" style={{ animationDuration: '20s' }}></div>
                <div className="w-48 h-48 rounded-full bg-black absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                  <span className="text-xl font-bold">100% Natural</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Features Section with Unique Layout */}
      <section className="w-full py-20 relative z-10">
        <div className="container mx-auto px-8">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-4xl font-bold text-center mb-16"
          >
            <span className="relative">
              Why Choose Chemical-Free?
              <motion.span 
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-blue-500"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.5, delay: 0.5 }}
              ></motion.span>
            </span>
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Health Benefits",
                description: "A healthier lifestyle starts with chemical-free food, promoting long-term well-being and vitality.",
                color: "from-green-400 to-green-600",
                delay: 0.3
              },
              {
                title: "Environmental Impact",
                description: "Reduce your carbon footprint by choosing sustainable and organic options that benefit the environment.",
                color: "from-blue-400 to-blue-600", 
                delay: 0.6
              },
              {
                title: "Better Taste",
                description: "Enjoy the natural and rich taste of food grown without harmful chemicals or additives.",
                color: "from-purple-400 to-purple-600",
                delay: 0.9
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: feature.delay }}
                className="bg-gray-900 rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300"
              >
                <div className={`h-2 bg-gradient-to-r ${feature.color}`}></div>
                <div className="p-8">
                  <div className="w-16 h-16 mb-6 rounded-full bg-gradient-to-br from-gray-800 to-gray-700 flex items-center justify-center">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${feature.color}`}></div>
                  </div>
                  <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Unconventional Search Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-full py-16 relative z-10"
      >
        <div className="container mx-auto px-8 text-center">
          <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="relative inline-block"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 rounded-full blur opacity-75"></div>
            <button
              onClick={() => router.push('/search')}
              className="relative px-10 py-6 bg-black text-white text-xl font-bold rounded-full z-10 overflow-hidden group"
            >
              <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-10"></span>
              <span className="relative z-20">Start Searching</span>
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Product Display with Interactive Elements */}
      <section className="w-full py-20 relat
      ive z-10">
        <div className="container mx-auto px-8">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-4xl font-bold text-center mb-20"
          >
            <span className="relative">
              Product Insights
              <motion.span 
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 to-pink-500"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.5, delay: 0.5 }}
              ></motion.span>
            </span>
          </motion.h2>
          
          <div className="space-y-24">
            {[
              {
                name: "Coke",
                image: "/coke.jpeg",
                chemicals: "Phosphoric acid, caffeine, artificial sweeteners",
                fats: "0g",
                sugar: "39g",
                carbs: "39g",
                color: "from-red-500 to-red-700"
              },
              {
                name: "Cadbury",
                image: "/cadbury.jpg",
                chemicals: "Cocoa, sugar, milk powder",
                fats: "12g",
                sugar: "22g",
                carbs: "28g", 
                color: "from-purple-500 to-purple-700"
              },
              {
                name: "Dairy Milk",
                image: "/dairymilk.jpg",
                chemicals: "Cocoa mass, sugar, milk powder",
                fats: "15g",
                sugar: "24g",
                carbs: "30g",
                color: "from-blue-500 to-blue-700"
              }
            ].map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                className="flex flex-col md:flex-row items-center md:items-stretch"
              >
                <div className={`md:w-2/5 ${index % 2 !== 0 ? 'md:order-2' : ''}`}>
                  <div className="relative group">
                    <div className={`absolute -inset-1 bg-gradient-to-r ${product.color} rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300`}></div>
                    <div className="relative bg-gray-900 rounded-xl overflow-hidden aspect-square">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                  </div>
                </div>
                
                <div className={`md:w-3/5 p-8 ${index % 2 !== 0 ? 'md:order-1 text-right' : 'text-left'}`}>
                  <h3 className={`text-4xl font-bold mb-6 bg-gradient-to-r ${product.color} bg-clip-text text-transparent`}>{product.name}</h3>
                  
                  <div className="space-y-6">
                    <div className="flex flex-col space-y-2">
                      <span className="text-gray-400">Chemicals Used</span>
                      <span className="text-xl">{product.chemicals}</span>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div className="p-4 bg-gray-900 rounded-lg">
                        <span className="block text-gray-400 text-sm">Fats</span>
                        <span className="text-2xl font-bold">{product.fats}</span>
                      </div>
                      <div className="p-4 bg-gray-900 rounded-lg">
                        <span className="block text-gray-400 text-sm">Sugar</span>
                        <span className="text-2xl font-bold">{product.sugar}</span>
                      </div>
                      <div className="p-4 bg-gray-900 rounded-lg">
                        <span className="block text-gray-400 text-sm">Carbs</span>
                        <span className="text-2xl font-bold">{product.carbs}</span>
                      </div>
                    </div>
                    
                   
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Unique Footer */}
      <footer className="w-full bg-gradient-to-r from-gray-900 to-black relative z-10 pt-16">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 pb-16">
            <div>
              <h3 className="text-2xl font-bold mb-6">Chemical-Free Food</h3>
              <p className="text-gray-400">
                Empowering you to make informed choices about the food you consume, for a healthier you and a healthier planet.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-6">Quick Links</h3>
              <ul className="space-y-3">
                <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
                <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About</Link></li>
                <li><Link href="/discover" className="text-gray-400 hover:text-white transition-colors">Discover</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-6">Newsletter</h3>
              <p className="text-gray-400 mb-4">Stay updated with our latest chemical-free findings.</p>
              <div className="flex">
                <input type="email" placeholder="Your email" className="bg-gray-800 text-white px-4 py-2 rounded-l-md w-full focus:outline-none" />
                <button className="bg-gradient-to-r from-green-400 to-blue-500 px-4 py-2 rounded-r-md text-white">Join</button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 py-8 text-center text-gray-500">
            <p>© {new Date().getFullYear()} Chemical-Free Food Lookup. All rights reserved.</p>
          </div>
        </div>
      </footer>
      < VoiceChatbot />
    </div>
  );
}