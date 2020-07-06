import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';

const Shop = (props) => {
  return (
    <Row>
      <Col md={3}>left</Col>
      <Col md={9}>right</Col>
    </Row>
  );
};

Shop.propTypes = {};

export default Shop;
