import React, { useState } from 'react';
import { Form, FormGroup, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

const BecomeDriverForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    vehicleType: '',
    vehicleNumber: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false,
    userType: 'driver',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(data.message);
        setErrorMessage('');
      } else {
        setErrorMessage(data.message || 'Registration failed');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="p-4">
      <FormGroup className="mb-3">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          className="form-control"
          required
          value={formData.username}
          onChange={handleChange}
        />
      </FormGroup>

      <FormGroup className="mb-3">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          className="form-control"
          required
          value={formData.email}
          onChange={handleChange}
        />
      </FormGroup>

      <FormGroup className="mb-3">
        <label htmlFor="phone">Phone Number</label>
        <input
          type="number"
          id="phone"
          name="phone"
          className="form-control"
          required
          value={formData.phone}
          onChange={handleChange}
        />
      </FormGroup>

      <FormGroup className="mb-3">
        <label htmlFor="vehicleType">Vehicle Type</label>
        <select
          id="vehicleType"
          name="vehicleType"
          className="form-control"
          required
          value={formData.vehicleType}
          onChange={handleChange}
        >
          <option value="" disabled>Select Vehicle Type</option>
          <option value="car">Car</option>
          <option value="motorcycle">Motorcycle</option>
          <option value="truck">Truck</option>
        </select>
      </FormGroup>

      <FormGroup className="mb-3">
        <label htmlFor="vehicleNumber">Vehicle Number</label>
        <input
          type="text"
          id="vehicleNumber"
          name="vehicleNumber"
          className="form-control"
          required
          value={formData.vehicleNumber}
          onChange={handleChange}
        />
      </FormGroup>

      <FormGroup className="mb-3">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          className="form-control"
          required
          value={formData.password}
          onChange={handleChange}
        />
      </FormGroup>

      <FormGroup className="mb-3">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          className="form-control"
          required
          value={formData.confirmPassword}
          onChange={handleChange}
        />
      </FormGroup>

      <FormGroup className="mb-3 form-check">
        <input
          type="checkbox"
          id="termsAccepted"
          name="termsAccepted"
          required
          className="form-check-input"
          checked={formData.termsAccepted}
          onChange={handleChange}
        />
        <label htmlFor="termsAccepted" className="form-check-label">
          Accept Terms & Conditions
        </label>
      </FormGroup>

      {errorMessage && <p className="text-danger text-center">{errorMessage}</p>}
      {successMessage && <p className="text-success text-center">{successMessage}</p>}

      <Button color="primary" type="submit" className="w-100">
        Register Now
      </Button>

      <h6 className="fs-6 text-center mt-4">
        <Link to="/signin">Already Have an Account?</Link>
      </h6>
    </Form>
  );
};

export default BecomeDriverForm;
