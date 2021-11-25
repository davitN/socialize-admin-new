import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { RootState } from '../../store/configureStore';

// can't access without authorization
const WithAuth = ({ children }: { children: JSX.Element }) => {
  const { isSignedIn } = useSelector((state: RootState) => state.mainReducer);
  const location = useLocation();
  console.log({ isSignedIn });
  if (!isSignedIn) {
    return <Navigate to="/auth" state={{ from: location }} />;
  }
  return children;
};

export default WithAuth;
