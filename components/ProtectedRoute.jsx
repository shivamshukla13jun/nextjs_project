// components/ProtectedRoute.js
import { useSelector } from 'react-redux';
import { selectCurrentUser, selectCurrentRole } from '../redux/userSlice';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const ProtectedRoute = ({ children, requiredRole }) => {
  const user = useSelector(selectCurrentUser);
  const role = useSelector(selectCurrentRole);
  const router = useRouter();

  useEffect(() => {
    if (!user || (requiredRole && role !== requiredRole)) {
      router.push('/login');
    }
  }, [user, role, requiredRole, router]);

  if (!user || (requiredRole && role !== requiredRole)) {
    return null; // Or a loading spinner
  }

  return children;
};

export default ProtectedRoute;
