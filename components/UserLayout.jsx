import { Container, Navbar, Nav } from 'react-bootstrap';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { selectCurrentRole } from '../redux/userSlice';

const UserLayout = ({ children }) => {
  const role = useSelector(selectCurrentRole);

  if (role !== 'user') {
    return <p>You do not have access to this page.</p>;
  }

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand>
            <Link href="/" passHref>
              MyApp
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link>
                <Link href="/" passHref>
                  Home
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link href="/userPage" passHref>
                  User Page
                </Link>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        {children}
      </Container>
    </>
  );
};

export default UserLayout;
