import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiService, ApiUser } from '../services/api';

interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  role: 'customer' | 'vendor' | 'organizer';
  phone?: string;
  profile_image?: string;
}

interface AuthContextType {
  user: User | null;
  login: (userData: any) => void;
  loginWithCredentials: (credentials: { email: string; password: string }) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if user is logged in on app start
    const userData = localStorage.getItem('partyoria_user');
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        localStorage.removeItem('partyoria_user');
      }
    }
  }, []);

  // Legacy login method for backward compatibility
  const login = (userData: any) => {
    const user: User = {
      id: userData.id || Date.now(),
      username: userData.name || userData.username,
      email: userData.email,
      first_name: userData.first_name || userData.name?.split(' ')[0] || '',
      last_name: userData.last_name || userData.name?.split(' ').slice(1).join(' ') || '',
      role: userData.role as 'customer' | 'vendor' | 'organizer'
    };
    setUser(user);
    localStorage.setItem('partyoria_user', JSON.stringify(user));
  };

  const loginWithCredentials = async (credentials: { email: string; password: string }) => {
    setLoading(true);
    try {
      const response = await apiService.loginUser(credentials);
      const userData = response.user;
      setUser(userData);
      localStorage.setItem('partyoria_user', JSON.stringify(userData));
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: any) => {
    setLoading(true);
    try {
      const response = await apiService.registerUser(userData);
      const newUser = response.user;
      setUser(newUser);
      localStorage.setItem('partyoria_user', JSON.stringify(newUser));
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('partyoria_user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      loginWithCredentials,
      register,
      logout,
      isAuthenticated: !!user,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
};