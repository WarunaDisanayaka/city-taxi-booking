import React from 'react';
import { Col, Row, Card, CardBody, CardTitle, CardSubtitle, Button, Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../styles/booking-card.css'; // Add necessary custom styles here

const BookingCard = ({ item }) => {
    const booking = item;

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
                                    <Button color="primary" className="details-btn">
                                        <Link to={`/booking-details/${booking.id}`} className="text-white text-decoration-none">
                                            View Details
                                        </Link>
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
