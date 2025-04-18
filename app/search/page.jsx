"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import BarcodeScanner from "@/components/BarcodeScanner";

export default function SearchPage() {
  const [barcode, setBarcode] = useState("");
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");
  const [isScanning, setIsScanning] = useState(false);

  const handleSearch = async () => {
    setError("");
    setProduct(null);

    if (!barcode.trim()) {
      setError("Please enter a barcode.");
      return;
    }

    try {
      const response = await fetch(`/api/products?barcode=${barcode}`);
      if (!response.ok) throw new Error("Product not found");

      const data = await response.json();
      setProduct(data);
    } catch (err) {
      setError("Product not found. Please try another barcode.");
    }
  };

  const toggleScanner = () => {
    setIsScanning(!isScanning);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white pt-15">
      {/* Header */}
      <header className="pt-10 pb-6 px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-500">
            Chemical Food Checker
          </h1>
          <p className="mt-4 text-gray-300 text-lg max-w-2xl mx-auto">
            Scan products to discover their chemical content and find healthier alternatives
          </p>
        </motion.div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 pb-20">
        {/* Search Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="p-6 md:p-8">
            <h2 className="text-2xl font-semibold mb-6">Find Product Information</h2>
            
            {/* Search Options */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <button
                onClick={toggleScanner}
                className={`flex-1 py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-all ${
                  isScanning 
                    ? "bg-blue-600 text-white" 
                    : "bg-gray-700 text-gray-200 hover:bg-gray-600"
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M3 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm2 2V5h1v1H5z"/>
                  <path d="M13 4a1 1 0 00-1-1h-3a1 1 0 00-1 1v3a1 1 0 001 1h3a1 1 0 001-1V4zm-2 2V5h1v1h-1z"/>
                  <path d="M3 13a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3zm2 2v-1h1v1H5z"/>
                  <path d="M13 13a1 1 0 00-1-1h-3a1 1 0 00-1 1v3a1 1 0 001 1h3a1 1 0 001-1v-3zm-2 2v-1h1v1h-1z"/>
                  <path d="M4 8h12v1H4z"/>
                </svg>
                {isScanning ? "Cancel Scan" : "Scan Barcode"}
              </button>
              <span className="hidden md:flex items-center text-gray-500">or</span>
              <div className="flex-1 flex">
                <input
                  type="text"
                  placeholder="Enter barcode number"
                  value={barcode}
                  onChange={(e) => setBarcode(e.target.value)}
                  className="flex-1 bg-gray-700 border border-gray-600 rounded-l-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={handleSearch}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 md:px-6 rounded-r-lg transition-colors"
                >
                  Search
                </button>
              </div>
            </div>

            {/* Scanner */}
            {isScanning && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
                className="mb-4"
              >
                <div className="bg-gray-900 rounded-lg p-4 flex flex-col items-center">
                  <div className="w-full max-w-sm h-64 rounded-lg overflow-hidden border-2 border-blue-500 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <BarcodeScanner onScan={(code) => {
                        setBarcode(code);
                        setIsScanning(false);
                        // Automatically search after scanning
                        setTimeout(() => {
                          handleSearch();
                        }, 500);
                      }} />
                    </div>
                    <div className="absolute inset-0 border-4 border-blue-400 rounded-lg opacity-50 animate-pulse pointer-events-none"></div>
                  </div>
                  <p className="text-gray-300 mt-3 text-center">
                    Position barcode within the frame
                  </p>
                </div>
              </motion.div>
            )}

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="mt-4 p-3 bg-red-900/30 border border-red-500/50 rounded-lg text-red-300"
              >
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {error}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Product Results */}
        {product && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-8"
          >
            <div className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
              {/* Product Header */}
              <div className="relative">
                {product.image && (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
                  </div>
                )}
                <div className={`${product.image ? "absolute bottom-0 left-0 p-6 w-full" : "p-6"}`}>
                  <div className="flex items-center gap-3">
                    <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs font-medium">
                      {product.barcode}
                    </span>
                    {product.categories && product.categories.length > 0 && (
                      <span className="bg-blue-900/50 text-blue-300 px-2 py-1 rounded text-xs font-medium">
                        {product.categories[0]}
                      </span>
                    )}
                  </div>
                  <h2 className="text-3xl font-bold mt-2 text-white">{product.name}</h2>
                  <p className="text-gray-300 mt-1 max-w-2xl">{product.description}</p>
                </div>
              </div>

              {/* Product Body */}
              <div className="p-6">
                {/* Tabs */}
                <div className="border-b border-gray-700 mb-6">
                  <nav className="flex space-x-8">
                    <button className="border-b-2 border-blue-500 text-white pb-4 px-1 font-medium">
                      Chemical Analysis
                    </button>
                  </nav>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Ingredients */}
                  <div className="bg-gray-700/50 rounded-xl p-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                        <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                      </svg>
                      Ingredients
                    </h3>
                    {Array.isArray(product.ingredients) && product.ingredients.length > 0 ? (
                      <ul className="mt-3 space-y-1">
                        {product.ingredients.map((ing, index) => (
                          <li key={index} className="text-gray-300 flex items-start gap-2">
                            <span className="text-gray-500 mt-1">•</span>
                            {ing}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-400 mt-3">No ingredient data available.</p>
                    )}
                  </div>

                  {/* Harmful Chemicals */}
                  <div className="bg-gray-700/50 rounded-xl p-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      Harmful Chemicals
                    </h3>
                    {Array.isArray(product.harmful_ingredients) && product.harmful_ingredients.length > 0 ? (
                      <div className="mt-3 space-y-2">
                        {product.harmful_ingredients.map((chem, index) => {
                          const additivesMap = {
                            E322: { name: "Lecithins", riskLevel: "Moderate" },
                            E476: { name: "Polyglycerol polyricinoleate", riskLevel: "High" },
                            E621: { name: "Monosodium glutamate (MSG)", riskLevel: "High" },
                            E250: { name: "Sodium nitrite", riskLevel: "High" },
                            E211: { name: "Sodium benzoate", riskLevel: "Moderate" },
                          };

                          const chemData = additivesMap[chem] || { name: chem, riskLevel: "Unknown" };
                          const riskClasses = {
                            High: "bg-red-500/20 border-red-500/50 text-red-300",
                            Moderate: "bg-yellow-500/20 border-yellow-500/50 text-yellow-300",
                            Unknown: "bg-gray-500/20 border-gray-500/50 text-gray-300",
                          };

                          return (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.5, delay: index * 0.1 }}
                              className={`px-3 py-2 rounded border ${riskClasses[chemData.riskLevel]} flex justify-between items-center`}
                            >
                              <span>{chemData.name}</span>
                              <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                                chemData.riskLevel === "High" 
                                  ? "bg-red-900/50 text-red-300" 
                                  : chemData.riskLevel === "Moderate"
                                    ? "bg-yellow-900/50 text-yellow-300"
                                    : "bg-gray-900/50 text-gray-300"
                              }`}>
                                {chemData.riskLevel} risk
                              </span>
                            </motion.div>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="text-green-400 mt-3 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        No harmful chemicals detected
                      </p>
                    )}
                  </div>

                  {/* Allergens */}
                  <div className="bg-gray-700/50 rounded-xl p-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                      </svg>
                      Allergens
                    </h3>
                    {Array.isArray(product.allergens) && product.allergens.length > 0 ? (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {product.allergens.map((allergen, index) => (
                          <span key={index} className="px-3 py-1 bg-orange-500/20 border border-orange-500/50 text-orange-300 rounded-full text-sm">
                            {allergen}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-green-400 mt-3 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        No allergens detected
                      </p>
                    )}
                  </div>

                  {/* Nutrition Facts */}
                  <div className="bg-gray-700/50 rounded-xl p-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Nutrition Facts (per 100g)
                    </h3>
                    {product.nutrition ? (
                      <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Energy</span>
                          <span className="text-white font-medium">{product.nutrition.energy} kcal</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Fat</span>
                          <span className="text-white font-medium">{product.nutrition.fat}g</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Carbs</span>
                          <span className="text-white font-medium">{product.nutrition.carbohydrates}g</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Sugar</span>
                          <span className="text-white font-medium">{product.nutrition.sugar}g</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Protein</span>
                          <span className="text-white font-medium">{product.nutrition.proteins}g</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Salt</span>
                          <span className="text-white font-medium">{product.nutrition.salt}g</span>
                        </div>
                      </div>
                    ) : (
                      <p className="text-gray-400 mt-3">No nutrition data available.</p>
                    )}
                  </div>
                </div>

                {/* Categories */}
                {Array.isArray(product.categories) && product.categories.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-2">Categories</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.categories.map((category, index) => (
                        <span key={index} className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Alternatives */}
            {product.alternatives && product.alternatives.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mt-8"
              >
                <div className="mb-4 flex items-baseline justify-between">
                  <h2 className="text-2xl font-semibold text-white">Healthier Alternatives</h2>
                  <span className="text-blue-400 text-sm">Based on your product</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {product.alternatives.map((alt, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
                      className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group"
                    >
                      <div className="h-40 overflow-hidden">
                        <img
                          src={alt.image}
                          alt={alt.name}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-white truncate">{alt.name}</h3>
                        <p className="text-gray-400 text-sm mt-1 line-clamp-2">{alt.reason}</p>
                        <button className="mt-3 text-blue-400 text-sm flex items-center gap-1 hover:text-blue-300 transition-colors">
                          View details
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto py-6 text-center text-gray-500 text-sm">
        <div className="max-w-4xl mx-auto px-6">
          <p>© {new Date().getFullYear()} Chemical-Free Food Lookup. All rights reserved.</p>
          <div className="mt-2 flex justify-center gap-4">
            <a href="#" className="hover:text-gray-300 transition-colors">Privacy</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Terms</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}