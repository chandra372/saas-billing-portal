import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newTeam, setNewTeam] = useState({ name: '', description: '' });

  // Mock data for demonstration
  const mockTeams = [
    {
      _id: '1',
      name: 'Engineering Team',
      description: 'Core development team',
      members: [
        { user: 'user1', role: 'owner' },
        { user: 'user2', role: 'admin' },
        { user: 'user3', role: 'member' }
      ]
    },
    {
      _id: '2',
      name: 'Marketing Team',
      description: 'Marketing and growth initiatives',
      members: [
        { user: 'user4', role: 'owner' },
        { user: 'user5', role: 'member' }
      ]
    },
    {
      _id: '3',
      name: 'Product Team',
      description: 'Product management and design',
      members: [
        { user: 'user6', role: 'owner' }
      ]
    }
  ];

  useEffect(() => {
    const fetchTeams = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/teams', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTeams(response.data);
    } catch (err) {
      // Use mock data on error for demonstration
      console.log('Using mock team data');
      setTeams(mockTeams);
    } finally {
      setLoading(false);
    }

    fetchTeams();
  }, []);

  const handleCreateTeam = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/teams', newTeam, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNewTeam({ name: '', description: '' });
      setShowCreateForm(false);
      fetchTeams();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create team');
    }
  };

  if (loading) return <div className="text-center mt-8">Loading teams...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Teams</h1>
        <button onClick={() => setShowCreateForm(!showCreateForm)} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          {showCreateForm ? 'Cancel' : 'Create Team'}
        </button>
      </div>

      {error && <div className="text-red-600 mb-4">{error}</div>}

      {showCreateForm && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Create New Team</h3>
          <form onSubmit={handleCreateTeam}>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Team Name</label>
              <input
                type="text"
                value={newTeam.name}
                onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">Description</label>
              <textarea
                value={newTeam.description}
                onChange={(e) => setNewTeam({ ...newTeam, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              ></textarea>
            </div>
            <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Create
            </button>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.map((team) => (
          <div key={team._id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">{team.name}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{team.description || 'No description'}</p>
            <div className="mb-4">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Members: {team.members.length}
              </p>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">View Team</button>
          </div>
        ))}
      </div>

      {teams.length === 0 && !showCreateForm && <div className="text-center py-8 text-gray-600 dark:text-gray-400">No teams yet. Create one to get started!</div>}
    </div>
  );
};

export default Teams;
