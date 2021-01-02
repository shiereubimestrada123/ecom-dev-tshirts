import React from 'react';
import { Row, Col, Spinner } from 'react-bootstrap';

const LoadingSpinner = (props) => {
  return (
    <Row style={{ textAlign: 'center', marginTop: '200px' }}>
      <Col>
        <Spinner animation='border' variant='info' />
      </Col>
    </Row>
  );
};

export default LoadingSpinner;
