'use client';

import React, { useState, useMemo } from 'react';
import unpackedFoods from '../../lib/data/unpackedFoods';
import { useDiet, FoodItem } from '../../lib/data/diet';
import { useProfile } from '@/lib/context/ProfileContext';

// Activity multipliers for TDEE calculation
const activityMultipliers = {
  sedentary: 1.2,
  moderate: 1.55,
  active: 1.9,
};

// Calculate daily calories based on profile
function calculateCalories(profile) {
  const { age, weight, height, gender, activity, goal } = profile;
  let bmr =
    gender === 'male'
      ? 10 * weight + 6.25 * height - 5 * age + 5
      : 10 * weight + 6.25 * height - 5 * age - 161;
  let tdee = bmr * activityMultipliers[activity];
  if (goal === 'lose') tdee -= 500;
  if (goal === 'gain') tdee += 500;
  return Math.round(tdee);
}

// Calculate macronutrient targets based on calories
function calculateMacroTargets(calories) {
  return {
    protein: Math.round((calories * 0.3) / 4), // 30% of calories from protein (4 calories per gram)
    carbs: Math.round((calories * 0.45) / 4),  // 45% of calories from carbs (4 calories per gram)
    fat: Math.round((calories * 0.25) / 9),    // 25% of calories from fat (9 calories per gram)
    fiber: 30, // Standard recommendation
    sugar: 25  // Standard recommendation
  };
}

export default function DietPage() {
  const { diet, addFood, removeFood } = useDiet();
  const { profile } = useProfile();
  const [barcode, setBarcode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('unpacked'); // 'unpacked' or 'packed'
  const [searchTerm, setSearchTerm] = useState('');

  // Calculate daily calorie target based on profile
  const dailyCalories = profile ? calculateCalories(profile) : 2000; // Default to 2000 if no profile

  function mapProduct(prod) {
    return {
      name: prod.product_name || `Product ${prod.code}`,
      category: prod.categories || 'Packed Food',
      servingSize: prod.serving_size || '1 serving',
      nutrition: {
        calories: prod.nutriments['energy-kcal_100g'] || 0,
        protein: prod.nutriments['proteins_100g'] || 0,
        carbohydrates: prod.nutriments['carbohydrates_100g'] || 0,
        fat: prod.nutriments['fat_100g'] || 0,
        fiber: prod.nutriments['fiber_100g'] || 0,
        sugar: prod.nutriments['sugars_100g'] || 0,
        calcium: prod.nutriments['calcium_100g'] || 0,
        iron: prod.nutriments['iron_100g'] || 0,
        vitaminC: prod.nutriments['vitamin-c_100g'] || 0,
      },
    };
  }

  const handleBarcodeAdd = async () => {
    setError('');
    if (!barcode.trim()) return setError('Please enter a valid barcode');
    setLoading(true);
    try {
      const res = await fetch(`/api/products/product/${barcode.trim()}`);
      if (!res.ok) throw new Error('Not found');
      const prod = await res.json();
      addFood(mapProduct(prod));
      setBarcode('');
    } catch {
      setError('Packed food not found. Please try another barcode.');
    } finally {
      setLoading(false);
    }
  };

  // Compute total nutrition
  const totals = useMemo(() => {
    return diet.reduce(
      (acc, item) => {
        acc.calories += item.nutrition.calories || 0;
        acc.protein += item.nutrition.protein || 0;
        acc.carbs += item.nutrition.carbohydrates || 0;
        acc.fat += item.nutrition.fat || 0;
        acc.fiber += item.nutrition.fiber || 0;
        acc.sugar += item.nutrition.sugar || 0;
        return acc;
      },
      { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, sugar: 0 }
    );
  }, [diet]);

  // Calculate personalized targets based on profile
  const targets = useMemo(() => {
    return calculateMacroTargets(dailyCalories);
  }, [dailyCalories]);

  // Calculate percentages for progress bars
  const getPercentage = (value, target) => {
    if (!target) return 0;
    const percentage = (value / target) * 100;
    return Math.min(percentage, 100); // Cap at 100%
  };

  // Group and filter unpacked foods by category and search term
  const foodCategories = useMemo(() => {
    const categories = {};
    const filteredFoods = searchTerm 
      ? unpackedFoods.filter(food => 
          food.name.toLowerCase().includes(searchTerm.toLowerCase()))
      : unpackedFoods;
      
    filteredFoods.forEach(food => {
      const category = food.category || 'Uncategorized';
      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push(food);
    });
    return categories;
  }, [searchTerm]);

  // Calculate remaining calories
  const remainingCalories = dailyCalories - totals.calories;

  return (
    <main className="max-w-5xl mx-auto p-4 md:p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-center mb-8 pt-25">
        <h1 className="text-3xl font-bold text-center text-green-800">
          🍽️ Daily Diet Tracker
        </h1>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 ">
        {/* Left column: Add foods */}
        <div className="lg:col-span-2 space-y-6">
          {/* User Profile Summary */}
          {profile && (
            <div className="bg-white rounded-lg shadow-sm border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-medium">👋 Hi, {profile.name || 'there'}!</h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Your daily goal: {dailyCalories} calories 
                    ({profile.goal === 'lose' ? 'Weight loss' : 
                      profile.goal === 'gain' ? 'Weight gain' : 'Maintenance'})
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">
                    {remainingCalories > 0 ? remainingCalories : 0}
                  </div>
                  <div className="text-xs text-gray-500">calories remaining</div>
                </div>
              </div>
            </div>
          )}

          {/* Tab Navigation */}
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="flex border-b">
              <button
                onClick={() => setActiveTab('unpacked')}
                className={`flex-1 py-3 font-medium text-center transition ${
                  activeTab === 'unpacked'
                    ? 'bg-green-50 text-green-700 border-b-2 border-green-500'
                    : 'hover:bg-gray-50'
                }`}
              >
                🥦 Unpacked Foods
              </button>
              <button
                onClick={() => setActiveTab('packed')}
                className={`flex-1 py-3 font-medium text-center transition ${
                  activeTab === 'packed'
                    ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-500'
                    : 'hover:bg-gray-50'
                }`}
              >
                📦 Packed Foods
              </button>
            </div>

            <div className="p-4">
              {/* Unpacked Foods Tab */}
              {activeTab === 'unpacked' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl font-semibold">Common Foods</h2>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search foods..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="px-3 py-1 border rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                      />
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        🔍
                      </span>
                    </div>
                  </div>

                  {/* Accordion Categories */}
                  <div className="space-y-3">
                    {Object.keys(foodCategories).length > 0 ? (
                      Object.keys(foodCategories).map((category, index) => (
                        <details key={index} className="bg-white border rounded-lg" open={index === 0}>
                          <summary className="flex justify-between items-center p-3 font-medium cursor-pointer hover:bg-gray-50">
                            {category}
                            <span className="text-sm text-gray-500">
                              {foodCategories[category].length} items
                            </span>
                          </summary>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-3 pt-0">
                            {foodCategories[category].map((food, i) => (
                              <li
                                key={i}
                                className="p-3 bg-white border rounded-md hover:bg-gray-50 transition flex justify-between items-center"
                              >
                                <div>
                                  <div className="font-medium">{food.name}</div>
                                  <div className="text-xs text-gray-500 mt-1">
                                    {food.nutrition.calories} kcal · {food.servingSize}
                                  </div>
                                </div>
                                <button
                                  onClick={() => addFood(food)}
                                  className="px-3 py-1 text-sm bg-green-600 text-white rounded-full hover:bg-green-700 transition flex items-center"
                                >
                                  <span className="mr-1">+</span> Add
                                </button>
                              </li>
                            ))}
                          </ul>
                        </details>
                      ))
                    ) : (
                      <div className="text-center p-6 text-gray-500">
                        <p>No foods match your search. Try another term.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Packed Foods Tab */}
              {activeTab === 'packed' && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Scan Product Barcode</h2>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="relative flex-1">
                        <input
                          type="text"
                          placeholder="Enter barcode number"
                          className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          value={barcode}
                          onChange={(e) => setBarcode(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleBarcodeAdd()}
                        />
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                          🔢
                        </span>
                      </div>
                      <button
                        onClick={handleBarcodeAdd}
                        disabled={loading}
                        className={`px-4 py-3 rounded-lg text-white font-medium transition ${
                          loading
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                      >
                        {loading ? 'Searching...' : 'Add Product'}
                      </button>
                    </div>
                    {error && (
                      <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center">
                        <span className="mr-2">⚠️</span>
                        {error}
                      </div>
                    )}
                    <div className="p-3 bg-blue-50 border border-blue-200 text-blue-700 rounded-lg">
                      <p className="text-sm">
                        <strong>💡 Tip:</strong> Enter the 8-13 digit barcode from any packaged food product.
                        Our database supports most commercial products.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Today's Diet List */}
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="border-b p-4">
              <h2 className="text-xl font-semibold">
                🧾 Today's Diet <span className="text-sm text-gray-500 font-normal">({diet.length} items)</span>
              </h2>
            </div>
            
            {diet.length > 0 ? (
              <ul className="divide-y max-h-96 overflow-y-auto">
                {diet.map((food, i) => (
                  <li key={i} className="p-4 hover:bg-gray-50 transition relative">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <div className="font-medium">{food.name}</div>
                        <div className="text-sm text-gray-500">
                          {food.category} · {food.servingSize}
                        </div>
                        <div className="flex flex-wrap gap-2 mt-1">
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                            {food.nutrition.calories} kcal
                          </span>
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            {food.nutrition.protein}g protein
                          </span>
                          <span className="px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs">
                            {food.nutrition.carbohydrates}g carbs
                          </span>
                          <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                            {food.nutrition.fat}g fat
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFood(i)}
                        className="text-red-600 hover:bg-red-50 p-2 rounded-full"
                        aria-label="Remove item"
                      >
                        ✕
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-8 text-center text-gray-500">
                <p>No foods added yet. Start by adding some foods to track your nutrition.</p>
              </div>
            )}

            {diet.length > 0 && (
              <div className="p-4 border-t bg-gray-50">
                <button 
                  className="w-full py-2 text-sm text-center text-red-600 hover:bg-red-50 rounded border border-red-200"
                  onClick={() => {
                    if (confirm('Are you sure you want to clear all foods from today?')) {
                      // This would need a clearDiet function added to the diet context
                      diet.forEach((_, index) => removeFood(0));
                    }
                  }}
                >
                  Clear All Foods
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right column: Nutrition Summary */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden sticky top-4">
            <div className="border-b p-4">
              <h2 className="text-xl font-semibold">📊 Nutrition Summary</h2>
            </div>
            <div className="p-4">
              {diet.length > 0 ? (
                <div className="space-y-4">
                  {/* Calories with percentage */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium">Calories</span>
                      <div className="text-right">
                        <span className="text-gray-700">
                          {Math.round(totals.calories)} / {dailyCalories} kcal
                        </span>
                        <span className="text-xs text-gray-500 ml-1">
                          ({Math.round((totals.calories / dailyCalories) * 100)}%)
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className={`h-2.5 rounded-full ${
                          totals.calories > dailyCalories ? 'bg-red-500' : 'bg-green-600'
                        }`}
                        style={{ width: `${getPercentage(totals.calories, dailyCalories)}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Macronutrient breakdown */}
                  <div className="grid grid-cols-3 gap-2 py-2">
                    <div className="text-center">
                      <div className="text-xs text-gray-500">Protein</div>
                      <div className="text-lg font-semibold text-blue-600">
                        {Math.round((totals.protein / (totals.protein + totals.carbs + totals.fat)) * 100 || 0)}%
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-500">Carbs</div>
                      <div className="text-lg font-semibold text-amber-600">
                        {Math.round((totals.carbs / (totals.protein + totals.carbs + totals.fat)) * 100 || 0)}%
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-gray-500">Fat</div>
                      <div className="text-lg font-semibold text-red-600">
                        {Math.round((totals.fat / (totals.protein + totals.carbs + totals.fat)) * 100 || 0)}%
                      </div>
                    </div>
                  </div>

                  {/* Protein */}
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">Protein</span>
                      <span className="text-gray-700">
                        {totals.protein.toFixed(1)} / {targets.protein}g
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: `${getPercentage(totals.protein, targets.protein)}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Carbs */}
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">Carbohydrates</span>
                      <span className="text-gray-700">
                        {totals.carbs.toFixed(1)} / {targets.carbs}g
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-amber-500 h-2.5 rounded-full"
                        style={{ width: `${getPercentage(totals.carbs, targets.carbs)}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Fat */}
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">Fat</span>
                      <span className="text-gray-700">
                        {totals.fat.toFixed(1)} / {targets.fat}g
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-red-500 h-2.5 rounded-full"
                        style={{ width: `${getPercentage(totals.fat, targets.fat)}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Additional nutrients in expandable section */}
                  <details className="mt-4">
                    <summary className="cursor-pointer text-gray-700 hover:text-gray-900 flex items-center">
                      <span>Show more nutrients</span>
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </summary>
                    <div className="pt-3 space-y-3">
                      {/* Fiber */}
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="font-medium">Fiber</span>
                          <span className="text-gray-700">
                            {totals.fiber.toFixed(1)} / {targets.fiber}g
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-lime-500 h-2 rounded-full"
                            style={{ width: `${getPercentage(totals.fiber, targets.fiber)}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Sugar */}
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="font-medium">Sugar</span>
                          <span className="text-gray-700">
                            {totals.sugar.toFixed(1)} / {targets.sugar}g
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-purple-500 h-2 rounded-full"
                            style={{ width: `${getPercentage(totals.sugar, targets.sugar)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </details>
                </div>
              ) : (
                <div className="text-center p-6 text-gray-500">
                  <div className="text-4xl mb-3">🍽️</div>
                  <p>Add some foods to see your nutrition summary</p>
                </div>
              )}
            </div>
          </div>

          {/* Profile-based tips */}
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="border-b p-4">
              <h2 className="text-xl font-semibold">💡 Personalized Tips</h2>
            </div>
            <div className="p-4">
              <div className="space-y-3 text-sm">
                {profile && profile.goal === 'lose' && (
                  <>
                    <p className="flex items-start">
                      <span className="mr-2 text-green-500">✓</span>
                      Focus on high-protein foods to stay fuller longer
                    </p>
                    <p className="flex items-start">
                      <span className="mr-2 text-green-500">✓</span>
                      Include plenty of fiber-rich vegetables
                    </p>
                    <p className="flex items-start">
                      <span className="mr-2 text-green-500">✓</span>
                      Drink water before meals to help control portion sizes
                    </p>
                  </>
                )}
                {profile && profile.goal === 'gain' && (
                  <>
                    <p className="flex items-start">
                      <span className="mr-2 text-green-500">✓</span>
                      Include calorie-dense foods like nuts, avocados, and healthy oils
                    </p>
                    <p className="flex items-start">
                      <span className="mr-2 text-green-500">✓</span>
                      Eat more frequently throughout the day
                    </p>
                    <p className="flex items-start">
                      <span className="mr-2 text-green-500">✓</span>
                      Prioritize protein with each meal for muscle growth
                    </p>
                  </>
                )}
                {(!profile || profile.goal === 'maintain') && (
                  <>
                    <p className="flex items-start">
                      <span className="mr-2 text-green-500">✓</span>
                      Aim for a balanced diet with diverse food groups
                    </p>
                    <p className="flex items-start">
                      <span className="mr-2 text-green-500">✓</span>
                      Include at least 5 portions of fruits and vegetables daily
                    </p>
                    <p className="flex items-start">
                      <span className="mr-2 text-green-500">✓</span>
                      Stay hydrated by drinking plenty of water throughout the day
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Quick Add Predefined Meals */}
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="border-b p-4">
              <h2 className="text-xl font-semibold">⚡ Quick Add Meals</h2>
            </div>
            <div className="p-4">
              <ul className="space-y-2">
                <li className="p-2 rounded border hover:bg-gray-50 cursor-pointer transition flex justify-between items-center">
                  <div>
                    <div className="font-medium">Breakfast Bowl</div>
                    <div className="text-xs text-gray-500">450 kcal</div>
                  </div>
                  <button className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Add</button>
                </li>
                <li className="p-2 rounded border hover:bg-gray-50 cursor-pointer transition flex justify-between items-center">
                  <div>
                    <div className="font-medium">Protein Lunch</div>
                    <div className="text-xs text-gray-500">650 kcal</div>
                  </div>
                  <button className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Add</button>
                </li>
                <li className="p-2 rounded border hover:bg-gray-50 cursor-pointer transition flex justify-between items-center">
                  <div>
                    <div className="font-medium">Light Dinner</div>
                    <div className="text-xs text-gray-500">400 kcal</div>
                  </div>
                  <button className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Add</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}