import React, { Fragment } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import ProductCard from '../../parts/productcard/ProductCard';
import ProductCard from '../../parts/productcard/ProductCard';
import { Row, Col } from 'react-bootstrap';

const Product = ({ products }) => {
  console.log(products);
  return (
    <div>
      <Row className='mt-5'>
        <Col>asdasdasd</Col>
      </Row>
    </div>
  );
};

// Product.propTypes = {};

const mapStateToProps = (state) => ({
  products: state.product.products,
});

export default connect(mapStateToProps)(Product);
