import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Admin/Sidebar';
import Topbar from '../../components/Admin/Topbar';
import { useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import Helmet from '../../components/Helmet';

const AdminBookingDetails = () => {
    const location = useLocation();
    const { from, to, distance, date, time, driverId } = location.state || {};
    const [fee, setFee] = useState(null);
    const ratePerKm = 120; // Example: Rs 120 per kilometer
    const userId = localStorage.getItem('passengerIdAdmin'); // Get userId from localStorage
    console.log(userId)

    useEffect(() => {
        if (distance) {
            const distanceValue = parseFloat(distance.split(' ')[0]); // Extract numeric distance
            const calculatedFee = distanceValue * ratePerKm;
            setFee(calculatedFee.toFixed(2)); // Set fee with 2 decimal places
        }
    }, [distance]);

    // Function to handle booking confirmation
    const handleConfirmBooking = async () => {
        const bookingData = {
            from,
            to,
            distance,
            date,
            time,
            driverId,
            fee,
            passengerId: userId // Use the logged-in user's ID here
        };

        try {
            const response = await fetch('http://localhost:8000/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookingData),
            });

            if (!response.ok) {
                throw new Error('Failed to save booking');
            }

            const data = await response.json();
            alert(`Booking confirmed successfully! Booking ID: ${data.bookingId}`);
            // Optionally redirect or update state here
        } catch (error) {
            console.error('Error confirming booking:', error);
            alert('There was an error confirming your booking. Please try again.');
        }
    };

    return (

        <div className="d-flex">
            <div>
                <Sidebar />
            </div>
            <div className="flex-grow-1">
                <Topbar />
                <div className="">
                    <div className="container">
                        <section className="pt-0">
                        </section>
                        <section className="pt-0 justify-content-center">
                            <Helmet title="Car Booking">
                                <section className="car__booking">
                                    <Container>
                                        <Row>
                                            <Col className="mt-5">
                                                <div className="personal__information__form">
                                                    <div style={{
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        padding: '1rem'
                                                    }}>
                                                        <div>
                                                            <h2>Booking Details</h2>
                                                            <p><strong>From:</strong> {from}</p>
                                                            <p><strong>To:</strong> {to}</p>
                                                            <p><strong>Distance:</strong> {distance}</p>
                                                            <p><strong>Journey Date:</strong> {date}</p>
                                                            <p><strong>Journey Time:</strong> {time}</p>
                                                            <p><strong>Driver ID:</strong> {driverId}</p>

                                                            {fee && (
                                                                <p><strong>Total Journey Fee:</strong> Rs {fee}</p>
                                                            )}

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
                                                </div>
                                            </Col>
                                        </Row>
                                    </Container>
                                </section>
                            </Helmet>
                        </section>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminBookingDetails;
