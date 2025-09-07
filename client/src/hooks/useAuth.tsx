


// import { log } from "console";
// import { useEffect, useState } from "react";

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

  
//   useEffect(() => {
//     const storedToken = localStorage.getItem("token");
//     const storedUser = localStorage.getItem("user");

//     if (storedToken && storedUser) {
//       try {
//         setUser(JSON.parse(storedUser));
//         setToken(storedToken);
//       } catch (error) {
//         console.error("Failed to parse user", error);
//       }
//     }

//     setIsLoading(false);
//   }, []);

//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setUser(null);
//     setToken(null);
//   };

//     const getAuthHeaders = () => {
//     if (!token) return {};
//     return {
//       Authorization: `Bearer ${token}`
//     };
//   };


//   return { user, token, isAuthenticated: !!token, logout, isLoading, getAuthHeaders };
// };










// // before adding shpowner based report
// import { useEffect, useState } from "react";

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
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const storedToken = localStorage.getItem("token");
//     const storedUser = localStorage.getItem("user");

//     if (storedToken) {
//       setToken(storedToken);
//       setIsAuthenticated(true);
//     }

//     if (storedUser && storedUser !== "undefined") {
//       try {
//         const parsedUser = JSON.parse(storedUser);
//         setUser(parsedUser);
//       } catch (error) {
//         console.error("Failed to parse user", error);
//         localStorage.removeItem("user"); // Remove invalid data
//       }
//     }

//     setIsLoading(false);
//   }, []);

//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setUser(null);
//     setToken(null);
//     setIsAuthenticated(false);
//   };

//   const getAuthHeaders = () => {
//     if (!token) return {};
//     return {
//       Authorization: `Bearer ${token}`
//     };
//   };

//   // Add a function to handle registration success
//   const handleRegisterSuccess = (userData: any, authToken: string) => {
//     setUser(userData);
//     setToken(authToken);
//     setIsAuthenticated(true);
    
//     // Store token and user data in localStorage
//     localStorage.setItem('token', authToken);
//     localStorage.setItem('user', JSON.stringify(userData));
//   };

//   return { 
//     user, 
//     token, 
//     isAuthenticated, 
//     logout, 
//     isLoading, 
//     getAuthHeaders,
//     handleRegisterSuccess
//   };
// };













// // for adding shpowner based report

import { log } from "console";
import { useEffect, useState } from "react";

// Updated User interface with shop information
interface User {
  id: string;
  name: string;
  email: string;
  shopId: number;        // Add shopId
  shopName: string;      // Add shopName
  // extend as needed
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    console.log('storedUser :',storedUser );
    

    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
    }

    if (storedUser && storedUser !== "undefined") {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Failed to parse user", error);
        localStorage.removeItem("user"); // Remove invalid data
      }
    }

    setIsLoading(false);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
  };

  const getAuthHeaders = () => {
    if (!token) return {};
    return {
      Authorization: `Bearer ${token}`
    };
  };

  // Add a function to handle registration success
  const handleRegisterSuccess = (userData: User, authToken: string) => {
    setUser(userData);
    setToken(authToken);
    setIsAuthenticated(true);
    
    // Store token and user data in localStorage
    localStorage.setItem('token', authToken);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // Add a function to handle login success
  const handleLoginSuccess = (userData: User, authToken: string) => {
    setUser(userData);
    setToken(authToken);
    setIsAuthenticated(true);
    
    // Store token and user data in localStorage
    localStorage.setItem('token', authToken);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // Helper function to get shopId
  const getShopId = (): number | null => {
    return user?.shopId || null;
  };

  // Helper function to get shopName
  const getShopName = (): string | null => {
    return user?.shopName || null;
  };

  return { 
    user, 
    token, 
    isAuthenticated, 
    logout, 
    isLoading, 
    getAuthHeaders,
    handleRegisterSuccess,
    handleLoginSuccess,
    getShopId,
    getShopName
  };
};