import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const stats = [
    { value: '12', label: 'Active Properties' },
    { value: '8', label: 'Active Listings' },
    { value: '5', label: 'New Inquiries' },
    { value: '$1,250', label: 'Avg. Rent' },
  ];

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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-5xl font-bold text-blue-400">{stat.value}</p>
              <p className="text-gray-400 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 