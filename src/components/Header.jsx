import React, { useRef } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { Link, NavLink } from 'react-router-dom';
import '../styles/header.css';
import { useDispatch, useSelector } from 'react-redux';
import { cartUiAction } from '../store/cartUi-Slice';
import { useAuth } from '../context/AuthContext';

const NAV__MENU = [
  {
    text: 'Home',
    path: '/home',
  },
  {
    text: 'About',
    path: '/about',
  },
  {
    text: 'Car Listing',
    path: '/car-listing',
  },
  {
    text: 'Contact',
    path: '/contact',
  },
];

const Header = () => {
  const menuRef = useRef();
  const dispatch = useDispatch();
  const totalQuantity = useSelector(state => state.cart.totalQuantity);
  const { isAuthenticated, setIsAuthenticated } = useAuth(); // Get auth state

  const cartShowToggle = () => {
    dispatch(cartUiAction.toggle());
  };

  const menuToggle = () => menuRef.current.classList.toggle('menu__active');

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token
    setIsAuthenticated(false); // Update auth state
    // Optionally, redirect to the login page
    // navigate('/signin'); // Uncomment if you want to redirect after logout
  };

  return (
    <header>
      <div className="header__top">
        <Container>
          <Row>
            <Col lg="6" md="6" sm="6">
              <div className="header__top-left">
                <span>Need Help?</span>
                <span className="header__top-help">
                  <i className="ri-phone-fill"></i> Call: 0777 123 456
                </span>
              </div>
            </Col>

            <Col lg="6" md="6" sm="6" className="text-end">
              <div className="header__top-right">
                {isAuthenticated ? ( // Conditional rendering based on authentication state
                  <>
                    <Button onClick={handleLogout} className="logout-button">
                      <i className="ri-logout-circle-line"></i> Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/signin">
                      <i className="ri-login-circle-line"></i> Login
                    </Link>
                    <Link to="/signindriver">
                      <i className="ri-login-circle-line"></i> Driver Login
                    </Link>
                    <Link to="/signup">
                      <i className="ri-user-line"></i> Register
                    </Link>
                  </>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="main__header">
        <Container>
          <Row>
            <Col lg="4" md="3" sm="4">
              <div className="logo">
                <h1>
                  <Link to="/home">
                    <i className="ri-car-line"></i>{' '}
                    <span>City Taxi’s</span>
                  </Link>
                </h1>
              </div>
            </Col>

            <Col lg="3" md="3" sm="4">
              <div className="header__location">
                <span>
                  <i className="ri-earth-line"></i>
                </span>
                <div className="header__location-content">
                  <h4>Colombo</h4>
                  <h6>178 Old Moor Street, 12</h6>
                </div>
              </div>
            </Col>

            <Col lg="3" md="3" sm="4">
              <div className="header__location">
                <span>
                  <i className="ri-time-line"></i>
                </span>
                <div className="header__location-content">
                  <h4>Sunday to Friday</h4>
                  <h6>10am - 7pm</h6>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="header__bottom">
        <Container>
          <div className="menu__container d-flex justify-content-between align-items-center">
            <span className="menu__bar">
              <i className="ri-menu-line" onClick={menuToggle}></i>
            </span>
            <div className="menu__list" ref={menuRef} onClick={menuToggle}>
              <div className="menu__left">
                {NAV__MENU.map((item, index) => (
                  <NavLink
                    className={navClass =>
                      navClass.isActive ? 'active me-4 ' : 'me-4'
                    }
                    key={index}
                    to={item.path}
                  >
                    {item.text}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
};

export default Header;
