
import React, { createContext, useState, useContext, useEffect } from 'react';

export interface AuthContextType {
  user: any | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  signIn: async () => {},
  signOut: () => {},
  loading: true,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if the user is already logged in
    const savedUser = localStorage.getItem('st-eats-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    // Mock authentication for demo purposes
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data
      const userData = {
        id: '1',
        name: 'Demo User',
        email,
        role: 'user',
      };
      
      // Save to local storage
      localStorage.setItem('st-eats-user', JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => {
    // Remove user data from storage
    localStorage.removeItem('st-eats-user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
