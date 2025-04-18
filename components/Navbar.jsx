'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession, signOut } from 'next-auth/react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Discover', path: '/discover' },
    { name: 'Search', path: '/search' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  // Handle scroll event to change navbar style
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when path changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const authLinks = session ? [
    { name: 'Profile', path: '/profile' },
    { name: 'Sign Out', action: () => signOut() }
  ] : [
    { name: 'Login', path: '/login' }
  ];

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-black bg-opacity-80 backdrop-blur-md py-3' : 'bg-transparent py-6'
    }`}>
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-600"></div>
              <div className="ml-3">
                <h1 className="text-lg font-bold text-white">
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">Cleaneats</span>
                </h1>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <Link 
                key={index}
                href={link.path}
                className={`relative group ${pathname === link.path ? 'text-white' : 'text-gray-300'}`}
              >
                <span>{link.name}</span>
                <span 
                  className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-green-400 to-blue-500 transform origin-left transition-transform duration-300 ${
                    pathname === link.path ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                ></span>
              </Link>
            ))}
            
            {/* Authentication Links */}
            {authLinks.map((link, index) => (
              link.action ? (
                <button 
                  key={index}
                  onClick={link.action}
                  className="relative group text-gray-300 hover:text-white"
                >
                  <span>{link.name}</span>
                </button>
              ) : (
                <Link 
                  key={index}
                  href={link.path}
                  className={`relative group ${pathname === link.path ? 'text-white' : 'text-gray-300'}`}
                >
                  <span>{link.name}</span>
                </Link>
              )
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="w-10 h-10 flex flex-col justify-center items-center space-y-1.5 focus:outline-none"
              aria-label="Toggle menu"
            >
              <motion.span 
                animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                className="w-6 h-0.5 bg-white block transition-all duration-300"
              ></motion.span>
              <motion.span 
                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-6 h-0.5 bg-white block transition-all duration-300"
              ></motion.span>
              <motion.span 
                animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                className="w-6 h-0.5 bg-white block transition-all duration-300"
              ></motion.span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden"
          >
            <div className="container mx-auto px-4">
              <div className="bg-gray-900 bg-opacity-90 backdrop-blur-md mt-4 rounded-xl p-6">
                <nav className="flex flex-col space-y-4">
                  {/* Navigation Links */}
                  {navLinks.map((link, index) => (
                    <Link 
                      key={index}
                      href={link.path}
                      className={`py-2 px-4 rounded-lg transition-colors duration-300 ${
                        pathname === link.path 
                          ? 'bg-gradient-to-r from-green-400/20 to-blue-500/20 text-white' 
                          : 'text-gray-300 hover:bg-gray-800'
                      }`}
                    >
                      {link.name}
                    </Link>
                  ))}
                  
                  {/* Authentication Links */}
                  {authLinks.map((link, index) => (
                    link.action ? (
                      <button 
                        key={index}
                        onClick={link.action}
                        className="text-gray-300 hover:bg-gray-800 py-2 px-4 rounded-lg text-left transition-colors duration-300"
                      >
                        {link.name}
                      </button>
                    ) : (
                      <Link 
                        key={index}
                        href={link.path}
                        className={`py-2 px-4 rounded-lg transition-colors duration-300 ${
                          pathname === link.path 
                            ? 'bg-gradient-to-r from-green-400/20 to-blue-500/20 text-white' 
                            : 'text-gray-300 hover:bg-gray-800'
                        }`}
                      >
                        {link.name}
                      </Link>
                    )
                  ))}
                </nav>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;