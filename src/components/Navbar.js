import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotificationBell from './NotificationBell';
import './Navbar.css';

const Navbar = ({ handleLogout }) => {
  const navigate = useNavigate();

  const notify = () => {
    toast.success('You have been logged out.', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <ul className="nav-links">
          <li>
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li>
            <Link to="/signup" className="nav-link">Sign Up</Link>
          </li>
          <li>
            <Link to="/login" className="nav-link">Login</Link>
          </li>
          <li>
            <Link to="/bills" className="nav-link">View Bills</Link>
          </li>
          <li>
            <Link to="/messages" className="nav-link">Messages</Link>
          </li>
          <li>
            <Link to="/announcements" className="nav-link">Announcements</Link>
          </li>
          <li>
            <Link to="/summary" className="nav-link">Bill Summary</Link> {/* Add the new nav link */}
          </li>
          <li>
            <Link to="/user-details" className="nav-link">User Details</Link>
          </li>
          <li>
            <button
              className="nav-link logout-button"
              onClick={() => {
                handleLogout();
                notify();
                navigate('/');
              }}
            >
              Logout
            </button>
          </li>
          <li>
            <NotificationBell loggedInUserEmail={localStorage.getItem('loggedInUserEmail')} />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
