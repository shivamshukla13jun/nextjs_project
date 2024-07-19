import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser, selectCurrentRole, clearUser } from '../redux/userSlice';
import { useRouter } from 'next/router';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const NavbarComponent = () => {
  const user = useSelector(selectCurrentUser);
  const role = useSelector(selectCurrentRole);
  const dispatch = useDispatch();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogout = () => {
    dispatch(clearUser());
    router.push('/login');
  };

  if (!isClient) {
    return null; // Render nothing on the server
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand>
          <Link className="nav-link" href="/" passHref>
            MyApp
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as="span">
              <Link className="nav-link" href="/" passHref>
                Home
              </Link>
            </Nav.Link>
            {user ? (
              <>
                {role === 'admin' && (
                  <Nav.Link as="span">
                    <Link className="nav-link" href="/adminPage" passHref>
                      Admin
                    </Link>
                  </Nav.Link>
                )}
                <Nav.Link as="span">
                  <Link className="nav-link" href="/Mylists" passHref>
                   My lists
                  </Link>
                </Nav.Link>
                <Button variant="outline-light" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as="span">
                  <Link className="nav-link" href="/login" passHref>
                    Login
                  </Link>
                </Nav.Link>
                <Nav.Link as="span">
                  <Link className="nav-link" href="/register" passHref>
                    Register
                  </Link>
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
