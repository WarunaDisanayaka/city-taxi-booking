import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import Sidebar from '../../components/Admin/Sidebar';
import Topbar from '../../components/Admin/Topbar';

const AddBooking = () => {
    // State to store the search input and passenger data
    const [phone, setPhone] = useState('');
    const [passenger, setPassenger] = useState(null);
    const [error, setError] = useState('');

    const navigate = useNavigate(); // Initialize useNavigate

    // Function to handle search input change
    const handleInputChange = (e) => {
        setPhone(e.target.value);
    };

    // Function to search for a passenger by phone number
    const searchPassenger = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/passengers/phone/${phone}`);
            setPassenger(response.data);  // Save passenger data to state
            setError('');  // Clear any previous error
        } catch (err) {
            setPassenger(null);  // Clear passenger data
            setError('Passenger not found');  // Display error message
        }
    };

    // Function to handle navigation to booking page
    const handleBookingNavigation = () => {
        if (passenger) {
            localStorage.setItem('passengerIdAdmin', passenger.id);
            navigate(`/book/${passenger.id}`); // Navigate to the booking page with passenger ID
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
                        <div>

                            {/* Search box */}
                            <input
                                type="text"
                                value={phone}
                                onChange={handleInputChange}
                                placeholder="Enter phone number"
                                style={{ padding: '8px', width: '200px', marginRight: '10px' }}
                            />

                            {/* Search button */}
                            <button className="btn btn-primary" onClick={searchPassenger} style={{ padding: '8px 16px' }}>
                                Search
                            </button>

                            {/* Display search result */}
                            {error && <p style={{ color: 'red' }}>{error}</p>}

                            {passenger && (
                                <div style={{ marginTop: '20px' }}>
                                    <h2>Passenger Details</h2>
                                    <p><strong>ID:</strong> {passenger.id}</p>
                                    <p><strong>Username:</strong> {passenger.username}</p>
                                    <p><strong>Email:</strong> {passenger.email}</p>
                                    <p><strong>Phone:</strong> {passenger.phone}</p>

                                    {/* Book Now Button */}
                                    <button className="btn btn-success" onClick={handleBookingNavigation} style={{ padding: '8px 16px', marginTop: '20px' }}>
                                        Book Now
                                    </button>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddBooking;
