import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios, { setAuthToken } from '../api/axios';

// --- Types ---
interface Permission {
  label: string;
  module: string;
  description: string;
  action: string[];
}

interface Role {
  _id: string;
  name: string;
  isSystem: boolean;
  roleType: string;
  description: string;
  permissions: Permission[];
  createdAt: string;
  updatedAt: string;
}

export interface User {
  _id: string;
  email: string;
  mobile: string;
  name: string;
  role: Role;
  tier: number;
  type: string;
  createdAt: string;
  updatedAt: string;
}

interface AuthResponse {
  user: User;
  accessToken: string;
}

interface AuthContextType {
  user: User | null;
  login: (token: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

// --- Context ---
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// --- API ---
const fetchProfile = async (): Promise<AuthResponse> => {
  const res = await axios.get('/auth/profile');
  return res.data.data;
};

// --- Provider ---
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('accessToken');
    if (storedToken) {
      setAuthToken(storedToken);
      fetchProfile()
        .then((data) => {
          setUser(data.user);
          setAuthToken(data.accessToken);
        })
        .catch(() => {
          setUser(null);
          setAuthToken(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (authToken: string) => {
    try {
      setLoading(true);
      setAuthToken(authToken);
      const data = await fetchProfile();
      setUser(data.user);
      setAuthToken(data.accessToken); // refresh token if needed
    } catch (err) {
      logout();
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>{children}</AuthContext.Provider>
  );
};

// --- Hook ---
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
