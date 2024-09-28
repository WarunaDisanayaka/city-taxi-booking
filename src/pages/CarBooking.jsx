import React, { useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { useParams } from 'react-router-dom';

import useFetch from '../hooks/useFetch';
import { BASE_URL } from '../config/config';
import BookingForm from '../components/BookingForm';
import PaymentMethod from '../components/PaymentMethod';
import Helmet from '../components/Helmet';

const CarBookingView = () => {
  const { id } = useParams();
  const {
    data: carData,
    isPending,
    error,
  } = useFetch(`${BASE_URL}/cars/${id}`);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [carData]);

  return (
    <Helmet title="Car Booking">
      <section className="car__booking">
        <Container>
          <Row>
            <Col className="mt-5">
              <div className="personal__information__form mt-5">
                <BookingForm />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default CarBookingView;
