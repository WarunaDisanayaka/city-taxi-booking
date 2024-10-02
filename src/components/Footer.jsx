import React from 'react';
import '../styles/footer.css';
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

const QUICK__LINKS = [
  {
    display: 'About Us',
    path: '/about',
  },
  {
    display: 'Our Services',
    path: '/services',
  },
  {
    display: 'Privacy Policy',
    path: '#',
  },
  {
    display: 'Contact Us',
    path: '/contact',
  },
  {
    display: 'Driver Login',
    path: '/signindriver',
  },
];

const Footer = () => {
  return (
    <footer>
      <Container>
        <div className="footer__top pb-5">
          <Row>
            {/* Logo and Description */}
            <Col lg="4" md="4" sm="12">
              <div className="logo footer__logo__container mb-4">
                <h1>
                  <Link to="/home" className="footer__logo">
                    <i className="ri-car-line"></i>
                    <span className="text-light">City Taxi’s</span>
                  </Link>
                </h1>
                <p className="footer__logo-content">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla id ipsa neque harum quod quae reiciendis et quasi illum alias. Vero ipsam a omnis! Totam nam eaque sequi voluptates doloribus?
                </p>
              </div>
            </Col>

            {/* Quick Links */}
            <Col lg="3" md="4" sm="6">
              <div className="mb-4">
                <h5 className="text-light mb-4 footer__quick__links">Quick Links</h5>
                <div>
                  {QUICK__LINKS.map((item, index) => (
                    <p key={index} className="mb-3">
                      <Link to={item.path} className="text-light">
                        {item.display}
                      </Link>
                    </p>
                  ))}
                </div>
              </div>
            </Col>

            {/* Head Office Information */}
            <Col lg="3" md="4" sm="6">
              <div className="mb-4">
                <h5 className="text-light mb-4 footer__quick__links">Head Office</h5>
                <p className="head__office">2 A Deal Place, 03, Colombo</p>
                <p className="head__office">Phone: 0777 123 456</p>
                <p className="head__office">Email: citytaxi@gmail.com</p>
                <p className="head__office">Office Time: 10am - 6pm</p>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
