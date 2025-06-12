import { ReactNode } from 'react';

import { Navigate } from 'react-router-dom';

import { useAuth } from 'src/context/AuthContext';

interface Props {
  children: ReactNode;
}

const GuestGuard = ({ children }: Props) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return !user ? children : <Navigate to="/" replace />;
};

export default GuestGuard;
