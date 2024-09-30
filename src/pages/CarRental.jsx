import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../config/config';
import useFetch from '../hooks/useFetch';
import ReactPaginate from 'react-paginate';

import '../styles/pagination.css';

import Helmet from '../components/Helmet';
import CommonSection from '../components/CommonSection';
import { Container, Row } from 'reactstrap';
import CarCard from '../components/CarCard';

const CarRental = () => {
  const { data: driverData, isPending, error } = useFetch(`${BASE_URL}/api/drivers/available`);

  const [pageNumber, setPageNumber] = useState(0);
  const driversPerPage = 6;
  const visitedPage = pageNumber * driversPerPage;

  const displayPage = driverData
    ? driverData
      .slice(visitedPage, visitedPage + driversPerPage)
      .map(driver => <CarCard key={driver.id} item={driver} />)
    : null;

  const pageCount = driverData ? Math.ceil(driverData.length / driversPerPage) : 0;

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [driverData]);

  return (
    <Helmet title="Driver-Listing">
      <section className="pt-0">
        <CommonSection title="Taxi's Listing" />
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

export default CarRental;
