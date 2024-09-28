import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { Form, FormGroup, Input, Button } from 'reactstrap';
import '../styles/booking-form.css';

const BookingForm = () => {
  const [enterFromAddress, setEnterFromAddress] = useState('');
  const [enterToAddress, setEnterToAddress] = useState('');
  const [distance, setDistance] = useState(null);
  const [journeyDate, setJourneyDate] = useState('');
  const [journeyTime, setJourneyTime] = useState('');

  const fromInputRef = useRef(null);
  const toInputRef = useRef(null);

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
            navigate('/booking-details', {
              state: {
                from: enterFromAddress,
                to: enterToAddress,
                distance: distanceInKm,
                date: journeyDate,
                time: journeyTime,
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
    <div className="form-container">
      <Form>
        <FormGroup className="booking__form mb-4">
          <input
            placeholder="From"
            type="text"
            required
            ref={fromInputRef}
            className="form-control"
          />
        </FormGroup>
        <FormGroup className="booking__form mb-4">
          <input
            placeholder="To"
            type="text"
            required
            ref={toInputRef}
            className="form-control"
          />
        </FormGroup>
        <FormGroup className="booking__form mb-4">
          <Input
            type="date"
            placeholder="Journey Date"
            value={journeyDate}
            onChange={(e) => setJourneyDate(e.target.value)}
          />
        </FormGroup>

        <FormGroup className="booking__form mb-4">
          <Input
            type="time"
            placeholder="Journey Time"
            value={journeyTime}
            onChange={(e) => setJourneyTime(e.target.value)}
            className="time__picker"
          />
        </FormGroup>
        <Button color="primary" className="booking-btn" onClick={calculateDistance}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default BookingForm;
