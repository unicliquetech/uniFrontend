import React from 'react';
import { Navigate, Route, useLocation, RouteProps, NavigateProps } from 'react-router-dom';
import jwt from 'jsonwebtoken';

interface DecodedToken {
  userId: string;
}

export const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return { headers: {} };
  }
  try {
    const decodedToken = jwt.verify(token, '10L4ZR5+JZ5LLcqbAhQROtAuqxeR2BJfPORFvl+fSW8=') as DecodedToken;
    return {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  } catch (error) {
    console.error('Invalid token:', error);
    return { headers: {} };
  }
};

type ProtectedRouteProps = {
    component: React.ComponentType<any>;
    path?: string;
  };
  
  const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component, path, ...rest }) => {
    const isAuthenticated = getAuthHeaders().headers.Authorization !== undefined;
    const location = useLocation();

  return (
    <Route
      {...rest}
      element={
        isAuthenticated ? (
          <Component />
        ) : (
          <Navigate to="/login" state={{ from: location }} replace />
        )
      }
    />
  );
};

export default ProtectedRoute;