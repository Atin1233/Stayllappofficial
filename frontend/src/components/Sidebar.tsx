import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  ChartBarIcon,
  HomeIcon,
  Squares2X2Icon,
  DocumentTextIcon,
  UserCircleIcon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline';

const Sidebar: React.FC = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login'; // Force reload to clear state
  };

  const navigation = [
    { name: 'Dashboard', href: '/', icon: HomeIcon },
    { name: 'Properties', href: '/properties', icon: Squares2X2Icon },
    { name: 'Listings', href: '/listings', icon: DocumentTextIcon },
    { name: 'Analytics', href: '/analytics', icon: ChartBarIcon },
    { name: 'Profile', href: '/profile', icon: UserCircleIcon },
  ];

  return (
    <div className="flex flex-col h-full w-28 shrink-0 items-center p-4">
      {/* Spacer to push nav down */}
      <div className="h-12 shrink-0" />

      {/* Navigation */}
      <nav className="flex-1 flex flex-col items-center space-y-4">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            end={item.href === '/'}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center p-3 rounded-lg transition-colors duration-200 w-24 h-24 ${
                isActive
                  ? 'text-blue-400'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`
            }
          >
            <item.icon className="h-8 w-8 mb-1" />
            <span className="text-xs font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer / User Area */}
      <div className="shrink-0">
        <div className="border-t border-gray-700 w-16 mx-auto mb-4" />
        <div className="text-center mb-4">
            <p className="text-xs font-semibold">{user.firstName} {user.lastName}</p>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex flex-col items-center justify-center p-3 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors duration-200 w-24 h-24"
        >
          <ArrowLeftOnRectangleIcon className="h-8 w-8 mb-1" />
          <span className="text-xs font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar; 