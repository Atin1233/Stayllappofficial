import React, { useState, useEffect } from 'react';
import { authAPI } from '../services/api';
import toast from 'react-hot-toast';
import { 
  UserIcon, 
  EnvelopeIcon, 
  PhoneIcon, 
  BuildingOfficeIcon,
  CalendarIcon,
  ClockIcon,
  PencilIcon,
  CheckIcon,
  XMarkIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';

interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  companyName?: string;
  userType: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ProfileProps {
  onLogout: () => void;
}

const Profile: React.FC<ProfileProps> = ({ onLogout }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    companyName: '',
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const response = await authAPI.getProfile();
      setProfile(response.data.user);
      setFormData({
        firstName: response.data.user.firstName,
        lastName: response.data.user.lastName,
        phone: response.data.user.phone || '',
        companyName: response.data.user.companyName || '',
      });
    } catch (err: any) {
      setError('Failed to load profile');
      console.error('Profile load error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const response = await authAPI.updateProfile(formData);
      setProfile(response.data.user);
      setIsEditing(false);
      setSuccess('Profile updated successfully!');
      toast.success('Profile updated successfully');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogoutClick = () => {
    onLogout();
    toast.success('Logged out successfully');
  };

  if (loading) {
    return (
      <div className="max-w-screen-lg mx-auto w-full min-h-[80vh] flex flex-col space-y-6 lg:space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-white font-display">Profile Settings</h1>
          <div className="w-24 sm:w-32 h-10 bg-surface-600 rounded-lg animate-pulse"></div>
        </div>
        <div className="card p-4 lg:p-6">
          <div className="space-y-3 lg:space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center space-x-3 lg:space-x-4">
                <div className="w-5 h-5 lg:w-6 lg:h-6 bg-surface-600 rounded animate-pulse"></div>
                <div className="h-4 bg-surface-600 rounded w-24 lg:w-32 animate-pulse"></div>
                <div className="h-4 bg-surface-600 rounded w-36 lg:w-48 animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-screen-lg mx-auto w-full min-h-[80vh] flex flex-col space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold text-white font-display">Profile Settings</h1>
          <p className="text-base lg:text-lg text-surface-300">Manage your account information and preferences</p>
        </div>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="inline-flex items-center px-4 py-3 lg:px-6 lg:py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-lg hover:from-primary-600 hover:to-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-200"
          >
            <PencilIcon className="h-4 w-4 lg:h-5 lg:w-5 mr-2" />
            <span>Edit Profile</span>
          </button>
        )}
      </div>

      {/* Error/Success Messages */}
      {error && (
        <div className="card p-4 lg:p-6">
          <div className="flex items-center space-x-3 lg:space-x-4">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-destructive-500/20 rounded-2xl flex items-center justify-center">
              <XMarkIcon className="h-5 w-5 lg:h-6 lg:w-6 text-destructive-400" />
            </div>
            <div>
              <p className="text-destructive-400 font-medium">{error}</p>
              <p className="text-surface-400 text-sm">Please try again</p>
            </div>
          </div>
        </div>
      )}

      {success && (
        <div className="card p-4 lg:p-6">
          <div className="flex items-center space-x-3 lg:space-x-4">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-success-500/20 rounded-2xl flex items-center justify-center">
              <CheckIcon className="h-5 w-5 lg:h-6 lg:w-6 text-success-400" />
            </div>
            <div>
              <p className="text-success-400 font-medium">{success}</p>
              <p className="text-surface-400 text-sm">Your profile has been updated</p>
            </div>
          </div>
        </div>
      )}

      {/* Profile Information */}
      <div className="card p-4 lg:p-6">
        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-surface-300 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  className="w-full px-4 py-3 bg-surface-700/50 border border-surface-600/50 rounded-lg text-white placeholder-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-surface-300 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                  className="w-full px-4 py-3 bg-surface-700/50 border border-surface-600/50 rounded-lg text-white placeholder-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-surface-300 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-4 py-3 bg-surface-700/50 border border-surface-600/50 rounded-lg text-white placeholder-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="companyName" className="block text-sm font-medium text-surface-300 mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  className="w-full px-4 py-3 bg-surface-700/50 border border-surface-600/50 rounded-lg text-white placeholder-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  value={formData.companyName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-6 py-3 bg-surface-700/50 border border-surface-600/50 text-white rounded-lg hover:bg-surface-600/50 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-lg hover:from-primary-600 hover:to-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 transition-all duration-200"
              >
                {saving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin inline mr-2"></div>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <CheckIcon className="h-5 w-5 inline mr-2" />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            {/* Profile Fields - Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column - Labels */}
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500/20 to-primary-600/20 rounded-2xl flex items-center justify-center">
                    <EnvelopeIcon className="h-6 w-6 text-primary-400" />
                  </div>
                  <div>
                    <p className="text-surface-400 text-sm font-medium">Email Address</p>
                    <p className="text-white font-semibold">{profile?.email}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500/20 to-primary-600/20 rounded-2xl flex items-center justify-center">
                    <UserIcon className="h-6 w-6 text-primary-400" />
                  </div>
                  <div>
                    <p className="text-surface-400 text-sm font-medium">First Name</p>
                    <p className="text-white font-semibold">{profile?.firstName}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500/20 to-primary-600/20 rounded-2xl flex items-center justify-center">
                    <UserIcon className="h-6 w-6 text-primary-400" />
                  </div>
                  <div>
                    <p className="text-surface-400 text-sm font-medium">Last Name</p>
                    <p className="text-white font-semibold">{profile?.lastName}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500/20 to-primary-600/20 rounded-2xl flex items-center justify-center">
                    <PhoneIcon className="h-6 w-6 text-primary-400" />
                  </div>
                  <div>
                    <p className="text-surface-400 text-sm font-medium">Phone Number</p>
                    <p className="text-white font-semibold">{profile?.phone || 'Not provided'}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500/20 to-primary-600/20 rounded-2xl flex items-center justify-center">
                    <BuildingOfficeIcon className="h-6 w-6 text-primary-400" />
                  </div>
                  <div>
                    <p className="text-surface-400 text-sm font-medium">Company Name</p>
                    <p className="text-white font-semibold">{profile?.companyName || 'Not provided'}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500/20 to-primary-600/20 rounded-2xl flex items-center justify-center">
                    <UserIcon className="h-6 w-6 text-primary-400" />
                  </div>
                  <div>
                    <p className="text-surface-400 text-sm font-medium">User Type</p>
                    <p className="text-white font-semibold capitalize">{profile?.userType}</p>
                  </div>
                </div>
              </div>

              {/* Right Column - Values */}
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-500/20 to-amber-600/20 rounded-2xl flex items-center justify-center">
                    <CalendarIcon className="h-6 w-6 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-surface-400 text-sm font-medium">Member Since</p>
                    <p className="text-white font-semibold">
                      {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-500/20 to-amber-600/20 rounded-2xl flex items-center justify-center">
                    <ClockIcon className="h-6 w-6 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-surface-400 text-sm font-medium">Last Updated</p>
                    <p className="text-white font-semibold">
                      {profile?.updatedAt ? new Date(profile.updatedAt).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 rounded-2xl flex items-center justify-center">
                    <CheckIcon className="h-6 w-6 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-surface-400 text-sm font-medium">Account Status</p>
                    <p className="text-white font-semibold">
                      {profile?.isActive ? 'Active' : 'Inactive'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-2xl flex items-center justify-center">
                    <UserIcon className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-surface-400 text-sm font-medium">User ID</p>
                    <p className="text-white font-semibold font-mono text-sm">{profile?.id}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Logout Section */}
      <div className="card p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-destructive-500/20 to-destructive-600/20 rounded-2xl flex items-center justify-center">
              <ArrowRightOnRectangleIcon className="h-6 w-6 text-destructive-400" />
            </div>
            <div>
              <p className="text-white font-medium">Sign Out</p>
              <p className="text-surface-400 text-sm">Log out of your account</p>
            </div>
          </div>
          <button
            onClick={handleLogoutClick}
            className="inline-flex items-center px-6 py-3 border border-destructive-500 text-destructive-400 font-medium rounded-lg hover:bg-destructive-500/10 focus:outline-none focus:ring-2 focus:ring-destructive-500 focus:ring-offset-2 transition-colors duration-200"
          >
            <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile; 