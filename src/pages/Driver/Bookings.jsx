import React, { useState } from 'react';
import { Table, Row, Col, Button } from 'react-bootstrap';
import { useLocation } from 'react-router';
import Sidebar from '../../components/Driver/Sidebar';
import Topbar from '../../components/Driver/Topbar';

function Bookings() {
    const location = useLocation();
    const roleid = location.state;

    // Initial booking data (for UI purposes)
    const initialBookingData = [
        {
            id: 1,
            passenger_id: 'P123',
            driver_id: 'D456',
            from_location: 'Location A',
            to_location: 'Location B',
            distance: '10 km',
            journey_date: '2024-10-01',
            journey_time: '10:30 AM',
            fee: '1200 Rs',
            status: 'Completed',
            created_at: '2024-09-25',
        },
        {
            id: 2,
            passenger_id: 'P789',
            driver_id: 'D123',
            from_location: 'Location C',
            to_location: 'Location D',
            distance: '25 km',
            journey_date: '2024-10-05',
            journey_time: '12:00 PM',
            fee: '3000 Rs',
            status: 'In Progress',
            created_at: '2024-09-30',
        },
        // Add more data as needed...
    ];

    const [bookingData, setBookingData] = useState(initialBookingData);

    // Function to update the status of a booking
    const updateStatus = (id, newStatus) => {
        const updatedData = bookingData.map((booking) =>
            booking.id === id ? { ...booking, status: newStatus } : booking
        );
        setBookingData(updatedData);
    };

    return (
        <div className="d-flex">
            <div>
                <Sidebar />
            </div>
            <div className="flex-grow-1">
                <Topbar />
                <div className="p-4 mt-5">
                    <Row>
                        <Col>
                            <h3>Booking Details</h3>
                            <Table striped bordered hover responsive>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Passenger ID</th>
                                        <th>Driver ID</th>
                                        <th>From Location</th>
                                        <th>To Location</th>
                                        <th>Distance</th>
                                        <th>Journey Date</th>
                                        <th>Journey Time</th>
                                        <th>Fee</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                        <th>Created At</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bookingData.map((booking) => (
                                        <tr key={booking.id}>
                                            <td>{booking.id}</td>
                                            <td>{booking.passenger_id}</td>
                                            <td>{booking.driver_id}</td>
                                            <td>{booking.from_location}</td>
                                            <td>{booking.to_location}</td>
                                            <td>{booking.distance}</td>
                                            <td>{booking.journey_date}</td>
                                            <td>{booking.journey_time}</td>
                                            <td>{booking.fee}</td>
                                            <td>{booking.status}</td>
                                            <td>
                                                {booking.status === 'Confirmed' ? (
                                                    <span>Confirmed</span>
                                                ) : (
                                                    <>
                                                        <Button
                                                            variant="success"
                                                            onClick={() =>
                                                                updateStatus(
                                                                    booking.id,
                                                                    'Confirmed'
                                                                )
                                                            }
                                                        >
                                                            Confirm
                                                        </Button>
                                                    </>
                                                )}
                                            </td>
                                            <td>{booking.created_at}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    );
}

export default Bookings;
