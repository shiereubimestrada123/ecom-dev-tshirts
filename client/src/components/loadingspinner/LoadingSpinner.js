import React from 'react';
import { Row, Col, Spinner } from 'react-bootstrap';

const LoadingSpinner = (props) => {
  return (
    <div style={{ textAlign: 'center', marginTop: '200px' }}>
      <Row>
        <Col>
          <Spinner animation='border' variant='info' />
        </Col>
      </Row>
    </div>
  );
};

export default LoadingSpinner;
