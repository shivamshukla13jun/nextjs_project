// pages/login.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { ServiceApi } from '../redux/apiService';
const { useLoginUserMutation}=ServiceApi
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginUser, { isLoading, error }] = useLoginUserMutation();
  const router = useRouter();
  const dispatch=useDispatch()
console.log(error)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = await loginUser({ email, password }).unwrap();
      dispatch(setUser(payload.data));
      router.push('/');
    } catch (err) {
      console.error('Failed to login: ', err);
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h1>Login</h1>
          {error && <Alert variant="danger">{error?.data?.message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" disabled={isLoading}>
              {isLoading ? 'Loading…' : 'Login'}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
