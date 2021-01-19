import React, { Fragment } from 'react';
import { Row, Col } from 'react-bootstrap';

const Welcome = (props) => {
  return (
    <Fragment>
      <h2 className='home-header'>Welcome to EcomDev</h2>
      <Row className='row-welcome'>
        <Col md={4}>
          <div className='child-home-icon'>
            <i className='fas fa-undo-alt'></i>
            <h3>return title</h3>
            <p>
              Curabitur arcu erat accumsan id imperdiet et porttitor at sem.
            </p>
          </div>
        </Col>
        <Col md={4}>
          <div className='child-home-icon'>
            <i className='fas fa-check-double'></i>
            <h3>authentic title</h3>
            <p>
              Curabitur arcu erat accumsan id imperdiet et porttitor at sem.
            </p>
          </div>
        </Col>
        <Col md={4}>
          <div className='child-home-icon'>
            <i className='fas fa-shipping-fast'></i>
            <h3>shipping title</h3>
            <p>
              Curabitur arcu erat accumsan id imperdiet et porttitor at sem.
            </p>
          </div>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Welcome;
