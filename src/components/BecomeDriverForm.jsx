import React, { useState } from 'react';
import { Form, FormGroup } from 'reactstrap';
import { Link } from 'react-router-dom';

const BecomeDriverForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    vehicleType: '',
    vehicleNumber: '',
    password: '',
    userType: 'driver',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };


  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log(formData)

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
    <>
      <Form onSubmit={handleSubmit}>
        <FormGroup className="login__form d-flex align-items-center gap-4 mb-4">
          <span>
            <i className="ri-user-line"></i>
          </span>
          <input
            type="text"
            placeholder="Username"
            name="username"
            required
            value={formData.username}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup className="login__form d-flex align-items-center gap-4 mb-4">
          <span>
            <i className="ri-mail-line"></i>
          </span>
          <input
            type="email"
            placeholder="Email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup className="login__form d-flex align-items-center gap-4 mb-4">
          <span>
            <i className="ri-phone-line"></i>
          </span>
          <input
            type="number"
            placeholder="Phone Number"
            name="phoneNumber"
            required
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </FormGroup>

        {/* Vehicle Type Dropdown */}
        <FormGroup className="login__form d-flex align-items-center gap-4 mb-4">
          <span>
            <i className="ri-car-line"></i>
          </span>
          <select
            name="vehicleType"
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

        <FormGroup className="login__form d-flex align-items-center gap-4 mb-4">
          <span>
            <i className="ri-steering-2-line"></i>
          </span>
          <input
            type="text"
            placeholder="Vehicle Number"
            name="vehicleNumber"
            required
            value={formData.vehicleNumber}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup className="login__form d-flex align-items-center gap-4 mb-4">
          <span>
            <i className="ri-lock-2-line"></i>
          </span>
          <input
            type="password"
            placeholder="Password"
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup className="login__form d-flex align-items-center gap-4 mb-4">
          <span>
            <i className="ri-lock-2-line"></i>
          </span>
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </FormGroup>

        <h6 className="fs-6 text-center">
          <label>
            <input
              type="checkbox"
              name="termsAccepted"
              required
              checked={formData.termsAccepted}
              onChange={handleChange}
            />
            Accept Terms & Conditions
          </label>
        </h6>
        {errorMessage && <p className="text-danger text-center">{errorMessage}</p>}
        {successMessage && <p className="text-success text-center">{successMessage}</p>}
        <button className="login__btn" type="submit">
          Register Now
        </button>
      </Form>

      <h6 className="fs-6 text-center mt-4">
        <Link to="/signin">Already Have an Account?</Link>
      </h6>
    </>
  );
};

export default BecomeDriverForm;
