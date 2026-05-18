import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Welcome to SaaS Billing Portal
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Manage your subscriptions, track invoices, and monitor your usage all in one place.
            Simple, transparent, and powerful billing for your SaaS business.
          </p>
          <div className="flex gap-4 justify-center">
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition"
                >
                  Go to Dashboard
                </Link>
                <Link
                  to="/pricing"
                  className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-900 dark:text-white px-8 py-3 rounded-lg font-semibold transition"
                >
                  View Plans
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-900 dark:text-white px-8 py-3 rounded-lg font-semibold transition"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-3">💳</div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Multiple Plans
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Choose from Starter, Professional, or Enterprise plans tailored to your needs.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-3">📊</div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Real-Time Analytics
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Track your API usage, storage, and team activity with detailed insights.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-3">👥</div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Team Management
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Manage team members, set roles, and collaborate seamlessly.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-3">📄</div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Automated Invoicing
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Auto-generated invoices with PDF downloads for easy accounting.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-3">💰</div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Stripe Integration
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Secure payment processing with Stripe webhooks for reliable transactions.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-3">🌙</div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Dark Mode
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Comfortable viewing with automatic dark mode support throughout the app.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Ready to get started?
          </h2>
          <Link
            to={isAuthenticated ? "/dashboard" : "/register"}
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition text-lg"
          >
            {isAuthenticated ? "Go to Dashboard" : "Create an Account"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
