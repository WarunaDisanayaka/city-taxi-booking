import React from 'react';
import { Col, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../styles/car-card.css';

const CarCard = ({ item }) => { // Accept item as props
  const driver = item; // Renaming for clarity

  return (
    <Col lg="4" md="4" sm="6" className="mb-5">
      <div className="carItem">
        <div className="car__item-content mt-4">
          <h4 className="section__title text-center">{driver.username}</h4>
          <h6 className="rent__price text-center mt-4">
            {driver.vehicle_type} - {driver.vehicle_number}
          </h6>

          <div className="car__item-info d-flex justify-content-between align-items-center mt-3 mb-4">
            <span className="d-flex align-items-center gap-1">
              <i className="ri-user-line"></i> {driver.email}
            </span>
            <span className="d-flex align-items-center gap-1">
              <i className="ri-phone-line"></i> {driver.phone_number}
            </span>
            <span className="d-flex align-items-center gap-1">
              <i className="ri-check-line"></i> {driver.status}
            </span>
          </div>
          <Button className="w-50 carItem__btn carItem__btn-rent">
            <Link to={`/booking/${driver.id}`}>BOOK</Link>
          </Button>
          <Button className="w-50 carItem__btn carItem__btn-details">
            <Link to={`/driver-details/${driver.id}`}>Details</Link>
          </Button>
        </div>
      </div>
    </Col>
  );
};

export default CarCard;
