import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/vendor/fontawesome-free/css/all.min.css';
import '../../assets/css/sb-admin-2.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useNavigate } from 'react-router';
import Cookies from 'js-cookie';

const Topbar = ({ roleid }) => {
  const navigate = useNavigate(); 

  const handleLogout = () => {
    console.log('Logout button clicked'); 
    localStorage.removeItem('token'); 
    console.log('User token removed'); 
    navigate('/'); 
    console.log('Navigate to root');
  };

  const getUserRole = role_id => {
    let role = '';
    console.log(role_id);
    if ((role_id = 3)) {
      role = 'Driver';
      console.log(role);
    } else if ((role_id = 4)) {
      role = 'Student';
    } else if ((role_id = 6)) {
      role = 'Sub-Warden';
    } else if ((role_id = 5)) {
      role = 'Warden';
    }

    console.log(role);
    return role;
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white topbar static-top shadow">
      <button
        className="btn btn-link d-md-none rounded-circle me-3"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i className="fa fa-bars"></i>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ms-auto">
          <div className="topbar-divider d-none d-sm-block"></div>
          <li className="nav-item dropdown no-arrow">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span className="me-2 d-none d-lg-inline text-gray-600">
                Welcome : {getUserRole(roleid)}
              </span>
            </a>
            <ul
              className="dropdown-menu dropdown-menu-end shadow animated--grow-in"
              aria-labelledby="userDropdown"
            >
              <li>
                <button className="dropdown-item" onClick={handleLogout}>
                  <i className="fas fa-sign-out-alt fa-sm fa-fw me-2 text-gray-400"></i>
                  Logout
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Topbar;
