import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Sidebar from './components/Sidebar';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import PropertyManagement from './components/PropertyManagement';
import ListingsDisplay from './components/ListingsDisplay';
import Analytics from './components/Analytics';
import Profile from './components/Profile';
import PropertyForm from './components/PropertyForm';
import './App.css';

// A wrapper for authenticated routes
const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

// The main application layout with sidebar
const AppLayout: React.FC<{ children: JSX.Element }> = ({ children }) => (
  <div className="flex h-screen bg-gray-900 text-white">
    <Sidebar />
    <main className="flex-1 overflow-y-auto p-8">
      {children}
    </main>
  </div>
);

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  }

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Router>
        <Routes>
          <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} onSwitchToRegister={() => {}} />} />
          <Route path="/register" element={<Register onRegisterSuccess={handleLoginSuccess} onSwitchToLogin={() => {}} />} />
          
          {/* Authenticated Routes */}
          <Route path="/*" element={
            <PrivateRoute>
              <AppLayout>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/properties" element={<PropertyManagement />} />
                  <Route path="/add-property" element={<PropertyForm onPropertyCreated={() => {}} />} />
                  <Route path="/listings" element={<ListingsDisplay />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/profile" element={<Profile onLogout={handleLogout} />} />
                </Routes>
              </AppLayout>
            </PrivateRoute>
          }/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
