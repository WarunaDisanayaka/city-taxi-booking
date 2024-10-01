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
    const userId = localStorage.getItem('driverid'); // Get userId from localStorage
    console.log(userId)

    // Fetch bookings from the API
    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/bookings/driver/${userId}`); // Replace '10' with actual driver ID
                setBookingData(response.data.bookings); // Store the fetched bookings in state
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch booking data');
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    // Function to update the status of a booking and send a message
    const updateStatus = async (bookingId, newStatus, driverId, phone, vehicleNumber) => {
        try {
            // 1. Update booking status
            const response = await axios.put('http://localhost:8000/api/bookings/update-status', {
                bookingId,
                newStatus,
                driverId
            });

            if (response.status === 200) {
                // Update local state after successful response
                const updatedData = bookingData.map((booking) =>
                    booking.id === bookingId ? { ...booking, status: newStatus } : booking
                );
                setBookingData(updatedData);

                // 2. Send the SMS message with the booking details
                const message = `Your booking confirmed %0A Vehicle: ${vehicleNumber}%0ADriver: Saman`; // Customize the message content as needed
                await axios.post('https://sender.zirconhost.com/api/v2/send.php', null, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    params: {
                        user_id: '104684',        // Replace with your actual user_id
                        api_key: '67d7i8mnkfdhfadsv', // Replace with your actual API key
                        sender_id: 'My Demo sms',  // Replace with the sender ID
                        to: phone,                // Phone number from the booking table
                        message: message          // Customized message
                    }
                });

                alert('Booking status updated and SMS sent successfully');
            }
        } catch (error) {
            console.error("Failed to update booking status or send SMS", error);
        }
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
                                                {booking.status === 'confirmed' ? (
                                                    <Button variant="secondary" disabled>
                                                        Confirmed
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        variant="success"
                                                        onClick={() =>
                                                            updateStatus(
                                                                booking.id,
                                                                'Confirmed',
                                                                userId, // Replace with actual driver ID
                                                                booking.phone, // Phone number from table
                                                                'KV-1234' // Replace with actual vehicle number
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
