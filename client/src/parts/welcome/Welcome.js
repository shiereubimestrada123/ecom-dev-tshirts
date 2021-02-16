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
            <h3>Return</h3>
            <p>Shop with certainty with a 7 day return policy.</p>
          </div>
        </Col>
        <Col md={4}>
          <div className='child-home-icon'>
            <i className='fas fa-check-double'></i>
            <h3>Authentic</h3>
            <p>Guaranteed all items are authentic.</p>
          </div>
        </Col>
        <Col md={4}>
          <div className='child-home-icon'>
            <i className='fas fa-shipping-fast'></i>
            <h3>Shipping</h3>
            <p>Worldwide shipping on all orders</p>
          </div>
        </Col>
      </Row>
    </Fragment>
  );
};

export default Welcome;
