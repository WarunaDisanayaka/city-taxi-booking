import React, { useState, useEffect } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useLocation } from 'react-router';
import Sidebar from '../../components/Driver/Sidebar';
import Topbar from '../../components/Driver/Topbar';

function Driver() {
    const [totalBookings, setTotalBookings] = useState(0);
    const [confirmedTrips, setConfirmedTrips] = useState(0);
    const [ongoingTrips, setOngoingTrips] = useState(0);
    const [completedTrips, setCompletedTrips] = useState(0);

    const location = useLocation();
    const driverId = localStorage.getItem('driverid'); // Get userId from localStorage
    console.log(driverId)
    const variant = ['primary', 'success', 'warning', 'info']; // Color variants
    const titles = [
        'Total Bookings',
        'Confirmed Trips',
        'Ongoing Trips',
        'Completed Trips',
    ]; // Titles for each card
    const numbers = [totalBookings, confirmedTrips, ongoingTrips, completedTrips];
    const iconlist = [
        'fas fa-car',    // Icon for bookings
        'fas fa-check',  // Icon for confirmed trips
        'fas fa-road',   // Icon for ongoing trips
        'fas fa-flag-checkered', // Icon for completed trips
    ];

    // Fetch booking data for the driver from the API
    useEffect(() => {
        if (driverId) {
            // Fetch total bookings
            axios.get(`http://localhost:8000/api/driver-bookings/${driverId}`)
                .then(response => setTotalBookings(response.data.totalBookings))
                .catch(error => console.error('Error fetching total bookings:', error));

            // Fetch confirmed trips
            axios.get(`http://localhost:8000/api/pending-bookings/${driverId}`)
                .then(response => setConfirmedTrips(response.data.totalConfirmedBookings))
                .catch(error => console.error('Error fetching confirmed trips:', error));

            // Fetch ongoing trips
            axios.get(`http://localhost:8000/api/confirmed-bookings/${driverId}`)
                .then(response => setOngoingTrips(response.data.totalOngoingTrips))
                .catch(error => console.error('Error fetching ongoing trips:', error));

            // Fetch completed trips
            axios.get(`http://localhost:8000/api/completed-bookings/${driverId}`)
                .then(response => setCompletedTrips(response.data.totalCompletedBookings))
                .catch(error => console.error('Error fetching completed trips:', error));
        }
    }, [driverId]);

    return (
        <div className="d-flex">
            <div>
                <Sidebar />
            </div>
            <div className="flex-grow-1">
                <Topbar />
                <div className="p-4 mt-5">
                    <Row xs={1} md={4} className="g-4">
                        {[0, 1, 2, 3].map(index => (
                            <Col key={index}>
                                <Card
                                    bg={variant[index]}
                                    text={variant[index] === 'light' ? 'dark' : 'white'}
                                    style={{
                                        width: '18rem',
                                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)',
                                    }}
                                    className="mb-2"
                                >
                                    <Card.Body>
                                        <Card.Title style={{ fontWeight: 'bolder' }}>
                                            {titles[index]}
                                        </Card.Title>
                                        <Card.Text style={{ fontSize: '40px' }}>
                                            {numbers[index]}{' '}
                                            <i
                                                className={iconlist[index]}
                                                style={{ marginLeft: '140px' }}
                                            ></i>
                                        </Card.Text>
                                        for this month ...
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>
        </div>
    );
}

export default Driver;
