// components/LogoutButton.js
import { useDispatch } from 'react-redux';
import { clearUser } from '../redux/userSlice';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(clearUser());
    router.push('/login');
  };

  return (
    <Button variant="danger" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
