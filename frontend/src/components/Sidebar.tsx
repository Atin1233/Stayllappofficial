import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  HomeIcon, 
  BuildingOfficeIcon, 
  ChartBarIcon, 
  UserIcon,
  ArrowRightOnRectangleIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
    { name: 'Properties', href: '/properties', icon: BuildingOfficeIcon },
    { name: 'Listings', href: '/listings', icon: DocumentTextIcon },
    { name: 'Analytics', href: '/analytics', icon: ChartBarIcon },
    { name: 'Profile', href: '/profile', icon: UserIcon },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <div className="w-80 bg-surface-800/50 backdrop-blur-xl border-r border-surface-700/50 flex flex-col">
      {/* Logo and Brand */}
      <div className="p-8 border-b border-surface-700/30">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-xl">S</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white font-display">Stayll</h1>
            <p className="text-surface-400 text-sm">Property Management</p>
          </div>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-6 border-b border-surface-700/30">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-500/20 to-primary-600/20 rounded-2xl flex items-center justify-center">
            <UserIcon className="h-6 w-6 text-primary-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-semibold truncate">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-surface-400 text-sm truncate">{user.email}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-6 space-y-2">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`group flex items-center space-x-4 px-4 py-3 rounded-2xl transition-all duration-200 ${
                isActive
                  ? 'bg-primary-500/10 border-l-4 border-primary-500 text-primary-400'
                  : 'text-surface-300 hover:bg-surface-700/30 hover:text-white'
              }`}
            >
              <item.icon className={`h-6 w-6 transition-colors duration-200 ${
                isActive ? 'text-primary-400' : 'text-surface-400 group-hover:text-white'
              }`} />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-6 border-t border-surface-700/30">
        <button
          onClick={handleLogout}
          className="w-full group flex items-center space-x-4 px-4 py-3 rounded-2xl text-surface-300 hover:bg-destructive-500/10 hover:text-destructive-400 transition-all duration-200"
        >
          <ArrowRightOnRectangleIcon className="h-6 w-6 text-surface-400 group-hover:text-destructive-400 transition-colors duration-200" />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar; 