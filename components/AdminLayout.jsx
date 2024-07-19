import { Container, Navbar, Nav } from 'react-bootstrap';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { selectCurrentRole } from '../redux/userSlice';

const AdminLayout = ({ children }) => {
  const role = useSelector(selectCurrentRole);

  if (role !== 'admin') {
    return <p>You do not have access to this page.</p>;
  }

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand>
            <Link href="/admin" passHref>
              Admin Dashboard
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link>
                <Link href="/admin/users" passHref>
                  Manage Users
                </Link>
              </Nav.Link>
              <Nav.Link>
                <Link href="/admin/settings" passHref>
                  Settings
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

export default AdminLayout;
