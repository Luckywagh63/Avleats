'use client';

import React, { useState } from 'react';

const activityMultipliers = {
  sedentary: 1.2,
  moderate: 1.55,
  active: 1.9,
};

export default function UserForm() {
  const [user, setUser] = useState({
    age: 25,
    weight: 70,
    height: 170,
    gender: 'male',
    activity: 'moderate',
    goal: 'maintain',
  });

  const [calories, setCalories] = useState(null);

  const calculateBMR = () => {
    const { age, weight, height, gender } = user;

    return gender === 'male'
      ? 10 * weight + 6.25 * height - 5 * age + 5
      : 10 * weight + 6.25 * height - 5 * age - 161;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const bmr = calculateBMR();
    const activityFactor = activityMultipliers[user.activity];
    let tdee = bmr * activityFactor;

    if (user.goal === 'lose') tdee -= 500;
    if (user.goal === 'gain') tdee += 500;

    setCalories(Math.round(tdee));
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">👤 Your Daily Nutrition Goal</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            placeholder="Age"
            value={user.age}
            onChange={(e) => setUser({ ...user, age: Number(e.target.value) })}
            className="p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Weight (kg)"
            value={user.weight}
            onChange={(e) => setUser({ ...user, weight: Number(e.target.value) })}
            className="p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Height (cm)"
            value={user.height}
            onChange={(e) => setUser({ ...user, height: Number(e.target.value) })}
            className="p-2 border rounded"
          />
          <select
            value={user.gender}
            onChange={(e) => setUser({ ...user, gender: e.target.value })}
            className="p-2 border rounded"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <select
          value={user.activity}
          onChange={(e) => setUser({ ...user, activity: e.target.value })}
          className="w-full p-2 border rounded"
        >
          <option value="sedentary">Sedentary (little/no exercise)</option>
          <option value="moderate">Moderate (3-5 days/week)</option>
          <option value="active">Active (6-7 days/week)</option>
        </select>

        <select
          value={user.goal}
          onChange={(e) => setUser({ ...user, goal: e.target.value })}
          className="w-full p-2 border rounded"
        >
          <option value="lose">Lose Weight</option>
          <option value="maintain">Maintain Weight</option>
          <option value="gain">Gain Weight</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Calculate My Goal
        </button>
      </form>

      {calories && (
        <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-600 text-blue-700 rounded">
          🎯 Your daily calorie goal is: <strong>{calories} kcal</strong>
        </div>
      )}
    </div>
  );
}
