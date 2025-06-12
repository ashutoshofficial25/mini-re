import { ReactNode } from 'react';

import { Navigate } from 'react-router-dom';

import { useAuth } from 'src/context/AuthContext';

interface Props {
  children: ReactNode;
}

const AuthGuard = ({ children }: Props) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>; // or a full screen loader

  return user ? children : <Navigate to="/auth/login" replace />;
};

export default AuthGuard;
