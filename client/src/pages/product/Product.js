import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { Row, Col, Badge, Button } from 'react-bootstrap';
import LoadingSpinner from '../../components/loadingspinner/LoadingSpinner';
import FormInput from '../../components/forms/forminput/FormInput';
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
}) => {
  useEffect(() => {
    getSingleProduct(match.params.productId);
    window.scrollTo(0, 0);
  }, []);

  const addToCart = () => {
    addProductCart(product);
  };

  return (
    <div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Row className='parent-single-product'>
          <Col md={8}>{product && <SingleCard product={product} />}</Col>
          <Col md={4} className='mt-3'>
            <Fragment>
              <p>Name: {product && product.name}</p>
              <p>Description: {product && product.description}</p>
              <p>Price: ${product && product.price}</p>
              {product && product.quantity > 0 ? (
                <Badge variant='secondary'>In Stock</Badge>
              ) : (
                <Badge variant='warning'>Out of stock</Badge>
              )}

              {/* <div className='holder-add-to-cart-button'>
                <FormInput
                  className='btn btn-block add-cart-btn'
                  type='submit'
                  value='Add to Cart'
                  onClick={addToCart}
                />
              </div> */}
              <br />
              <Button
                className='add-cart-btn shadow-none'
                type='submit'
                onClick={addToCart}
              >
                Add to Cart
              </Button>
            </Fragment>
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
