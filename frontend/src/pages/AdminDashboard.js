import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);

  return (
    <div className="admin-dashboard-container">
      <h2>Admin Dashboard</h2>
      <p>Welcome, Admin {user?.email}!</p>

      <div className="admin-content">
        <section className="admin-stats">
          <h3>Statistics</h3>
          <div className="stats-grid">
            <div className="stat-card">
              <h4>Total Users</h4>
              <p className="stat-number">1,234</p>
            </div>
            <div className="stat-card">
              <h4>Active Subscriptions</h4>
              <p className="stat-number">892</p>
            </div>
            <div className="stat-card">
              <h4>Monthly Revenue</h4>
              <p className="stat-number">$45,320</p>
            </div>
            <div className="stat-card">
              <h4>Churn Rate</h4>
              <p className="stat-number">2.3%</p>
            </div>
          </div>
        </section>

        <section className="user-management">
          <h3>User Management</h3>
          <table className="users-table">
            <thead>
              <tr>
                <th>Email</th>
                <th>Plan</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* TODO: Populate with user data */}
              <tr>
                <td>user@example.com</td>
                <td>Premium</td>
                <td>Active</td>
                <td><button className="btn-sm">Edit</button></td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
