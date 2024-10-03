import React, { useState, useEffect } from 'react';
import Topbar from './Topbar';
import Sidebar from './Sidebar';
import { Card, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useLocation } from 'react-router';

function Dashboard() {
  const [open, setOpen] = useState(0);
  const [inprogress, setInprogress] = useState(0);
  const [repair, setRepair] = useState(0);
  const [closed, setClosed] = useState(0);

  const location = useLocation();
  const roleid = location.state;

  const variant = ['danger', 'info', 'warning', 'success'];
  const titles = [
    'Total Complains',
    'Total Reviewed Cases',
    'Total on Repair cases',
    'Total Resolved Cases',
  ];
  const numbers = [open, inprogress, repair, closed];
  const iconlist = [
    'fas fa-exclamation',
    'fas fa-user-check',
    'fas fa-wrench',
    'fas fa-check',
  ];

  // Fetch data from APIs
  useEffect(() => {
    // Function to fetch data from the APIs
    const fetchData = async () => {
      try {
        const pendingResponse = await axios.get(
          'http://localhost:8000/api/pending-bookings'
        );
        setOpen(pendingResponse.data.totalPendingBookings);

        const confirmedResponse = await axios.get(
          'http://localhost:8000/api/confirmed-bookings'
        );
        setInprogress(confirmedResponse.data.totalConfirmedBookings);

        const repairResponse = await axios.get(
          'http://localhost:8000/api/bookings'
        );
        setRepair(repairResponse.data.totalBookings);

        const completedResponse = await axios.get(
          'http://localhost:8000/api/completed-bookings'
        );
        setClosed(completedResponse.data.totalCompletedBookings);
      } catch (error) {
        console.error('Error fetching booking data:', error);
      }
    };

    console.log(open);

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

export default Dashboard;
