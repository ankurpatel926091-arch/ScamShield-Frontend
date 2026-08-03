import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const AdminRoute = ({ children }) => {
  const { isModerator, loading } = useAuth();

  if (loading) return null;

  if (!isModerator) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};
