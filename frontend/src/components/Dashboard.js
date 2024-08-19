import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const Dashboard = () => {
  const [user, setUserdata] = useState({});
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      // First attempt to fetch the user data
      const response = await axios.get("http://localhost:5000/api/auth/login/success", { withCredentials: true });

      if (response.data.message) {
        //alert(response.data.message);
      }

      setUserdata(response.data.user);

      const updatedUser = {
        ...response.data.user, // Existing user data with elements 'A' and 'B'
        token: response.data.token, // Add the token element
      };

      // Store the updated user object in localStorage
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
    } catch (error) {
      // If the first attempt fails, try fetching the profile using the JWT token
      console.error("First method failed, attempting second method:", error);
      try {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser && storedUser.token) {
          const config = {
            headers: {
              Authorization: `Bearer ${storedUser.token}`,
            },
          };
         // alert(storedUser.token);
          const { data } = await axios.get('http://localhost:5000/api/auth/profile', config);
          setUserdata(data);

          const updatedUser = {
            ...data, // Existing user data with elements 'A' and 'B'
            token: storedUser.token, // Preserve the token from localStorage
          };

          // Store the updated user object in localStorage
          localStorage.setItem('user', JSON.stringify(updatedUser));
        } else {
          throw new Error("No token found in localStorage");
        }
      } catch (secondError) {
        console.error("Error fetching profile with token:", secondError);
        navigate('/login');
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        {user.image && (
          <img
            src={user.image}
            alt="User profile"
            className="w-20 h-20 rounded-full mt-4"
          />
        )}
        <button
          onClick={handleLogout}
          className="w-full mt-4 bg-red-500 text-white p-2 rounded-lg"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
