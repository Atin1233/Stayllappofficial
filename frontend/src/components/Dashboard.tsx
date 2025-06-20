import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { analyticsAPI } from '../services/api';

interface DashboardStats {
  activeProperties: number;
  activeListings: number;
  newInquiries: number;
  averageRent: number;
}

const Dashboard: React.FC = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await analyticsAPI.getDashboardSummary();
        if (response.data.success) {
          setStats(response.data.summary);
        } else {
          setError('Failed to fetch dashboard summary.');
        }
      } catch (err) {
        setError('An error occurred while fetching the summary.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  const formattedStats = stats ? [
    { value: stats.activeProperties, label: 'Active Properties' },
    { value: stats.activeListings, label: 'Active Listings' },
    { value: stats.newInquiries, label: 'New Inquiries' },
    { value: `$${Math.round(stats.averageRent).toLocaleString()}`, label: 'Avg. Rent' },
  ] : [];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-5xl font-bold">Stayll</h1>
        <h2 className="text-3xl font-light text-gray-300 mt-1">Welcome back, {user.firstName}!</h2>
        <p className="text-lg text-gray-400 mt-4 max-w-2xl">Here's a quick overview of your properties and listings.</p>
        <div className="mt-6 border-b border-gray-700 w-full max-w-xs" />
      </div>

      {/* Quick Actions */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Quick Actions</h2>
        <div className="flex items-center space-x-6">
          <Link to="/add-property" className="text-blue-400 hover:text-blue-300 text-xl transition-colors">
            + Add New Property
          </Link>
          <Link to="/properties" className="text-blue-400 hover:text-blue-300 text-xl transition-colors">
            Manage Properties
          </Link>
        </div>
      </div>

      {/* At a Glance */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">At a Glance</h2>
        {loading ? (
          <div className="flex justify-center items-center h-24">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
          </div>
        ) : error ? (
          <div className="text-red-500 bg-red-100 border border-red-400 p-4 rounded-lg">
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {formattedStats.map((stat) => (
              <div key={stat.label}>
                <p className="text-5xl font-bold text-blue-400">{stat.value}</p>
                <p className="text-gray-400 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard; 