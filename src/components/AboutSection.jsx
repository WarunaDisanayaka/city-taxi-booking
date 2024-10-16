import React from 'react';
import { Row, Col } from 'reactstrap';
import '../styles/about-section.css';

const AboutSection = () => {
  return (
    <Row>
      <Col lg="6" md="6">
        <div className="about__section__content">
          <h6 className="section__subtitle">About Us</h6>
          <h2 className="section__title">Welcome to Premium Car Rental Service</h2>
          <p className="section__description">
            At Premium Car Rental, we provide a diverse selection of vehicles to meet all your travel needs. Whether you're exploring a new city, going on a road trip, or need a reliable car for business, our fleet ensures comfort, safety, and style. With years of experience in the industry, we pride ourselves on offering exceptional customer service and seamless rental experiences.
          </p>

          <div className="about__section-checkbox d-flex align-items-center">
            <p className="section__description d-flex align-items-center gap-2">
              <i class="ri-checkbox-circle-line"></i> Wide range of vehicles for every occasion.
            </p>
            <p className="section__description d-flex align-items-center gap-2">
              <i class="ri-checkbox-circle-line"></i> Flexible rental plans tailored to your needs.
            </p>
          </div>

          <div className="about__section-checkbox d-flex align-items-center">
            <p className="section__description d-flex align-items-center gap-2">
              <i class="ri-checkbox-circle-line"></i> 24/7 customer support and assistance.
            </p>
            <p className="section__description d-flex align-items-center gap-2">
              <i class="ri-checkbox-circle-line"></i> Easy online booking and payment options.
            </p>
          </div>
        </div>

      </Col>

      <Col lg="6" md="6">
        <div className="about__section-img">
          <img
            src="http://localhost:5000/images/bmw-offer.ecfb9ac1.png"
            alt=""
            className="w-100"
          />
        </div>
      </Col>
    </Row>
  );
};

export default AboutSection;
