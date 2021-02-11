import React, { Fragment, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { Row, Col, Badge, Button, Jumbotron, ListGroup } from 'react-bootstrap';
import LoadingSpinner from '../../components/loadingspinner/LoadingSpinner';
import FormInput from '../../components/forms/forminput/FormInput';
import { getSingleProduct, addProductCart } from '../../store/actions/product';
import {
  selectAuthLoading,
  selectAuthAuthenticated,
} from '../../store/selectors/auth';
import { selectSingleProduct } from '../../store/selectors/product';
import SingleCard from '../../parts/card/SingleCard';
import { Animated } from 'react-animated-css';

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

  let history = useHistory();

  const addToCart = () => {
    addProductCart(product);
    history.push('/cart');
  };

  return (
    <div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Animated animationIn='fadeIn' animationOut='fadeOut' isVisible={true}>
          <Row>
            <Col md={12}>
              <Jumbotron className='add-cart-jumbotron'>
                <h1>Add To Cart Page</h1>
              </Jumbotron>
            </Col>
          </Row>

          <Row className='parent-single-product'>
            <Col md={8}>{product && <SingleCard product={product} />}</Col>
            <Col md={4}>
              <Fragment>
                <div className='holder-add-cart'>
                  <ListGroup as='ul'>
                    <ListGroup.Item as='li'>
                      <span>Name:</span> {product && product.name}
                    </ListGroup.Item>
                    <ListGroup.Item as='li'>
                      <span>Description:</span> {product && product.description}
                    </ListGroup.Item>
                    <ListGroup.Item as='li'>
                      <span>Price:</span> ${product && product.price}
                    </ListGroup.Item>
                    {/* <ListGroup.Item>
                      {product && product.quantity > 0 ? (
                        <Badge variant='secondary'>In Stock</Badge>
                      ) : (
                        <Badge variant='warning'>Out of stock</Badge>
                      )}
                    </ListGroup.Item> */}
                  </ListGroup>

                  <div className='parent-add-btn'>
                    <Button
                      // variant='success'
                      className='add-cart-btn shadow-none'
                      type='submit'
                      onClick={addToCart}
                    >
                      Add To Cart
                    </Button>
                  </div>
                </div>
              </Fragment>
            </Col>
          </Row>
        </Animated>
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
