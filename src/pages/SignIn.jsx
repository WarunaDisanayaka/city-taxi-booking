import React, { useState, useContext } from 'react';
import CommonSection from '../components/CommonSection';
import { Container, Row, Col, Form, FormGroup, Button, Input } from 'reactstrap';
import Helmet from '../components/Helmet';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Import AuthContext
import axios from 'axios';

const SignIn = () => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { setIsAuthenticated } = useContext(AuthContext); // Use AuthContext
  const navigate = useNavigate(); // Use navigate for redirection

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form submission

    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:8000/api/auth/login', {
        userType: 'passenger',
        emailOrPhone,
        password,
      });

      // Assuming the token is returned in response.data.token
      const token = response.data.token;
      localStorage.setItem('token', token); // Store token in local storage
      setIsAuthenticated(true); // Update authentication status
      navigate('/home'); // Redirect to home page or another route
    } catch (err) {
      setError('Invalid email or password'); // Handle error
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Helmet title="Login">
      <section className="p-0">
        <CommonSection title="Login Page" />
      </section>
      <section>
        <Container>
          <Row className="justify-content-center">
            <Col lg="4" md="6" sm="8" xs="10">
              <h4 className="text-center mb-5">
                <i className="ri-key-2-line me-2"></i> Sign In
              </h4>
              {error && <p className="text-danger text-center">{error}</p>} {/* Show error message */}
              <Form onSubmit={handleSubmit}>
                <FormGroup className="mb-4">
                  <div className="input-group">
                    <Input
                      type="text"
                      placeholder="Username or Email"
                      required
                      className="form-control"
                      value={emailOrPhone}
                      onChange={(e) => setEmailOrPhone(e.target.value)}
                    />
                  </div>
                </FormGroup>

                <FormGroup className="mb-4">
                  <div className="input-group">
                    <Input
                      type="password"
                      placeholder="Password"
                      required
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </FormGroup>

                <div className="d-flex justify-content-between mb-3">
                  <h6 className="fs-6">
                    <Link to="#">Forgot Password?</Link>
                  </h6>
                </div>

                <Button color="primary" className="w-100" type="submit" disabled={loading}>
                  {loading ? 'Logging in...' : 'Login'}
                </Button>
              </Form>

              <h6 className="text-center mt-4">
                <Link to="/signup">Do you need an Account?</Link>
              </h6>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default SignIn;
