import React, { useState, useEffect } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useLocation } from 'react-router';
import Sidebar from '../../components/Driver/Sidebar';
import Topbar from '../../components/Driver/Topbar';

function Driver() {
    const [totalBookings, setTotalBookings] = useState('');
    const [confirmedTrips, setConfirmedTrips] = useState('');
    const [ongoingTrips, setOngoingTrips] = useState('');
    const [completedTrips, setCompletedTrips] = useState('');

    const location = useLocation();
    const roleid = location.state;

    const variant = ['primary', 'success', 'warning', 'info']; // Changed colors
    const titles = [
        'Total Bookings',
        'Confirmed Trips',
        'Ongoing Trips',
        'Completed Trips',
    ]; // Updated titles
    const numbers = [totalBookings, confirmedTrips, ongoingTrips, completedTrips];
    const iconlist = [
        'fas fa-car',    // Icon for bookings
        'fas fa-check',  // Icon for confirmed trips
        'fas fa-road',   // Icon for ongoing trips
        'fas fa-flag-checkered', // Icon for completed trips
    ];

    // Example useEffect (future API integration)
    useEffect(() => {
        // Here you would fetch data from the API for the dashboard
        // Example:
        // axios.get('/api/driver/dashboard').then(response => {
        //     setTotalBookings(response.data.totalBookings);
        //     setConfirmedTrips(response.data.confirmedTrips);
        //     setOngoingTrips(response.data.ongoingTrips);
        //     setCompletedTrips(response.data.completedTrips);
        // }).catch(error => {
        //     console.error('Error fetching dashboard data:', error);
        // });
    }, []);

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
                                        width: '18 rem',
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
