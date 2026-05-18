import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDarkMode } from '../context/DarkModeContext';
import { useAuth } from '../context/AuthContext';
import { Moon, Sun, LogOut } from 'lucide-react';

const Navbar = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 dark:bg-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-400 hover:text-blue-300">
          SaaS Billing Portal
        </Link>

        <ul className="flex items-center space-x-6">
          <li>
            <Link to="/" className="hover:text-blue-400 transition">
              Home
            </Link>
          </li>
          <li>
            <Link to="/pricing" className="hover:text-blue-400 transition">
              Pricing
            </Link>
          </li>
          {isAuthenticated && (
            <>
              <li>
                <Link to="/dashboard" className="hover:text-blue-400 transition">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/invoices" className="hover:text-blue-400 transition">
                  Invoices
                </Link>
              </li>
              <li>
                <Link to="/teams" className="hover:text-blue-400 transition">
                  Teams
                </Link>
              </li>
              <li>
                <Link to="/analytics" className="hover:text-blue-400 transition">
                  Analytics
                </Link>
              </li>
            </>
          )}
          <li>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </li>
          {isAuthenticated && (
            <li>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 px-3 py-2 rounded transition"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
