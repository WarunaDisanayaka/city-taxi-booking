import React from 'react';
import { Col, Row, Card, CardBody, CardTitle, CardSubtitle, Button, Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../styles/car-card.css';

const CarCard = ({ item }) => {
  const driver = item;

  return (
    <Container className="d-flex justify-content-center align-items-center" >
      <Row>
        <Col lg="12" md="12" sm="12">
          <Card className="carItem text-center mb-3">
            <CardBody>
              <CardTitle tag="h4">{driver.username}</CardTitle>
              <CardSubtitle tag="h6" className="mb-3">
                {driver.vehicle_type} - {driver.vehicle_number}
              </CardSubtitle>

              <div className="car__item-info d-flex justify-content-between align-items-center mb-3">
                <span className="d-flex align-items-center gap-1">
                  <i className="ri-user-line"></i> {driver.email}
                </span>
              </div>

              <div className="d-flex justify-content-around mt-4">
                <Button color="primary" className="w-45">
                  <Link to={`/booking/${driver.id}`} className="text-white text-decoration-none">
                    BOOK
                  </Link>
                </Button>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CarCard;
