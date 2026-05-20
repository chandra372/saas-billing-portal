import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { BarChartComponent, PieChartComponent } from '../components/Charts';

const Dashboard = () => {
  const { user } = useAuth();
  const [subscriptionData] = useState({
    plan: 'Professional',
    status: 'active',
    renewalDate: '2026-06-17',
    price: '$99.00/month',
    features: ['100K API Calls', '100GB Storage', 'Priority Support', 'Team Members: 10']
  });

  const [usageData] = useState({
    apiCalls: { used: 65250, limit: 100000 },
    storage: { used: 45, limit: 100 },
    teamMembers: { used: 5, limit: 10 }
  });

  const [lastPayments] = useState([
    { date: '2026-05-17', amount: '$99.00', status: 'paid' },
    { date: '2026-04-17', amount: '$99.00', status: 'paid' },
    { date: '2026-03-17', amount: '$99.00', status: 'paid' }
  ]);

  const chartData = [
    { name: 'API Calls', value: Math.round((usageData.apiCalls.used / usageData.apiCalls.limit) * 100) },
    { name: 'Storage', value: Math.round((usageData.storage.used / usageData.storage.limit) * 100) },
    { name: 'Team', value: Math.round((usageData.teamMembers.used / usageData.teamMembers.limit) * 100) }
  ];

  const usageChartData = [
    { month: 'Mar', usage: 55 },
    { month: 'Apr', usage: 62 },
    { month: 'May', usage: 65 }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">Welcome back, {user?.email}!</p>

        {/* Subscription Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-semibold uppercase mb-2">Current Plan</h3>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">{subscriptionData.plan}</p>
            <p className="text-lg text-gray-700 dark:text-gray-300">{subscriptionData.price}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Status: <span className="text-green-600 dark:text-green-400 font-semibold">{subscriptionData.status.toUpperCase()}</span>
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-semibold uppercase mb-2">Next Renewal</h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{subscriptionData.renewalDate}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Auto-renewal enabled</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-semibold uppercase mb-2">Plan Features</h3>
            <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
              {subscriptionData.features.map((feature, idx) => (
                <li key={idx} className="flex items-center">
                  <span className="text-green-600 dark:text-green-400 mr-2">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Usage Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h4 className="text-gray-600 dark:text-gray-400 text-sm font-semibold mb-4">API Calls</h4>
            <div className="relative">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{width: `${(usageData.apiCalls.used / usageData.apiCalls.limit) * 100}%`}}
                ></div>
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              {usageData.apiCalls.used.toLocaleString()} / {usageData.apiCalls.limit.toLocaleString()}
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
              {Math.round((usageData.apiCalls.used / usageData.apiCalls.limit) * 100)}%
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h4 className="text-gray-600 dark:text-gray-400 text-sm font-semibold mb-4">Storage</h4>
            <div className="relative">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-green-600 h-2 rounded-full" 
                  style={{width: `${(usageData.storage.used / usageData.storage.limit) * 100}%`}}
                ></div>
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              {usageData.storage.used} GB / {usageData.storage.limit} GB
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
              {Math.round((usageData.storage.used / usageData.storage.limit) * 100)}%
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h4 className="text-gray-600 dark:text-gray-400 text-sm font-semibold mb-4">Team Members</h4>
            <div className="relative">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-purple-600 h-2 rounded-full" 
                  style={{width: `${(usageData.teamMembers.used / usageData.teamMembers.limit) * 100}%`}}
                ></div>
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              {usageData.teamMembers.used} / {usageData.teamMembers.limit}
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
              {Math.round((usageData.teamMembers.used / usageData.teamMembers.limit) * 100)}%
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h4 className="text-gray-600 dark:text-gray-400 text-sm font-semibold mb-4">Last Payment</h4>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{lastPayments[0].amount}</p>
            <p className="text-sm text-green-600 dark:text-green-400 font-semibold">{lastPayments[0].status.toUpperCase()}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{lastPayments[0].date}</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Usage Trends</h3>
            <BarChartComponent data={usageChartData} dataKey="usage" title="API Usage Over Time" />
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Resource Distribution</h3>
            <PieChartComponent data={chartData} title="Resource Usage %" />
          </div>
        </div>

        {/* Recent Payments */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Payment History</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-gray-700 dark:text-gray-300 font-semibold">Date</th>
                  <th className="px-6 py-3 text-left text-gray-700 dark:text-gray-300 font-semibold">Amount</th>
                  <th className="px-6 py-3 text-left text-gray-700 dark:text-gray-300 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {lastPayments.map((payment, idx) => (
                  <tr key={idx} className="border-b border-gray-200 dark:border-gray-600">
                    <td className="px-6 py-4 text-gray-800 dark:text-gray-200">{payment.date}</td>
                    <td className="px-6 py-4 text-gray-800 dark:text-gray-200 font-semibold">{payment.amount}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                        {payment.status.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
