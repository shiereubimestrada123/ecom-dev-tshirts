import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { Row, Col, Button, Spinner } from 'react-bootstrap';
import { getSingleProduct, addProductCart } from '../../store/actions/product';
import {
  selectAuthLoading,
  selectAuthAuthenticated,
} from '../../store/selectors/auth';
import { selectSingleProduct } from '../../store/selectors/product';
import SingleCard from '../../parts/card/SingleCard';

const Product = ({
  match,
  getSingleProduct,
  addProductCart,
  product,
  loading,
  isAuthenticated,
  // auth: { loading, isAuthenticated },
}) => {
  const history = useHistory();

  useEffect(() => {
    const productId = match.params.productId;
    getSingleProduct(productId);
  }, []);

  const addToCart = () => {
    addProductCart(product);
    // history.push('/cart');
  };

  return (
    <div>
      {loading ? (
        <Row style={{ textAlign: 'center', marginTop: '200px' }}>
          <Col className='spinner-class'>
            <Spinner animation='border' variant='info' />
          </Col>
        </Row>
      ) : (
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
      )}
    </div>
  );
};

Product.propTypes = {
  getSingleProduct: PropTypes.func.isRequired,
  addProductCart: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loading: selectAuthLoading,
  isAuthenticated: selectAuthAuthenticated,
  product: selectSingleProduct,
  // product: state.product.product,
  // auth: state.auth,
});

export default connect(mapStateToProps, { getSingleProduct, addProductCart })(
  Product
);
