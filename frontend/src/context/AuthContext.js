import React, { createContext, useState, useEffect } from 'react';
import { loginUser, googleLogin, registerUser } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const getUser = async () => { 
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      // If data has been stored by native login
      setUser(storedUser);
      //alert('set user:'+storedUser.token);
    } else {
      // Check if user session is active and return data
      try {
        const response = await fetch("http://localhost:5000/api/auth/login/success", {
          method: 'GET',
          credentials: 'include',
        });
        if (response.ok) {
          const data = await response.json();
         // alert(data.user);
          setUser(data.user);
        } else {
          console.log("Failed to fetch user data");
        }
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const login = async (email, password) => {
    const data = await loginUser({ email, password });
    setUser(data);
    localStorage.setItem('user', JSON.stringify(data));
    window.location.href = "http://localhost:3000/dashboard"; // Redirect after successful login
  };

  const signup = async (username, email, password) => {
    const data = await registerUser({ username, email, password });
    setUser(data);
    localStorage.setItem('user', JSON.stringify(data));
    window.location.href = "http://localhost:3000/dashboard"; // Redirect after successful signup
  };

  
  
  
  const googleAuth = async (googleData) => {
    const response = await fetch('http://localhost:5000/api/auth/google/', {
      method: 'GET',
      credentials: 'include', // This sends the session cookie
    });
    
    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token); // Save the JWT token
      setUser(data.user);
      window.location.href = "http://localhost:3000/dashboard";
    } else {
      console.log('Google login failed');
    }
  };
  

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    window.open("http://localhost:5000/api/auth/logout","_self");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, googleAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
