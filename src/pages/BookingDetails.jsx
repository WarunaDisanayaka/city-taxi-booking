import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const BookingDetails = () => {
    const location = useLocation();
    const { from, to, distance, date, time } = location.state || {};
    const [fee, setFee] = useState(null);
    const ratePerKm = 120; // Example: Rs 120 per kilometer

    useEffect(() => {
        // Calculate fee when page loads
        if (distance) {
            const distanceValue = parseFloat(distance.split(' ')[0]); // Extract numeric distance
            const calculatedFee = distanceValue * ratePerKm;
            setFee(calculatedFee.toFixed(2)); // Set fee with 2 decimal places
        }
    }, [distance]);

    // Function to handle booking confirmation
    const handleConfirmBooking = () => {
        alert('Booking confirmed! Thank you for choosing our service.');
        // Add your booking confirmation logic here (e.g., API call or state management)
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding:'1rem'
        }}>
            <div
                
            >
                <h2>Booking Details</h2>
                <p><strong>From:</strong> {from}</p>
                <p><strong>To:</strong> {to}</p>
                <p><strong>Distance:</strong> {distance}</p>
                <p><strong>Journey Date:</strong> {date}</p>
                <p><strong>Journey Time:</strong> {time}</p>

                {/* Display the calculated fee */}
                {fee && (
                    <p><strong>Total Journey Fee:</strong> Rs {fee}</p>
                )}

                {/* Confirm Booking Button */}
                <button
                    className="confirm-booking-btn"
                    onClick={handleConfirmBooking}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: 'green',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        marginTop: '20px'
                    }}
                >
                    Confirm Booking
                </button>
            </div>
        </div>
    );
};

export default BookingDetails;
