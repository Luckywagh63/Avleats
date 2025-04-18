'use client';

import React, { createContext, useContext, useState } from 'react';

// Define default context
const ProfileContext = createContext({
  profile: null,
  setProfile: () => {},
});

// Custom hook to use context
export const useProfile = () => useContext(ProfileContext);

// Provider component
export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};
