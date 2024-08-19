import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const PageOne = () => {
  const [profile, setProfile] = useState({});
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
      const fetchProfile = async () => {
        try {
         // alert(user.toString());
          const config = {
            headers: {
              Authorization: `Bearer ${storedUser.token}`,
            },
          };
          //alert(storedUser.token);
          const { data } = await axios.get('http://localhost:5000/api/auth/profile', config);
          setProfile(data);
        } catch (error) {
          console.error('Error fetching profile', error);
          // Optionally, you can handle token expiration or other errors here
          navigate('/login');
        }
      };

      fetchProfile();
    
  }, [user, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">User Profile</h2>
        <p><strong>Username:</strong> {profile.username}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        {profile.image && <img src={profile.image} alt="User profile" className="w-20 h-20 rounded-full mt-4" />}
      </div>
    </div>
  );
};

export default PageOne;
