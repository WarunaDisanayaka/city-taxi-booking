import React, { useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { BASE_URL } from '../../config/config';
import BookingForm from '../../components/BookingForm';
import Helmet from '../../components/Helmet';
import Sidebar from '../../components/Admin/Sidebar';
import Topbar from '../../components/Admin/Topbar';
import AdminBookingForm from '../../components/AdminBookingForm';

const AdminCarBooking = () => {
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
                                                    <AdminBookingForm />
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

export default AdminCarBooking;
