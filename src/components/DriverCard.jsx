import React from 'react';
import { Col, Row, Card, CardBody, CardTitle, CardSubtitle, Button, Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../styles/car-card.css'; // Add necessary custom styles here

const DriverCard = ({ item }) => {
    const driver = item;

    return (
        <Container className="d-flex justify-content-center align-items-center">
            <Row>
                <Col lg="12" md="12" sm="12">
                    <Card className="carItem mb-4 p-3 shadow-sm" style={{ borderRadius: '10px' }}>
                        <CardBody className="d-flex align-items-center">

                            {/* Left Side Icon or Image */}
                            <div className="car__icon-container d-flex align-items-center justify-content-center bg-light p-3" style={{ borderRadius: '50%', width: '80px', height: '80px' }}>
                                <i className="ri-car-line" style={{ fontSize: '2.5rem', color: '#007bff' }}></i>
                            </div>

                            {/* Right Side: Driver Details */}
                            <div className="car__details ms-4">
                                <CardTitle tag="h5" className="mb-1">{driver.username}</CardTitle>
                                <CardSubtitle tag="h6" className="text-muted mb-3">{driver.vehicle_type} - {driver.vehicle_number}</CardSubtitle>

                                <div className="car__item-info mb-3 d-flex align-items-center gap-2">
                                    <i className="ri-user-line" style={{ fontSize: '1.25rem' }}></i>
                                    <span>{driver.email}</span>
                                </div>

                                <div className="d-flex justify-content-start">
                                    <Button color="primary" className="book-btn">
                                        <Link to={`/admin-book/${driver.id}`} className="text-white text-decoration-none">
                                            Book Now
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

export default DriverCard;
