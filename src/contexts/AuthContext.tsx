
import React, { createContext, useState, useContext, useEffect } from 'react';

export interface AuthContextType {
  user: any | null;
  profile: any | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  loading: boolean;
  isLoading: boolean;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  signIn: async () => {},
  signOut: () => {},
  loading: true,
  isLoading: true,
  refreshProfile: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if the user is already logged in
    const savedUser = localStorage.getItem('st-eats-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      // استرجاع بيانات الملف الشخصي
      fetchUserProfile(JSON.parse(savedUser).id);
    }
    setLoading(false);
    setIsLoading(false);
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      // محاكاة API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // بيانات وهمية للملف الشخصي
      const mockProfile = {
        id: userId,
        full_name: 'مستخدم تجريبي',
        username: 'demo_user',
        avatar_url: null,
        phone: '+9665xxxxxxxx',
        address: 'الرياض، المملكة العربية السعودية',
        wallet_balance: 500,
        user_type: 'customer',
      };
      
      setProfile(mockProfile);
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
    }
  };

  const refreshProfile = async () => {
    if (user) {
      await fetchUserProfile(user.id);
    }
  };

  const signIn = async (email: string, password: string) => {
    // Mock authentication for demo purposes
    setLoading(true);
    setIsLoading(true);
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
      
      // استرجاع بيانات الملف الشخصي
      await fetchUserProfile(userData.id);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setLoading(false);
      setIsLoading(false);
    }
  };

  const signOut = () => {
    // Remove user data from storage
    localStorage.removeItem('st-eats-user');
    setUser(null);
    setProfile(null);
  };

  return (
    <AuthContext.Provider value={{ user, profile, signIn, signOut, loading, isLoading, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
