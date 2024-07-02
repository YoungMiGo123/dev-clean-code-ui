import { Outlet, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '../../Core/Hooks/AuthHook';



const PrivateRoute = () => {
  const { state } = useAuth();
  return state.isLoggedIn ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;