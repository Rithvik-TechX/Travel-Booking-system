import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole } from '../types';
import { mockUsers } from '../data/mockData';

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  register: (name: string, email: string, password: string, role: UserRole) => boolean;
  registerAgent: (name: string, email: string, password: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS_KEY = 'travelease_users';
const SESSION_KEY = 'travelease_session';

const loadUsers = (): User[] => {
  try {
    const stored = localStorage.getItem(USERS_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error('Error loading users:', e);
  }
  // Initialize with mock users
  localStorage.setItem(USERS_KEY, JSON.stringify(mockUsers));
  return [...mockUsers];
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(loadUsers);
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const session = localStorage.getItem(SESSION_KEY);
      if (session) return JSON.parse(session);
    } catch (e) {
      console.error('Error loading session:', e);
    }
    return null;
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(SESSION_KEY);
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }, [users]);

  const login = (email: string, password: string): boolean => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      const { password: _, ...safeUser } = user;
      setCurrentUser(safeUser as User);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const register = (name: string, email: string, password: string, role: UserRole): boolean => {
    if (users.some(u => u.email === email)) {
      return false; // User already exists
    }
    
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      password,
      role,
    };
    
    setUsers(prev => [...prev, newUser]);
    
    const { password: _, ...safeUser } = newUser;
    setCurrentUser(safeUser as User);
    return true;
  };

  // Only an existing agent can create another agent account
  const registerAgent = (name: string, email: string, password: string): boolean => {
    if (!currentUser || currentUser.role !== 'agent') {
      return false; // Only agents can create agent accounts
    }
    if (users.some(u => u.email === email)) {
      return false; // Email already in use
    }

    const newAgent: User = {
      id: Date.now().toString(),
      name,
      email,
      password,
      role: 'agent',
    };

    setUsers(prev => [...prev, newAgent]);
    // Don't switch current session — stay logged in as the creating agent
    return true;
  };

  return (
    <AuthContext.Provider value={{ 
      currentUser, 
      isAuthenticated: !!currentUser,
      login,
      logout,
      register,
      registerAgent,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};