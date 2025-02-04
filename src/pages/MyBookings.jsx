import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../config/config';
import useFetch from '../hooks/useFetch';
import ReactPaginate from 'react-paginate';

import '../styles/pagination.css';

import Helmet from '../components/Helmet';
import CommonSection from '../components/CommonSection';
import { Container, Row } from 'reactstrap';
import BookingCard from '../components/BookingCard';

const MyBookings = () => {
    const userId = localStorage.getItem('passengerid');
    console.log(userId)
    const { data, isPending, error } = useFetch(`${BASE_URL}/api/bookings/${userId}`);

    const bookings = data.bookings || [];

    const [pageNumber, setPageNumber] = useState(0);
    const bookingsPerPage = 6;
    const visitedPage = pageNumber * bookingsPerPage;

    const displayPage = Array.isArray(bookings) && bookings.length > 0
        ? bookings.slice(visitedPage, visitedPage + bookingsPerPage).map(booking => <BookingCard key={booking.id} item={booking} />)
        : null;

    const pageCount = Math.ceil(bookings.length / bookingsPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [bookings]);

    useEffect(() => {
        console.log("Fetched bookings:", bookings);
    }, [bookings]);

    return (
        <Helmet title="My Bookings">
            <section className="pt-0">
                <CommonSection title="My Bookings" />
            </section>
            <section className="pt-0 justify-content-center">
                <Container>
                    {isPending && <h6 className="text-center">Loading......</h6>}
                    {error && <h6 className="text-center">{error}</h6>}
                    {displayPage}
                    <div>
                        <ReactPaginate
                            previousLabel={'Prev'}
                            nextLabel={'Next'}
                            pageCount={pageCount}
                            onPageChange={changePage}
                            containerClassName="paginationBttns"
                        />
                    </div>
                </Container>
            </section>
        </Helmet>
    );
};

export default MyBookings;
