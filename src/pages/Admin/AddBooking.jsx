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
    const [isLoading, setIsLoading] = useState(false);  // For tracking loading state
    const [noResults, setNoResults] = useState(false);  // For tracking if no passenger was found


    const navigate = useNavigate(); // Initialize useNavigate

    // Function to handle search input change
    const handleInputChange = (e) => {
        setPhone(e.target.value);
    };

    const handleEditPassenger = (passengerId) => {
        // You can implement the edit logic here, or navigate to an edit page
        console.log(`Editing passenger with ID: ${passengerId}`);
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
                        <div className="search-section">
                            {/* Search box */}
                            <div className="input-group mb-3 col-md-6">
                                <input
                                    type="text"
                                    value={phone}
                                    onChange={handleInputChange}
                                    placeholder="Enter phone number"
                                    className="form-control"
                                    aria-label="Passenger phone number"
                                />
                                <button className="btn btn-primary" onClick={searchPassenger}>
                                    {isLoading ? (
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    ) : (
                                        'Search'
                                    )}
                                </button>
                            </div>

                            {/* Error handling */}
                            {error && (
                                <div className="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            )}

                            {/* No passenger found */}
                            {noResults && (
                                <div className="alert alert-warning" role="alert">
                                    No passenger found with that phone number.
                                </div>
                            )}

                            {/* Display search result */}
                            {passenger && (
                                <div className="passenger-details card mt-4">
                                    <div className="card-body">
                                        <h4 className="card-title">Passenger Details</h4>
                                        <p className="card-text"><strong>ID:</strong> {passenger.id}</p>
                                        <p className="card-text"><strong>Username:</strong> {passenger.username}</p>
                                        <p className="card-text"><strong>Email:</strong> {passenger.email}</p>
                                        <p className="card-text"><strong>Phone:</strong> {passenger.phone}</p>


                                        {/* Book Now Button */}
                                        <button
                                            className="btn btn-success mt-3"
                                            onClick={handleBookingNavigation}
                                            style={{ padding: '10px 20px' }}
                                        >
                                            Book Now
                                        </button>
                                    </div>
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
