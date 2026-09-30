import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User, EmergencyAlert, NotificationItem } from '../types';
import { ApiClient } from '../services/api';

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  activeAlerts: EmergencyAlert[];
  notifications: NotificationItem[];
  unreadCount: number;
  login: (identifier: string, pass: string) => Promise<void>;
  adminClearanceLogin: (clearanceKey: string, identifier: string, pass: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  changePassword: (currentPass: string, newPass: string) => Promise<void>;
  logout: () => void;
  refreshAlerts: () => Promise<void>;
  refreshNotifications: () => Promise<void>;
  markNotificationRead: (id: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null;
    return ApiClient.getToken();
  });
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window === 'undefined') return null;
    try {
      const stored = sessionStorage.getItem('sentinelx_user') || localStorage.getItem('sentinelx_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeAlerts, setActiveAlerts] = useState<EmergencyAlert[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  const refreshAlerts = useCallback(async () => {
    try {
      if (token) {
        const res = await ApiClient.getActiveEmergencyAlerts();
        if (res.success) {
          setActiveAlerts(res.alerts);
        }
      }
    } catch (err) {
      // Benign if unauthorized or server reloading
    }
  }, [token]);

  const refreshNotifications = useCallback(async () => {
    try {
      if (token && user) {
        const res = await ApiClient.getNotifications();
        if (res.success) {
          setNotifications(res.notifications);
        }
      }
    } catch (err) {
      // Ignored
    }
  }, [token, user]);

  // Initial load: synchronize existing authenticated session if present
  useEffect(() => {
    const existingToken = ApiClient.getToken();
    if (existingToken && user) {
      ApiClient.setToken(existingToken);
      refreshAlerts();
      refreshNotifications();
    }
    setIsLoading(false);
  }, []);

  // Poll alerts & notifications periodically
  useEffect(() => {
    if (user && token) {
      refreshAlerts();
      refreshNotifications();

      const interval = setInterval(() => {
        refreshAlerts();
        refreshNotifications();
      }, 15000); // 15 seconds

      return () => clearInterval(interval);
    }
  }, [user, token, refreshAlerts, refreshNotifications]);

  const login = async (identifier: string, pass: string) => {
    setIsLoading(true);
    try {
      const res = await ApiClient.login(identifier, pass);
      if (res.success) {
        setUser(res.user);
        setToken(res.token);
        try {
          sessionStorage.setItem('sentinelx_user', JSON.stringify(res.user));
          localStorage.setItem('sentinelx_user', JSON.stringify(res.user));
        } catch {
          // ignore storage error
        }
        await refreshAlerts();
        await refreshNotifications();
      }
    } finally {
      setIsLoading(false);
    }
  };

  const adminClearanceLogin = async (clearanceKey: string, identifier: string, pass: string) => {
    setIsLoading(true);
    try {
      const res = await ApiClient.adminClearance({ clearanceKey, identifier, password: pass });
      if (res.success) {
        setUser(res.user);
        setToken(res.token);
        try {
          sessionStorage.setItem('sentinelx_user', JSON.stringify(res.user));
          localStorage.setItem('sentinelx_user', JSON.stringify(res.user));
        } catch {
          // ignore storage error
        }
        await refreshAlerts();
        await refreshNotifications();
      }
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: any) => {
    setIsLoading(true);
    try {
      const res = await ApiClient.register(data);
      if (res.success) {
        setUser(res.user);
        setToken(res.token);
        try {
          sessionStorage.setItem('sentinelx_user', JSON.stringify(res.user));
          localStorage.setItem('sentinelx_user', JSON.stringify(res.user));
        } catch {
          // ignore storage error
        }
        await refreshAlerts();
        await refreshNotifications();
      }
    } finally {
      setIsLoading(false);
    }
  };

  const changePassword = async (currentPass: string, newPass: string) => {
    setIsLoading(true);
    try {
      const res = await ApiClient.changePassword(currentPass, newPass);
      if (res.success) {
        setUser(res.user);
        setToken(res.token);
        try {
          sessionStorage.setItem('sentinelx_user', JSON.stringify(res.user));
          localStorage.setItem('sentinelx_user', JSON.stringify(res.user));
        } catch {
          // ignore storage error
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = useCallback(() => {
    ApiClient.clearToken();
    try {
      sessionStorage.removeItem('sentinelx_user');
      localStorage.removeItem('sentinelx_user');
    } catch {
      // ignore
    }
    setUser(null);
    setToken(null);
    setActiveAlerts([]);
    setNotifications([]);
  }, []);

  // Auto-logout when a 401 session expiration occurs
  useEffect(() => {
    const handleSessionExpired = () => {
      logout();
    };
    window.addEventListener('sentinelx_session_expired', handleSessionExpired);
    return () => window.removeEventListener('sentinelx_session_expired', handleSessionExpired);
  }, [logout]);

  const markNotificationRead = async (id: string) => {
    try {
      await ApiClient.markNotificationRead(id);
      setNotifications(prev =>
        prev.map(n => (n.id === id ? { ...n, isRead: true } : n))
      );
    } catch (err) {
      console.error('Failed to mark notification as read:', err);
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        activeAlerts,
        notifications,
        unreadCount,
        login,
        adminClearanceLogin,
        register,
        changePassword,
        logout,
        refreshAlerts,
        refreshNotifications,
        markNotificationRead
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
