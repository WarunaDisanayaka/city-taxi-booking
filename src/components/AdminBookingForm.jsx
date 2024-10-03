import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Import useParams to get the ID from the URL
import { Form, FormGroup, Input, Button, Container, Row, Col } from 'reactstrap';
import '../styles/booking-form.css'; // Keep your custom styles for specific overrides if necessary

const AdminBookingForm = () => {
    const { id } = useParams(); // Get the driver id from the URL
    const [enterFromAddress, setEnterFromAddress] = useState('');
    const [enterToAddress, setEnterToAddress] = useState('');
    const [distance, setDistance] = useState(null);
    const [journeyDate, setJourneyDate] = useState('');
    const [journeyTime, setJourneyTime] = useState('');

    const fromInputRef = useRef(null);
    const toInputRef = useRef(null);

    console.log(id);

    const navigate = useNavigate(); // Use useNavigate for navigation

    useEffect(() => {
        if (window.google) {
            const fromAutocomplete = new window.google.maps.places.Autocomplete(fromInputRef.current, {
                types: ['geocode'],
            });

            fromAutocomplete.addListener('place_changed', () => {
                const place = fromAutocomplete.getPlace();
                if (place.formatted_address) {
                    setEnterFromAddress(place.formatted_address);
                }
            });

            const toAutocomplete = new window.google.maps.places.Autocomplete(toInputRef.current, {
                types: ['geocode'],
            });

            toAutocomplete.addListener('place_changed', () => {
                const place = toAutocomplete.getPlace();
                if (place.formatted_address) {
                    setEnterToAddress(place.formatted_address);
                }
            });
        }
    }, []);

    const calculateDistance = () => {
        if (enterFromAddress && enterToAddress) {
            const service = new window.google.maps.DistanceMatrixService();
            service.getDistanceMatrix(
                {
                    origins: [enterFromAddress],
                    destinations: [enterToAddress],
                    travelMode: window.google.maps.TravelMode.DRIVING,
                },
                (response, status) => {
                    if (status === 'OK' && response.rows[0].elements[0].status === 'OK') {
                        const distanceInKm = response.rows[0].elements[0].distance.text;
                        setDistance(distanceInKm);

                        // Redirect to the BookingDetails page after calculating the distance
                        navigate('/admin-booking-details', {
                            state: {
                                from: enterFromAddress,
                                to: enterToAddress,
                                distance: distanceInKm,
                                date: journeyDate,
                                time: journeyTime,
                                driverId: id, // Include the driver ID in the state
                            },
                        });
                    } else {
                        console.error('Error calculating distance:', status);
                    }
                }
            );
        }
    };

    return (
        <Container className="py-2">
            <Row className="justify-content-center">
                <Col lg="6" md="8" sm="10">
                    <h3 className="text-center mb-4">Book Your Journey</h3>
                    <Form>
                        <FormGroup className="mb-3">
                            <div className="input-group">
                                <span className="input-group-text">
                                    <i className="ri-map-pin-line"></i>
                                </span>
                                <input
                                    type="text"
                                    placeholder="From"
                                    required
                                    ref={fromInputRef}
                                    className="form-control"
                                />
                            </div>
                        </FormGroup>

                        <FormGroup className="mb-3">
                            <div className="input-group">
                                <span className="input-group-text">
                                    <i className="ri-map-pin-line"></i>
                                </span>
                                <input
                                    type="text"
                                    placeholder="To"
                                    required
                                    ref={toInputRef}
                                    className="form-control"
                                />
                            </div>
                        </FormGroup>

                        <FormGroup className="mb-3">
                            <Input
                                type="date"
                                placeholder="Journey Date"
                                value={journeyDate}
                                onChange={(e) => setJourneyDate(e.target.value)}
                                className="form-control"
                            />
                        </FormGroup>

                        <FormGroup className="mb-3">
                            <Input
                                type="time"
                                placeholder="Journey Time"
                                value={journeyTime}
                                onChange={(e) => setJourneyTime(e.target.value)}
                                className="form-control"
                            />
                        </FormGroup>

                        <Button color="primary" className="w-100" onClick={calculateDistance}>
                            Submit
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default AdminBookingForm;
