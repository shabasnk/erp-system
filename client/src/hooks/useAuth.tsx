


import { log } from "console";
import { useEffect, useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  // extend as needed
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
        setToken(storedToken);
      } catch (error) {
        console.error("Failed to parse user", error);
      }
    }

    setIsLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);
  };

    const getAuthHeaders = () => {
    if (!token) return {};
    return {
      Authorization: `Bearer ${token}`
    };
  };


  return { user, token, isAuthenticated: !!token, logout, isLoading, getAuthHeaders };
};







// import { useState, useEffect, useCallback } from 'react';

// interface User {
//   id: string;
//   name: string;
//   email: string;
//   // extend as needed
// }

// export const useAuth = () => {
//   const [user, setUser] = useState<User | null>(null);
//   const [token, setToken] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // Synchronize auth state with localStorage
//   const syncAuthState = useCallback(() => {
//     try {
//       const storedToken = localStorage.getItem('token');
//       const storedUser = localStorage.getItem('user');

//       if (storedToken && storedUser) {
//         const parsedUser = JSON.parse(storedUser) as User;
//         setUser(parsedUser);
//         setToken(storedToken);
//         setError(null);
//       } else {
//         setUser(null);
//         setToken(null);
//       }
//     } catch (err) {
//       console.error('Failed to parse user data:', err);
//       setError('Failed to load user data');
//       logout();
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   // Initialize auth state on mount and set up storage listener
//   useEffect(() => {
//     syncAuthState();

//     const handleStorageChange = (e: StorageEvent) => {
//       if (e.key === 'token' || e.key === 'user') {
//         syncAuthState();
//       }
//     };

//     window.addEventListener('storage', handleStorageChange);
//     return () => window.removeEventListener('storage', handleStorageChange);
//   }, [syncAuthState]);

//   // Login function to be used by components
//   const login = useCallback(async (email: string, password: string) => {
//     setIsLoading(true);
//     setError(null);
    
//     try {
//       // Replace with your actual API call
//       const response = await fetch('http://localhost:8080/api/auth/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       if (!response.ok) {
//         throw new Error('Login failed');
//       }

//       const data = await response.json();
      
//       localStorage.setItem('token', data.token);
//       localStorage.setItem('user', JSON.stringify({
//         id: data.id,
//         name: data.name,
//         email: data.email
//       }));

//       syncAuthState();
//       return true;
//     } catch (err) {
//       console.error('Login error:', err);
//       setError(err instanceof Error ? err.message : 'Login failed');
//       return false;
//     } finally {
//       setIsLoading(false);
//     }
//   }, [syncAuthState]);

//   // Logout function
//   const logout = useCallback(() => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     setUser(null);
//     setToken(null);
//     setError(null);
//   }, []);

//   // Get authentication headers for API calls
//   const getAuthHeaders = useCallback(() => {
//     if (!token) return {};
//     return {
//       Authorization: `Bearer ${token}`,
//       'Content-Type': 'application/json',
//     };
//   }, [token]);

//   // Check if user is authenticated
//   const isAuthenticated = useCallback(() => {
//     return !!token;
//   }, [token]);

//   return {
//     user,
//     token,
//     isLoading,
//     error,
//     isAuthenticated: isAuthenticated(),
//     login,
//     logout,
//     getAuthHeaders,
//     syncAuthState,
//     setError,
//   };
// };

// export type AuthContextType = ReturnType<typeof useAuth>;