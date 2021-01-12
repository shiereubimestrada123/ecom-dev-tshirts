import React from 'react';
import { Row, Col, Carousel } from 'react-bootstrap';

const Footer = (props) => {
  return (
    <Row className='footer-row'>
      <footer className='flex-rw'>
        <Col md={6}>
          <ul className='footer-list-top'>
            <li>
              <h4 className='footer-list-header'>Disclaimer</h4>
            </li>
            <li>
              <span className='footer-list'>
                1. This website was created solely for practice only.
              </span>
            </li>
            <li>
              <span className='footer-list'>
                2. Materials such as images you will see is not owned by the
                creator of this website.
              </span>
            </li>
          </ul>
        </Col>
        <Col md={6}>
          <ul className='footer-list-top'>
            <li>
              <h4 className='footer-list-header'>EcomDev Inc.</h4>
            </li>

            <li className='footer-list'>
              <i className='fas fa-envelope-square'></i> <span>asdasdasds</span>
            </li>
            <li className='footer-list'>
              <i className='fas fa-map-marker-alt'></i> <span>1231231312</span>
            </li>
          </ul>
        </Col>
        <Col md={12}>
          <section className='footer-bottom-section flex-rw'>
            <div className='footer-bottom-wrapper'>
              <i className='fas fa-copyright'></i> 2020 Copyright:{' '}
              <span className='footer-bottom-rights'> EcomDev</span>
            </div>
          </section>
        </Col>
      </footer>
    </Row>
  );
};

export default Footer;
