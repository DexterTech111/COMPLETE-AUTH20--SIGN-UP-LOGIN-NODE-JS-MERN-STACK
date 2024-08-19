import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import Dashboard from '../components/Dashboard';
import EditProfile from '../components/EditProfile';
import PrivateRoute from '../components/PrivateRoute';
import PageOne from '../components/PageOne'; // New Page
import PageTwo from '../components/PageTwo'; // New Page
import { AuthProvider } from '../context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
        <Route path="/*" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/edit-profile" element={<PrivateRoute><EditProfile /></PrivateRoute>} />
          <Route path="/page-one" element={<PrivateRoute><PageOne /></PrivateRoute>} /> {/* Protected Route */}
          <Route path="/page-two" element={<PrivateRoute><PageTwo /></PrivateRoute>} /> {/* Protected Route */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
