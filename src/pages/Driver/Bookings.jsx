import React, { useState, useEffect } from 'react';
import { Table, Row, Col, Button } from 'react-bootstrap';
import { useLocation } from 'react-router';
import Sidebar from '../../components/Driver/Sidebar';
import Topbar from '../../components/Driver/Topbar';
import axios from 'axios'; // Assuming axios is being used for API calls

function Bookings() {
    const location = useLocation();
    const roleid = location.state;
    const [bookingData, setBookingData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch bookings from the API
    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/bookings/driver/10'); // Replace '10' with actual driver ID
                setBookingData(response.data.bookings); // Store the fetched bookings in state
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch booking data');
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    // Function to update the status of a booking
    const updateStatus = (id, newStatus) => {
        const updatedData = bookingData.map((booking) =>
            booking.id === id ? { ...booking, status: newStatus } : booking
        );
        setBookingData(updatedData);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

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
                                        <th>Passenger Name</th>
                                        <th>Phone</th>
                                        <th>From Location</th>
                                        <th>To Location</th>
                                        <th>Distance</th>
                                        <th>Journey Date</th>
                                        <th>Journey Time</th>
                                        <th>Fee</th>
                                        <th>Status</th>
                                        <th>Created At</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bookingData.map((booking) => (
                                        <tr key={booking.id}>
                                            <td>{booking.id}</td>
                                            <td>{booking.passenger_name}</td>
                                            <td>{booking.phone}</td>
                                            <td>{booking.from_location}</td>
                                            <td>{booking.to_location}</td>
                                            <td>{booking.distance}</td>
                                            <td>{new Date(booking.journey_date).toLocaleDateString()}</td>
                                            <td>{booking.journey_time}</td>
                                            <td>{booking.fee}</td>
                                            <td>{booking.status}</td>
                                            <td>{new Date(booking.created_at).toLocaleDateString()}</td>

                                            <td>
                                                {booking.status === 'Confirmed' ? (
                                                    <span>Confirmed</span>
                                                ) : (
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
                                                )}
                                            </td>
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
