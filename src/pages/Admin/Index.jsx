import React, { useState, useEffect } from 'react';
import Topbar from '../../components/Admin/Topbar';
import Sidebar from '../../components/Admin/Sidebar';
import { Card, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useLocation } from 'react-router';

function Index() {
    const [total, setTotal] = useState(0); // Total Bookings
    const [pending, setPending] = useState(0); // Pending Bookings
    const [confirmed, setConfirmed] = useState(0); // Confirmed Bookings
    const [completed, setCompleted] = useState(0); // Completed Bookings

    const location = useLocation();
    const roleid = location.state;

    const variant = ['info', 'warning', 'info', 'success']; // Adjusting colors accordingly
    const titles = [
        'Total Bookings',
        'Total Pending Bookings',
        'Total Confirmed Bookings',
        'Total Completed Bookings',
    ];
    const numbers = [total, pending, confirmed, completed];
    const iconlist = [
        'fas fa-user-check',
        'fas fa-clock',
        'fas fa-check-circle',
        'fas fa-trophy',
    ];

    // Fetch data from APIs
    useEffect(() => {
        // Function to fetch data from the APIs
        const fetchData = async () => {
            try {
                const totalResponse = await axios.get('http://localhost:8000/api/bookings');
                setTotal(totalResponse.data.totalBookings);

                const pendingResponse = await axios.get('http://localhost:8000/api/pending-bookings');
                setPending(pendingResponse.data.totalPendingBookings);

                const confirmedResponse = await axios.get('http://localhost:8000/api/confirmed-bookings');
                setConfirmed(confirmedResponse.data.totalConfirmedBookings);

                const completedResponse = await axios.get('http://localhost:8000/api/completed-bookings');
                setCompleted(completedResponse.data.totalCompletedBookings);
            } catch (error) {
                console.error('Error fetching booking data:', error);
            }
        };

        // Call fetchData when the component mounts
        fetchData();
    }, []);

    return (
        <div className="d-flex">
            <div>
                <Sidebar />
            </div>
            <div className="flex-grow-1">
                <Topbar roleid={roleid} />
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

export default Index;
