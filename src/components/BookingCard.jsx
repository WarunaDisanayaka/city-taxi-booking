import React from 'react';
import { Col, Row, Card, CardBody, CardTitle, CardSubtitle, Button, Container } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/booking-card.css'; // Add necessary custom styles here

const BookingCard = ({ item }) => {
    const booking = item;
    const navigate = useNavigate();

    // Function to handle booking status update
    const handleCancelBooking = async () => {
        try {
            const payload = {
                bookingId: booking.id,
                newStatus: 'canceled', // Setting new status to 'canceled'
                driverId: booking.driver_id // Assuming driverId comes from booking data
            };

            const response = await axios.put('http://localhost:8000/api/bookings/update-status', payload);

            if (response.status === 200) {
                alert('Booking canceled successfully');
                navigate(`/my-bookings`); // Redirect to the bookings page
            } else {
                alert('Failed to cancel the booking');
            }
        } catch (error) {
            console.error('Error canceling booking:', error);
            alert('An error occurred while canceling the booking');
        }
        console.log(booking.id, booking.driver_id);
    };

    return (
        <Container className="d-flex justify-content-center align-items-center">
            <Row>
                <Col lg="12" md="12" sm="12">
                    <Card className="bookingItem mb-4 p-3 shadow-sm" style={{ borderRadius: '10px' }}>
                        <CardBody className="d-flex align-items-center">
                            <div className="booking__icon-container d-flex align-items-center justify-content-center bg-light p-3" style={{ borderRadius: '50%', width: '80px', height: '80px' }}>
                                <i className="ri-calendar-line" style={{ fontSize: '2.5rem', color: '#007bff' }}></i>
                            </div>
                            <div className="booking__details ms-4">
                                <CardTitle tag="h5" className="mb-1">Booking ID: {booking.id}</CardTitle>
                                <CardSubtitle tag="h6" className="text-muted mb-3">Status: {booking.status}</CardSubtitle>
                                <div className="booking__item-info mb-3 d-flex align-items-center gap-2">
                                    <i className="ri-map-pin-line" style={{ fontSize: '1.25rem' }}></i>
                                    <span>{booking.from_location} → {booking.to_location}</span>
                                </div>
                                <div className="booking__item-info mb-3 d-flex align-items-center gap-2">
                                    <i className="ri-time-line" style={{ fontSize: '1.25rem' }}></i>
                                    <span>{new Date(booking.journey_date).toLocaleDateString()}</span>
                                </div>
                                <div className="d-flex justify-content-start">
                                    <Button
                                        color="danger"
                                        className="details-btn"
                                        onClick={handleCancelBooking}
                                        disabled={booking.status === 'canceled'} // Disable if the status is "canceled"
                                    >
                                        {booking.status === 'canceled' ? 'Canceled' : 'Cancel'}
                                    </Button>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default BookingCard;
