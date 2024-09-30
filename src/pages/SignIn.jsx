import React from 'react';
import CommonSection from '../components/CommonSection';
import { Container, Row, Col, Form, FormGroup, Button, Input } from 'reactstrap';
import Helmet from '../components/Helmet';
import { Link } from 'react-router-dom';

const SignIn = () => {
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
              <Form>
                <FormGroup className="mb-4">
                  <div className="input-group">
                    <Input
                      type="text"
                      placeholder="Username or Email"
                      required
                      className="form-control"
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
                    />
                  </div>
                </FormGroup>

                <div className="d-flex justify-content-between mb-3">
                  <h6 className="fs-6">
                    <Link to="#">Forgot Password?</Link>
                  </h6>
                </div>

                <Button color="primary" className="w-100" type="submit">
                  Login
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
