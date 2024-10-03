import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/Admin/Sidebar'
import Topbar from '../../components/Admin/Topbar'
import Register from '../../components/Register'

const AddPassenger = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        userType: 'passenger',
        acceptedTerms: true
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if passwords match
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
                body: JSON.stringify({
                    username: formData.username,
                    email: formData.email,
                    phone: formData.phone,
                    password: formData.password,
                    userType: formData.userType,
                }),
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
        <div className="d-flex">
            <div>
                <Sidebar />
            </div>
            <div className="flex-grow-1">
                <Topbar />
                <div className="p-4 mt-5">
                    <div className="container">
                        <h2 className="text-center mb-4">Add Passenger</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group mb-3">
                                <label htmlFor="username">Username</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                    style={{ width: '50%' }}

                                />
                            </div>

                            <div className="form-group mb-3">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    style={{ width: '50%' }}
                                />
                            </div>

                            <div className="form-group mb-3">
                                <label htmlFor="phone">Phone Number</label>
                                <input
                                    type="tel"
                                    className="form-control"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    style={{ width: '50%' }}

                                />
                            </div>

                            <div className="form-group mb-3">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    style={{ width: '50%' }}

                                />
                            </div>

                            <div className="form-group mb-4">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    style={{ width: '50%' }}

                                />
                            </div>



                            {errorMessage && <p className="text-danger text-center" style={{ width: '50%' }}>{errorMessage}</p>}
                            {successMessage && <p className="text-success text-center" style={{ width: '50%' }}>{successMessage}</p>}

                            <button className="btn btn-primary" type="submit" style={{ width: '50%' }}>
                                Register Now
                            </button>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddPassenger