// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { api } from '../api/api';

// interface AuthContextType {
//   user: any;
//   login: (username: string, password: string) => Promise<void>;
//   register: (username: string, password: string) => Promise<void>;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<any>(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);

//   const login = async (username: string, password: string) => {
//     const response = await api.post('/auth/login', { username, password });
//     setUser(response.data.user);
//     localStorage.setItem('user', JSON.stringify(response.data.user));
//   };

//   const register = async (username: string, password: string) => {
//     await api.post('/auth/register', { username, password });
//     await login(username, password);
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem('user');
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, register, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };
// 
// ...existing code...
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { setAuthToken } from '../api/api';

type AuthContextType = {
  token: string | null;
  user: any | null;
  setAuth: (data: any) => void;
  setUser: (user: any) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  token: null,
  user: null,
  setAuth: () => { },
  setUser: () => { },
  logout: () => { },
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setTokenState] = useState<string | null>(() => localStorage.getItem('token'));
  const [user, setUserState] = useState<any | null>(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      setAuthToken(token);
    } else {
      localStorage.removeItem('token');
      setAuthToken(null);
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const setAuth = (data: any) => {
    if (data) {
      if (data.token) setTokenState(data.token);
      if (data.user) setUserState(data.user);
      // Handle case where data itself might be just token or structure varies, 
      // assuming { token, user } based on usage.
    } else {
      setTokenState(null);
      setUserState(null);
    }
  };

  const setUser = (u: any) => setUserState(u);

  const logout = () => {
    setTokenState(null);
    setUserState(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, setAuth, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
// ...existing code...