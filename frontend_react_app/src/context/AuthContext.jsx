import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { authApi } from '../services/api';

// PUBLIC_INTERFACE
export const AuthContext = createContext(null);

// PUBLIC_INTERFACE
export function useAuth() {
  return useContext(AuthContext);
}

// PUBLIC_INTERFACE
export function AuthProvider({ children }) {
  const [user, setUser] = useState(authApi.getSession());
  const [loading, setLoading] = useState(false);

  const login = async (payload) => {
    setLoading(true);
    try {
      const u = await authApi.login(payload);
      setUser(u);
      return u;
    } finally {
      setLoading(false);
    }
  };

  const register = async (payload) => {
    setLoading(true);
    try {
      const u = await authApi.register(payload);
      setUser(u);
      return u;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await authApi.logout();
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const value = useMemo(() => ({ user, loading, login, register, logout }), [user, loading]);

  useEffect(() => {
    // could refresh token/session here
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
