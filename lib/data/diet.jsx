'use client';

import React, { createContext, useContext, useState } from 'react';

const DietContext = createContext(undefined);

export function DietProvider({ children }) {
  const [diet, setDiet] = useState([]);

  const addFood = (food) => {
    setDiet((prev) => [...prev, food]);
  };

  const removeFood = (idx) => {
    setDiet((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <DietContext.Provider value={{ diet, addFood, removeFood }}>
      {children}
    </DietContext.Provider>
  );
}

export function useDiet() {
  const ctx = useContext(DietContext);
  if (!ctx) throw new Error('useDiet must be used within a DietProvider');
  return ctx;
}
