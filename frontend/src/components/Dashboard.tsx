import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { analyticsAPI } from '../services/api';
import { 
  HomeIcon, 
  DocumentTextIcon, 
  UserGroupIcon, 
  CurrencyDollarIcon,
  PlusIcon,
  CogIcon,
  ArrowTrendingUpIcon,
  EyeIcon,
  HeartIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';

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

  const statCards = [
    {
      title: 'Active Properties',
      value: stats?.activeProperties || 0,
      icon: HomeIcon,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-500/10',
      textColor: 'text-blue-400',
      description: 'Total properties in your portfolio'
    },
    {
      title: 'Active Listings',
      value: stats?.activeListings || 0,
      icon: DocumentTextIcon,
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-500/10',
      textColor: 'text-emerald-400',
      description: 'Properties currently listed'
    },
    {
      title: 'New Inquiries',
      value: stats?.newInquiries || 0,
      icon: ChatBubbleLeftRightIcon,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-500/10',
      textColor: 'text-purple-400',
      description: 'Recent tenant inquiries'
    },
    {
      title: 'Average Rent',
      value: `$${Math.round((stats?.averageRent || 0)).toLocaleString()}`,
      icon: CurrencyDollarIcon,
      color: 'from-amber-500 to-amber-600',
      bgColor: 'bg-amber-500/10',
      textColor: 'text-amber-400',
      description: 'Monthly average per property'
    }
  ];

  const quickActions = [
    {
      title: 'Add New Property',
      description: 'Create a new property listing with detailed information',
      href: '/add-property',
      icon: PlusIcon,
      color: 'from-primary-500 to-primary-600',
      gradient: 'bg-gradient-to-br from-primary-500/20 to-primary-600/20'
    },
    {
      title: 'Manage Properties',
      description: 'View, edit, and organize your property portfolio',
      href: '/properties',
      icon: CogIcon,
      color: 'from-surface-500 to-surface-600',
      gradient: 'bg-gradient-to-br from-surface-500/20 to-surface-600/20'
    }
  ];

  const recentActivity = [
    { type: 'view', property: 'Sunset Apartments', time: '2 hours ago', icon: EyeIcon },
    { type: 'inquiry', property: 'Downtown Loft', time: '4 hours ago', icon: ChatBubbleLeftRightIcon },
    { type: 'favorite', property: 'Garden Villa', time: '1 day ago', icon: HeartIcon },
    { type: 'listing', property: 'Mountain View', time: '2 days ago', icon: DocumentTextIcon },
  ];

  return (
    <div className="max-w-screen-lg mx-auto w-full min-h-[80vh] flex flex-col space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="space-y-4 lg:space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-display">Welcome back, {user.firstName}!</h1>
            <p className="text-lg sm:text-xl text-surface-300 font-medium">Here's what's happening with your properties today.</p>
          </div>
          <div className="hidden lg:block">
            <div className="w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-primary-500 to-primary-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-primary-500/25">
              <span className="text-white font-bold text-2xl lg:text-3xl">S</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="space-y-4 lg:space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl sm:text-3xl font-semibold text-white font-display">At a Glance</h2>
          <div className="flex items-center space-x-2 text-surface-400">
            <ArrowTrendingUpIcon className="h-4 w-4 lg:h-5 lg:w-5" />
            <span className="text-sm font-medium">Last 30 days</span>
          </div>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="card p-4 lg:p-6 animate-pulse">
                <div className="h-10 lg:h-12 bg-surface-600 rounded-lg mb-4 lg:mb-6"></div>
                <div className="h-5 lg:h-6 bg-surface-600 rounded w-3/4 mb-2"></div>
                <div className="h-3 lg:h-4 bg-surface-600 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="card p-4 lg:p-6">
            <div className="flex items-center space-x-3 lg:space-x-4">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-destructive-500/20 rounded-2xl flex items-center justify-center">
                <span className="text-destructive-400 text-lg lg:text-xl">!</span>
              </div>
              <div>
                <p className="text-destructive-400 font-medium">{error}</p>
                <p className="text-surface-400 text-sm">Please try refreshing the page</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {statCards.map((stat) => (
              <div key={stat.title} className="card p-4 lg:p-6 group hover:scale-[1.02] transition-all duration-300">
                <div className="flex items-center justify-between mb-4 lg:mb-6">
                  <div className={`w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className="h-6 w-6 lg:h-8 lg:w-8 text-white" />
                  </div>
                  <div className={`w-10 h-10 lg:w-12 lg:h-12 ${stat.bgColor} rounded-2xl flex items-center justify-center`}>
                    <ArrowTrendingUpIcon className={`h-5 w-5 lg:h-6 lg:w-6 ${stat.textColor}`} />
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-2xl lg:text-4xl font-bold text-white font-display">{stat.value}</p>
                  <p className="text-base lg:text-lg font-semibold text-white">{stat.title}</p>
                  <p className="text-surface-400 text-xs lg:text-sm">{stat.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions & Recent Activity - Side by Side on larger screens */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
        {/* Quick Actions */}
        <div className="xl:col-span-2 space-y-4 lg:space-y-6">
          <h2 className="text-2xl sm:text-3xl font-semibold text-white font-display">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
            {quickActions.map((action) => (
              <Link
                key={action.title}
                to={action.href}
                className="card p-4 lg:p-6 group hover:scale-[1.02] transition-all duration-300"
              >
                <div className="flex items-center space-x-4 lg:space-x-6">
                  <div className={`w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br ${action.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <action.icon className="h-10 w-10 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white group-hover:text-primary-400 transition-colors duration-200 mb-2">
                      {action.title}
                    </h3>
                    <p className="text-surface-400 text-sm leading-relaxed">{action.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="space-y-6">
          <h2 className="text-3xl font-semibold text-white font-display">Recent Activity</h2>
          <div className="card p-6 space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 rounded-2xl bg-surface-700/30 hover:bg-surface-700/50 transition-colors duration-200">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500/20 to-primary-600/20 rounded-xl flex items-center justify-center">
                  <activity.icon className="h-5 w-5 text-primary-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{activity.property}</p>
                  <p className="text-xs text-surface-400">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 