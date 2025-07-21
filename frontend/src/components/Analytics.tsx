import React, { useState, useEffect } from 'react';
import { propertyAPI, listingAPI } from '../services/api';
import { 
  HomeIcon, 
  DocumentTextIcon, 
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  EyeIcon,
  HeartIcon,
  ChatBubbleLeftRightIcon,
  CalendarIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';

interface AnalyticsData {
  totalProperties: number;
  activeListings: number;
  totalRevenue: number;
  averageRent: number;
  propertyTypeDistribution: { type: string; count: number }[];
  revenueByMonth: { month: string; revenue: number }[];
  listingPerformance: Array<{
    id: string;
    title: string;
    views: number;
    inquiries: number;
    favorites: number;
    status: string;
  }>;
}

const Analytics: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [timeRange, setTimeRange] = useState('30');

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        setError('');
        
        // Fetch data from multiple endpoints
        const [propertiesResponse, listingsResponse] = await Promise.all([
          propertyAPI.getAll(),
          listingAPI.getAll()
        ]);

        // Calculate analytics from the actual data
        const properties = propertiesResponse.data.properties || [];
        const listings = listingsResponse.data.listings || [];
        
        // Calculate property type distribution
        const propertyTypes = properties.reduce((acc: any, property: any) => {
          acc[property.propertyType] = (acc[property.propertyType] || 0) + 1;
          return acc;
        }, {});

        const propertyTypeDistribution = Object.entries(propertyTypes).map(([type, count]) => ({
          type,
          count: count as number
        }));

        // Calculate revenue data (mock data for now)
        const totalRevenue = properties.reduce((sum: number, property: any) => sum + (property.rent || 0), 0);
        const averageRent = properties.length > 0 ? totalRevenue / properties.length : 0;

        // Mock revenue by month data
        const revenueByMonth = [
          { month: 'Jan', revenue: totalRevenue * 0.8 },
          { month: 'Feb', revenue: totalRevenue * 0.9 },
          { month: 'Mar', revenue: totalRevenue * 1.0 },
          { month: 'Apr', revenue: totalRevenue * 1.1 },
          { month: 'May', revenue: totalRevenue * 1.05 },
          { month: 'Jun', revenue: totalRevenue * 1.2 }
        ];

        // Mock listing performance data
        const listingPerformance = listings.map((listing: any) => ({
          id: listing.id,
          title: listing.propertyTitle || 'Property',
          views: Math.floor(Math.random() * 100) + 10,
          inquiries: Math.floor(Math.random() * 20) + 1,
          favorites: Math.floor(Math.random() * 15) + 1,
          status: ['active', 'pending', 'inactive'][Math.floor(Math.random() * 3)]
        }));

        const calculatedAnalytics: AnalyticsData = {
          totalProperties: properties.length,
          activeListings: listings.length,
          totalRevenue,
          averageRent,
          propertyTypeDistribution,
          revenueByMonth,
          listingPerformance
        };

        setAnalyticsData(calculatedAnalytics);
      } catch (err: any) {
        console.error('Analytics fetch error:', err);
        setError('Failed to load analytics data. Please try again.');
        
        // Set fallback data to prevent blank page
        setAnalyticsData({
          totalProperties: 0,
          activeListings: 0,
          totalRevenue: 0,
          averageRent: 0,
          propertyTypeDistribution: [],
          revenueByMonth: [],
          listingPerformance: []
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [timeRange]);

  const statCards = [
    {
      title: 'Total Properties',
      value: analyticsData?.totalProperties || 0,
      icon: HomeIcon,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-500/10',
      textColor: 'text-blue-400',
      description: 'Properties in your portfolio'
    },
    {
      title: 'Active Listings',
      value: analyticsData?.activeListings || 0,
      icon: DocumentTextIcon,
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-500/10',
      textColor: 'text-emerald-400',
      description: 'Currently listed properties'
    },
    {
      title: 'Total Revenue',
      value: `$${Math.round((analyticsData?.totalRevenue || 0)).toLocaleString()}`,
      icon: CurrencyDollarIcon,
      color: 'from-amber-500 to-amber-600',
      bgColor: 'bg-amber-500/10',
      textColor: 'text-amber-400',
      description: 'Revenue this period'
    },
    {
      title: 'Average Rent',
      value: `$${Math.round((analyticsData?.averageRent || 0)).toLocaleString()}`,
      icon: CurrencyDollarIcon,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-500/10',
      textColor: 'text-purple-400',
      description: 'Monthly average per property'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-emerald-500/20 text-emerald-400';
      case 'pending':
        return 'bg-amber-500/20 text-amber-400';
      case 'inactive':
        return 'bg-surface-500/20 text-surface-400';
      default:
        return 'bg-surface-500/20 text-surface-400';
    }
  };

  return (
    <div className="max-w-screen-lg mx-auto w-full min-h-[80vh] flex flex-col space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold text-white font-display">Analytics Dashboard</h1>
          <p className="text-base lg:text-lg text-surface-300">Track your property performance and insights</p>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
          <div className="flex items-center space-x-2">
            <CalendarIcon className="h-4 w-4 text-surface-400" />
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-3 py-2 sm:px-4 sm:py-2 bg-surface-700/50 border border-surface-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
            >
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
              <option value="365">Last year</option>
            </select>
          </div>
          <button className="inline-flex items-center px-3 py-2 sm:px-4 sm:py-2 bg-surface-700/50 border border-surface-600/50 text-white rounded-lg hover:bg-surface-600/50 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors duration-200 text-sm">
            <FunnelIcon className="h-4 w-4 mr-2" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="card p-4 lg:p-6">
          <div className="flex items-center space-x-3 lg:space-x-4">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-destructive-500/20 rounded-2xl flex items-center justify-center">
              <span className="text-destructive-400 text-lg lg:text-xl">!</span>
            </div>
            <div>
              <p className="text-destructive-400 font-medium">{error}</p>
              <p className="text-surface-400 text-sm">Some data may be unavailable</p>
            </div>
          </div>
        </div>
      )}

      {/* Stats Overview */}
      <div className="space-y-4 lg:space-y-6">
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

      {/* Property Type Distribution & Revenue Overview - Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Property Type Distribution - Donut Chart */}
        <div className="card p-4 lg:p-6">
          <h2 className="text-xl lg:text-2xl font-semibold text-white mb-4 lg:mb-6">Property Type Distribution</h2>
          <div className="flex items-center justify-center">
            {analyticsData?.propertyTypeDistribution && analyticsData.propertyTypeDistribution.length > 0 ? (
              <div className="relative w-48 h-48 lg:w-64 lg:h-64">
                {/* Donut Chart */}
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  {analyticsData.propertyTypeDistribution.map((type, index) => {
                    const total = analyticsData.propertyTypeDistribution.reduce((sum, t) => sum + t.count, 0);
                    const percentage = (type.count / total) * 100;
                    const circumference = 2 * Math.PI * 35; // radius = 35
                    const strokeDasharray = (percentage / 100) * circumference;
                    const strokeDashoffset = index === 0 ? 0 : 
                      analyticsData.propertyTypeDistribution
                        .slice(0, index)
                        .reduce((sum, t) => sum + ((t.count / total) * circumference), 0);
                    
                    const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
                    
                    return (
                      <circle
                        key={type.type}
                        cx="50"
                        cy="50"
                        r="35"
                        fill="none"
                        stroke={colors[index % colors.length]}
                        strokeWidth="8"
                        strokeDasharray={strokeDasharray}
                        strokeDashoffset={strokeDashoffset}
                        className="transition-all duration-500"
                      />
                    );
                  })}
                </svg>
                
                {/* Center Text */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">{analyticsData.totalProperties}</p>
                    <p className="text-surface-400 text-sm">Total</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-surface-600/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <HomeIcon className="h-8 w-8 text-surface-400" />
                </div>
                <p className="text-surface-400">No properties yet</p>
              </div>
            )}
          </div>
          
          {/* Legend */}
          {analyticsData?.propertyTypeDistribution && analyticsData.propertyTypeDistribution.length > 0 && (
            <div className="mt-6 space-y-2">
              {analyticsData.propertyTypeDistribution.map((type, index) => {
                const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
                const percentage = Math.round((type.count / (analyticsData?.totalProperties || 1)) * 100);
                
                return (
                  <div key={type.type} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: colors[index % colors.length] }}
                      ></div>
                      <span className="text-white font-medium capitalize">{type.type}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-white font-semibold">{type.count}</span>
                      <span className="text-surface-400 text-sm ml-1">({percentage}%)</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Revenue Overview - Bar Chart */}
        <div className="card p-4 lg:p-6">
          <h2 className="text-xl lg:text-2xl font-semibold text-white mb-4 lg:mb-6">Revenue Overview</h2>
          <div className="h-64 flex items-end justify-between space-x-2">
            {analyticsData?.revenueByMonth && analyticsData.revenueByMonth.length > 0 ? (
              analyticsData.revenueByMonth.slice(-6).map((month) => {
                const maxRevenue = Math.max(...analyticsData.revenueByMonth.map(m => m.revenue));
                const height = (month.revenue / maxRevenue) * 100;
                
                return (
                  <div key={month.month} className="flex-1 flex flex-col items-center space-y-2">
                    <div className="relative w-full">
                      <div 
                        className="w-full bg-gradient-to-t from-amber-500 to-amber-600 rounded-t-lg transition-all duration-500 hover:from-amber-400 hover:to-amber-500"
                        style={{ height: `${height}%` }}
                      ></div>
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-center">
                        <p className="text-white text-xs font-medium">${month.revenue.toLocaleString()}</p>
                      </div>
                    </div>
                    <p className="text-surface-400 text-xs font-medium">{month.month}</p>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-8 w-full">
                <div className="w-16 h-16 bg-surface-600/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <CurrencyDollarIcon className="h-8 w-8 text-surface-400" />
                </div>
                <p className="text-surface-400">No revenue data available</p>
              </div>
            )}
          </div>
          
          {/* Chart Summary */}
          {analyticsData?.revenueByMonth && analyticsData.revenueByMonth.length > 0 && (
            <div className="mt-6 p-4 bg-surface-700/30 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-surface-400 text-sm">Total Revenue</p>
                  <p className="text-white font-semibold">
                    ${analyticsData.revenueByMonth.reduce((sum, month) => sum + month.revenue, 0).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-surface-400 text-sm">Average Monthly</p>
                  <p className="text-white font-semibold">
                    ${Math.round(analyticsData.revenueByMonth.reduce((sum, month) => sum + month.revenue, 0) / analyticsData.revenueByMonth.length).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Listing Performance Table */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-white">Listing Performance</h2>
          <div className="flex items-center space-x-2 text-surface-400">
            <EyeIcon className="h-4 w-4" />
            <span className="text-sm">Performance metrics</span>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-surface-600/30">
                <th className="text-left py-4 px-4 text-surface-400 font-medium">Property</th>
                <th className="text-center py-4 px-4 text-surface-400 font-medium">Views</th>
                <th className="text-center py-4 px-4 text-surface-400 font-medium">Inquiries</th>
                <th className="text-center py-4 px-4 text-surface-400 font-medium">Favorites</th>
                <th className="text-center py-4 px-4 text-surface-400 font-medium">Status</th>
                <th className="text-center py-4 px-4 text-surface-400 font-medium">Performance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-600/30">
              {analyticsData?.listingPerformance && analyticsData.listingPerformance.length > 0 ? (
                analyticsData.listingPerformance.map((listing) => (
                  <tr key={listing.id} className="hover:bg-surface-700/30 transition-colors duration-200">
                    <td className="py-4 px-4">
                      <div>
                        <p className="text-white font-medium">{listing.title}</p>
                        <p className="text-surface-400 text-sm">Property ID: {listing.id}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <EyeIcon className="h-4 w-4 text-surface-400" />
                        <span className="text-white font-medium">{listing.views}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <ChatBubbleLeftRightIcon className="h-4 w-4 text-surface-400" />
                        <span className="text-white font-medium">{listing.inquiries}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <HeartIcon className="h-4 w-4 text-surface-400" />
                        <span className="text-white font-medium">{listing.favorites}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(listing.status)}`}>
                        {listing.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        {listing.views > 50 ? (
                          <ArrowTrendingUpIcon className="h-4 w-4 text-emerald-400" />
                        ) : (
                          <ArrowTrendingDownIcon className="h-4 w-4 text-destructive-400" />
                        )}
                        <span className={`text-sm font-medium ${listing.views > 50 ? 'text-emerald-400' : 'text-destructive-400'}`}>
                          {listing.views > 50 ? 'High' : 'Low'}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-8 text-center">
                    <div className="w-16 h-16 bg-surface-600/50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <DocumentTextIcon className="h-8 w-8 text-surface-400" />
                    </div>
                    <p className="text-surface-400">No listings available</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Analytics; 