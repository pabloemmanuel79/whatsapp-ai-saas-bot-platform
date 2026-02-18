import React, { createContext, useContext, useMemo, useReducer } from 'react';
import { loginRequest } from '@/api/auth';
import { LoginResponse, User } from '@/types';

interface AuthState {
  token: string | null;
  tenantId: string | null;
  user: User | null;
  loading: boolean;
  error: string | null;
}

type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: LoginResponse }
  | { type: 'LOGIN_ERROR'; payload: string }
  | { type: 'LOGOUT' };

const initialState: AuthState = {
  token: localStorage.getItem('token'),
  tenantId: localStorage.getItem('tenantId'),
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null,
  loading: false,
  error: null,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, loading: true, error: null };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        loading: false,
        token: action.payload.token,
        tenantId: action.payload.tenant.id,
        user: action.payload.user,
      };
    case 'LOGIN_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'LOGOUT':
      return { ...state, token: null, tenantId: null, user: null, error: null };
    default:
      return state;
  }
}

interface AuthContextValue extends AuthState {
  isAuthenticated: boolean;
  login: (payload: { email: string; password: string; tenantId: string }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = async (payload: { email: string; password: string; tenantId: string }) => {
    dispatch({ type: 'LOGIN_START' });
    try {
      const response = await loginRequest(payload);
      localStorage.setItem('token', response.token);
      localStorage.setItem('tenantId', response.tenant.id);
      localStorage.setItem('user', JSON.stringify(response.user));
      dispatch({ type: 'LOGIN_SUCCESS', payload: response });
    } catch (error) {
      dispatch({ type: 'LOGIN_ERROR', payload: error instanceof Error ? error.message : 'Login failed' });
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('tenantId');
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
  };

  const value = useMemo(
    () => ({
      ...state,
      isAuthenticated: Boolean(state.token && state.tenantId && state.user),
      login,
      logout,
    }),
    [state],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
}
