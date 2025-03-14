import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../hooks/reduxHooks';
import { selectIsAuthenticated } from './authSlice';

const ProtectedRoute = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  // Render the child routes if authenticated
  return <Outlet />;
};

export default ProtectedRoute;
