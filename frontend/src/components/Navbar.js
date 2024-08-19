import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between">
        <div>
          <Link to="/" className="font-bold">MERN Auth</Link>
        </div>
        <div>
          {user ? (
            <>
              <Link to="/dashboard" className="mr-4">Dashboard</Link>
              <Link to="/edit-profile" className="mr-4">Edit Profile</Link>
              <Link to="/page-one" className="mr-4">Page one</Link>
              <Link to="/page-two" className="mr-4">Page two</Link>
            </>
          ) : (
            <>
              <Link to="/login" className="mr-4">Login</Link>
              <Link to="/signup" className="mr-4">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
