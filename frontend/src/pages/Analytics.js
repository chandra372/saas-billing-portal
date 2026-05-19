import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChartComponent } from '../components/Charts';

const Analytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data for demonstration
    const mockAnalytics = {
      stats: {
        totalEvents: 1250,
        eventsByType: {
          api_call: 650,
          storage_used: 300,
          login: 200,
          export: 100
        },
        dailyEvents: {
          '2026-05-13': 150,
          '2026-05-14': 180,
          '2026-05-15': 220,
          '2026-05-16': 250,
          '2026-05-17': 280,
          '2026-05-18': 170
        }
      },
      events: [
        { _id: '1', eventType: 'api_call', metadata: { endpoint: '/api/users' }, timestamp: new Date() },
        { _id: '2', eventType: 'storage_used', metadata: { bytes: 1024000 }, timestamp: new Date() },
        { _id: '3', eventType: 'login', metadata: { ip: '192.168.1.1' }, timestamp: new Date() }
      ]
    };

    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem('token');
        // eslint-disable-next-line no-unused-vars
        const response = await axios.get('/api/analytics', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAnalytics(response.data);
      } catch (err) {
        // Use mock data on error for demonstration
        console.log('Using mock analytics data');
        setAnalytics(mockAnalytics);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) return <div className="text-center mt-8">Loading analytics...</div>;

  const dailyData = Object.entries(analytics?.stats?.dailyEvents || {}).map(([date, count]) => ({
    date,
    events: count,
  }));

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-gray-600 dark:text-gray-400 font-semibold mb-2">Total Events</h3>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{analytics?.stats?.totalEvents || 0}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-gray-600 dark:text-gray-400 font-semibold mb-2">Event Types</h3>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">{Object.keys(analytics?.stats?.eventsByType || {}).length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-gray-600 dark:text-gray-400 font-semibold mb-2">Recent Events</h3>
          <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{analytics?.events?.length || 0}</p>
        </div>
      </div>

      {dailyData.length > 0 && <LineChartComponent data={dailyData} dataKey="events" title="Daily Events" />}

      <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">Event Breakdown</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(analytics?.stats?.eventsByType || {}).map(([type, count]) => (
            <div key={type} className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg text-center">
              <p className="text-gray-600 dark:text-gray-400 font-semibold">{type}</p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{count}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
