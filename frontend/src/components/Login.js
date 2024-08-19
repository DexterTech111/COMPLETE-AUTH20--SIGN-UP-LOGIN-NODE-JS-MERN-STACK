import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, googleAuth } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5000/api/auth/google'; // Adjust the URL according to your server address
   // googleAuth();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded-lg"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded-lg"
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg">
          Login
        </button>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full mt-4 bg-red-500 text-white p-2 rounded-lg"
        >
          Login with Google
        </button>
      </form>
    </div>
  );
};

export default Login;
