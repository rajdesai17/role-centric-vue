import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import AdminDashboard from './admin/AdminDashboard';
import UserDashboard from './user/UserDashboard';
import StoreOwnerDashboard from './store-owner/StoreOwnerDashboard';

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) return null;

  switch (user.role) {
    case 'admin':
      return <AdminDashboard />;
    case 'user':
      return <UserDashboard />;
    case 'store-owner':
      return <StoreOwnerDashboard />;
    default:
      return <div>Invalid role</div>;
  }
};

export default Dashboard;