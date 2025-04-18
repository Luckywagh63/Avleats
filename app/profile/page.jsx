"use client";
import React, { useState } from 'react';

export default function ProfilePage() {
  const [profile, setProfile] = useState({});
  
  const [form, setForm] = useState({
    age: 25,
    weight: 70,
    height: 170,
    gender: 'male',
    activity: 'moderate',
    goal: 'maintain',
  });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setProfile(form);
    // Navigation would be handled differently in a non-Next.js environment
    // For example, with React Router: navigate('/diet');
    window.location.href = '/diet';
  };
  
  return (
    <div className="min-h-screen bg-gray-500 py-12 px-4 sm:px-6 lg:px-8 pt-25">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-xl">
        <div className="p-8">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-blue-100 rounded-full p-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">Personal Profile</h1>
          <p className="text-gray-500 text-center mb-8">Tell us about yourself to get personalized diet recommendations</p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                <input
                  id="age"
                  type="number"
                  min="1"
                  max="120"
                  value={form.age}
                  onChange={(e) => setForm({ ...form, age: Number(e.target.value) })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
                  <input
                    id="weight"
                    type="number"
                    min="20"
                    max="300"
                    step="0.1"
                    value={form.weight}
                    onChange={(e) => setForm({ ...form, weight: Number(e.target.value) })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-1">Height (cm)</label>
                  <input
                    id="height"
                    type="number"
                    min="100"
                    max="250"
                    value={form.height}
                    onChange={(e) => setForm({ ...form, height: Number(e.target.value) })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                <div className="flex space-x-4">
                  <label className={`flex-1 flex items-center justify-center p-3 border rounded-lg cursor-pointer transition ${form.gender === 'male' ? 'bg-blue-50 border-blue-500 text-blue-700' : 'border-gray-300 text-gray-700'}`}>
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={form.gender === 'male'}
                      onChange={() => setForm({ ...form, gender: 'male' })}
                      className="sr-only"
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Male
                  </label>
                  <label className={`flex-1 flex items-center justify-center p-3 border rounded-lg cursor-pointer transition ${form.gender === 'female' ? 'bg-blue-50 border-blue-500 text-blue-700' : 'border-gray-300 text-gray-700'}`}>
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={form.gender === 'female'}
                      onChange={() => setForm({ ...form, gender: 'female' })}
                      className="sr-only"
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Female
                  </label>
                </div>
              </div>
              
              <div>
                <label htmlFor="activity" className="block text-sm font-medium text-gray-700 mb-1">Activity Level</label>
                <select
                  id="activity"
                  value={form.activity}
                  onChange={(e) => setForm({ ...form, activity: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition appearance-none bg-no-repeat bg-right"
                  style={{backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")", backgroundSize: "1.5em 1.5em", paddingRight: "2.5rem"}}
                >
                  <option value="sedentary">Sedentary (little or no exercise)</option>
                  <option value="moderate">Moderate (exercise 3-5 days/week)</option>
                  <option value="active">Active (exercise 6-7 days/week)</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="goal" className="block text-sm font-medium text-gray-700 mb-1">Your Goal</label>
                <div className="grid grid-cols-3 gap-2">
                  <label className={`flex flex-col items-center justify-center p-3 border rounded-lg cursor-pointer transition ${form.goal === 'lose' ? 'bg-blue-50 border-blue-500 text-blue-700' : 'border-gray-300 text-gray-700'}`}>
                    <input
                      type="radio"
                      name="goal"
                      value="lose"
                      checked={form.goal === 'lose'}
                      onChange={() => setForm({ ...form, goal: 'lose' })}
                      className="sr-only"
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                    Lose
                  </label>
                  <label className={`flex flex-col items-center justify-center p-3 border rounded-lg cursor-pointer transition ${form.goal === 'maintain' ? 'bg-blue-50 border-blue-500 text-blue-700' : 'border-gray-300 text-gray-700'}`}>
                    <input
                      type="radio"
                      name="goal"
                      value="maintain"
                      checked={form.goal === 'maintain'}
                      onChange={() => setForm({ ...form, goal: 'maintain' })}
                      className="sr-only"
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
                    </svg>
                    Maintain
                  </label>
                  <label className={`flex flex-col items-center justify-center p-3 border rounded-lg cursor-pointer transition ${form.goal === 'gain' ? 'bg-blue-50 border-blue-500 text-blue-700' : 'border-gray-300 text-gray-700'}`}>
                    <input
                      type="radio"
                      name="goal"
                      value="gain"
                      checked={form.goal === 'gain'}
                      onChange={() => setForm({ ...form, goal: 'gain' })}
                      className="sr-only"
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                    Gain
                  </label>
                </div>
              </div>
            </div>
            
            <div className="pt-4">
              <button
                type="submit"
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
              >
                Continue to Diet Plan
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}