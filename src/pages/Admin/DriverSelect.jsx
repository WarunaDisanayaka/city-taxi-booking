import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../../config/config';
import useFetch from '../../hooks/useFetch';
import ReactPaginate from 'react-paginate';

import '../../styles/pagination.css';

import { Container } from 'reactstrap';
import Sidebar from '../../components/Admin/Sidebar';
import Topbar from '../../components/Admin/Topbar';
import DriverCard from '../../components/DriverCard';

const DriverSelect = () => {
    const { data: driverData, isPending, error } = useFetch(`${BASE_URL}/api/drivers/available`);

    const [pageNumber, setPageNumber] = useState(0);
    const driversPerPage = 6;
    const visitedPage = pageNumber * driversPerPage;

    const displayPage = driverData && driverData.length > 0
        ? driverData
            .slice(visitedPage, visitedPage + driversPerPage)
            .map(driver => <DriverCard key={driver.id} item={driver} />)
        : null;

    const pageCount = driverData ? Math.ceil(driverData.length / driversPerPage) : 0;

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [driverData]);

    return (
        <div className="d-flex">
            <div>
                <Sidebar />
            </div>
            <div className="flex-grow-1">
                <Topbar />
                <div className="p-4 mt-5">
                    <div className="container">
                        <section className="pt-0">
                        </section>
                        <section className="pt-0 justify-content-center">
                            <Container>
                                {/* Show loading message */}
                                {isPending && <h6 className="text-center">Loading......</h6>}

                                {/* Show error message if there's an error */}
                                {error && <h6 className="text-center">{error}</h6>}

                                {/* If no drivers available, show "No drivers available" */}
                                {!isPending && driverData && driverData.length === 0 && (
                                    <h6 className="text-center">No drivers available</h6>
                                )}

                                {/* Show drivers if available */}
                                {displayPage}

                                {/* Pagination component */}
                                {driverData && driverData.length > 0 && (
                                    <div>
                                        <ReactPaginate
                                            previousLabel={'Prev'}
                                            nextLabel={'Next'}
                                            pageCount={pageCount}
                                            onPageChange={changePage}
                                            containerClassName="paginationBttns"
                                        />
                                    </div>
                                )}
                            </Container>
                        </section>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default DriverSelect;
