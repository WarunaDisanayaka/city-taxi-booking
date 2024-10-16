import React from 'react';
import Helmet from '../components/Helmet';
import { Container, Row, Col } from 'reactstrap';
import CommonSection from '../components/CommonSection';
import AboutSection from '../components/AboutSection';
import BecomeDriver from '../components/BecomeDriver';
import driveImg from '../assets/img/drive.jpg';
import OurMember from '../components/OurMember';

import '../styles/about.css';

const About = () => {
  return (
    <Helmet title="About">
      <section className="pt-0">
        <CommonSection title="About Us" />
        <Container>
          <AboutSection />
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col lg="6" md="6" sm="12">
              <div className="about__section-img about__img">
                <img src={driveImg} alt="" className="w-100" />
              </div>
            </Col>
            <Col lg="6" md="6" sm="12">
              <div className="about__section__content">
                <h2 className="section__title about__title">
                  We Are Committed To Providing Safe and Reliable Ride Solutions
                </h2>
                <p className="section__description">
                  At our core, we are dedicated to ensuring that every ride you take is both safe and comfortable. With a team of experienced drivers and a modern fleet of well-maintained vehicles, we prioritize your safety above all else. Our services are tailored to meet your needs, offering peace of mind whether you're commuting locally or embarking on a long journey.
                </p>
                <p className="section__description">
                  We understand the importance of reliability when it comes to transportation. That’s why we work tirelessly to provide prompt, efficient services, and a seamless customer experience. Choose us for a worry-free ride, every time.
                </p>

                <div className="mt-4 d-flex align-items-center gap-3">
                  <span className="fs-4">
                    <i class="ri-phone-line"></i>
                  </span>
                  <div>
                    <h6 className="section__subtitle">Need Any Help?</h6>
                    <h4 className="about__phone">+088 1234567898</h4>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="become__driver">
        <Container>
          <BecomeDriver />
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-5">
              <h6 className="section__subtitle">Experts</h6>
              <h2 className="section__title">Our Members</h2>
            </Col>
            <OurMember />
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default About;
