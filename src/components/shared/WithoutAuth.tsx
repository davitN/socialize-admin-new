import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { RootState } from '../../store/configureStore';

// can't access without authorization
const WithoutAuth: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { isSignedIn } = useSelector((state: RootState) => state.mainReducer);
  const location = useLocation();
  if (isSignedIn) {
    return <Navigate to="/dashboard" state={{ from: location }} />;
  }
  return children;
};

export default WithoutAuth;
