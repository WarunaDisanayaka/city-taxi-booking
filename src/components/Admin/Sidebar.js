import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/vendor/fontawesome-free/css/all.min.css';
import '../../assets/css/sb-admin-2.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Sidebar = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleLogout = () => {
    console.log('Logout button clicked');
    Cookies.remove('userToken');
    console.log('User token removed');
    navigate('/');
    console.log('Navigate to root');
  };

  return (
    <ul
      className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
      id="accordionSidebar"
    >
      <a
        className="sidebar-brand d-flex align-items-center justify-content-center"
        href="/admin_dashboard"
      >
        {/* <div className="sidebar-brand-icon ">
                    <i className="fas fa-house"></i>
                </div> */}
        <div className="sidebar-brand-text mx-3">City Taxi's</div>
      </a>
      <hr className="sidebar-divider my-0" />
      <li className="nav-item">
        <a className="nav-link" href="/admin">
          <i className="fas fa-fw fa-tachometer-alt"></i>
          <span>Dashboard</span>
        </a>
      </li>
      <hr className="sidebar-divider" />
      <div className="sidebar-heading">Actions</div>

      <li className="nav-item">
        <a
          className="nav-link collapsed d-flex align-items-center justify-content-between"
          href="#collapseUtilities"
          data-bs-toggle="collapse"
          data-bs-target="#collapseUtilities"
          aria-expanded="true"
          aria-controls="collapseUtilities"
        >
          <span>
            <i className="fas fa-solid fa-hotel"></i>
            Booking
          </span>
          <i className="fas fa-angle-right"></i>
        </a>
        <div
          id="collapseUtilities"
          className="collapse"
          aria-labelledby="headingUtilities"
          data-parent="#accordionSidebar"
        >
          <div className="bg-white py-2 collapse-inner rounded">
            <a className="collapse-item" href="/add-booking">
              <i className="fas fa-plus-circle"></i> Add a Booking
            </a>
            <a className="collapse-item" href="/add-booking">
              <i className="fas fa-newspaper"></i> Booking list
            </a>
          </div>
        </div>
      </li>
      <li className="nav-item">
        <a
          className="nav-link collapsed d-flex align-items-center justify-content-between"
          href="#collapseUsers"
          data-bs-toggle="collapse"
          data-bs-target="#collapseUsers"
          aria-expanded="true"
          aria-controls="collapseUsers"
        >
          <span>
            <i className="fas fa-solid fa-user"></i>
            Passengers
          </span>
          <i className="fas fa-angle-right"></i>
        </a>
        <div
          id="collapseUsers"
          className="collapse"
          aria-labelledby="headingUsers"
          data-parent="#accordionSidebar"
        >
          <div className="bg-white py-2 collapse-inner rounded">
            <a className="collapse-item" href="/add-passenger">
              <i className="fas fa-plus-circle"></i> Add a Passenger
            </a>
            {/* <a className="collapse-item" href="/view_user">
              <i className="fas fa-newspaper"></i> User list
            </a> */}
          </div>
        </div>
      </li>

      <hr className="sidebar-divider d-none d-md-block" />
      <div className="text-center d-none d-md-inline"></div>
      <hr className="sidebar-divider d-none d-md-block" />

      <div className="text-center d-none d-md-inline">
        <div className="text-center d-none d-md-inline">
          {/* <button onClick={handleLogout} className="btn btn-link" style={{ cursor: 'pointer' }}>
                <i className="fas fa-fw fa-sign-out-alt"></i>
                <span>Logout</span>
            </button> */}
        </div>
      </div>
    </ul>
  );
};

export default Sidebar;
