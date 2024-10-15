import React, { useState } from 'react';
import CommonSection from '../components/CommonSection';
import { Container, Row, Col, Form, FormGroup, Button, Input } from 'reactstrap';
import Helmet from '../components/Helmet';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminLogin = () => {
    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Use navigate for redirection
    const { setUser, setIsAuthenticated } = useAuth(); // Destructure setUser and setIsAuthenticated

    const Credentials = {
        emailOrPhone: "admin@gmail.com",
        password: "admin123",
        userType: "admin",
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError(''); // Clear any previous errors

        // Hardcoded login logic
        if (emailOrPhone === Credentials.emailOrPhone && password === Credentials.password) {
            navigate('/admin'); // Redirect to admin page
        } else {
            setError('Login failed. Incorrect credentials.'); // Show error message
        }

        setLoading(false); // Stop loading spinner
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
                                            placeholder="Email"
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

                                <Button color="primary" className="w-100" type="submit" disabled={loading}>
                                    {loading ? 'Logging in...' : 'Login'}
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </section>
        </Helmet>
    );
};

export default AdminLogin;
