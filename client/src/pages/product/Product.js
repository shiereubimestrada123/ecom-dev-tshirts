import React, { Fragment, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { getSingleProduct } from '../../store/actions/product';
import SingleCard from '../../parts/card/SingleCard';
import { Button } from 'react-bootstrap';

const Product = ({ match, getSingleProduct, product, isAuthenticated }) => {
  const history = useHistory();

  useEffect(() => {
    const productId = match.params.productId;
    getSingleProduct(productId);
  }, []);

  const addToCart = () => {
    if (isAuthenticated) {
      history.push('/cart');
    } else {
      history.push('/register');
    }
  };

  return (
    <div>
      <Row className='mt-5'>
        <Col md={8}>{product && <SingleCard product={product} />}</Col>
        <Col md={4} className='mt-5'>
          <p>Name: {product && product.name}</p>
          <p>Description: {product && product.description}</p>
          <p>Price: ${product && product.price}</p>
          <Button variant='info' onClick={addToCart}>
            Add to Cart
          </Button>
        </Col>
      </Row>
    </div>
  );
};

Product.propTypes = {
  getSingleProduct: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  product: state.product.product,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { getSingleProduct })(Product);
