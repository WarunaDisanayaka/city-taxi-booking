import React, { useState, useEffect, useRef } from 'react';
import { Form, FormGroup, Input, Button } from 'reactstrap';
import '../styles/find-cars-from.css';

const FindCarForm = () => {
  const [enterFromAddress, setEnterFromAddress] = useState('');
  const [enterToAddress, setEnterToAddress] = useState('');
  const [enterJourneyDate, setEnterJourneyDate] = useState('');
  const [enterJourneyTime, setEnterJourneyTime] = useState('');
  const [selectedAc, setSelectedAc] = useState('AC Car');
  const fromInputRef = useRef(null);

  useEffect(() => {
    // Initialize Google Maps Places Autocomplete
    if (window.google) {
      const autocomplete = new window.google.maps.places.Autocomplete(fromInputRef.current, {
        types: ['geocode'],
      });

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (place.formatted_address) {
          setEnterFromAddress(place.formatted_address);
        }
      });
    }
  }, []);

  const submitHandler = e => {
    e.preventDefault();
  };

  return (
    <Form className="form" onSubmit={submitHandler}>
      <div className="d-flex align-items-center justify-content-between flex-wrap">

        <FormGroup className="form__group">
          <input
            placeholder="From"
            type="text"
            required
            value={enterFromAddress}
            onChange={e => setEnterFromAddress(e.target.value)}
            ref={fromInputRef}
            className="form-control"
          />
        </FormGroup>

        <FormGroup className="form__group">
          <input
            placeholder="To"
            type="text"
            required
            value={enterToAddress}
            onChange={e => setEnterToAddress(e.target.value)}
            className="form-control"
          />
        </FormGroup>

        <FormGroup className="form__group">
          <input
            placeholder="Date"
            type="date"
            required
            value={enterJourneyDate}
            onChange={e => setEnterJourneyDate(e.target.value)}
            className="form-control"
          />
        </FormGroup>

        <FormGroup className="form__group">
          <input
            placeholder="Time"
            type="time"
            className="time__picker form-control"
            required
            value={enterJourneyTime}
            onChange={e => setEnterJourneyTime(e.target.value)}
          />
        </FormGroup>

        <FormGroup className="select__form">
          <select
            value={selectedAc}
            onChange={e => setSelectedAc(e.target.value)}
            className="form-select"
          >
            <option value="AC Car">AC Car</option>
            <option value="Non AC Car">Non AC Car</option>
          </select>
        </FormGroup>

        <FormGroup className="form__group">
          <Button className="btn find__car__btn">Find Car</Button>
        </FormGroup>

      </div>
    </Form>

  );
};

export default FindCarForm;
