import React, { Fragment, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { Table, Card, Button, Jumbotron, Row, Col } from 'react-bootstrap';
import {
  selectCartProducts,
  selectCartProductTotal,
} from '../../store/selectors/product';
import {
  selectAuthLoading,
  selectAuthUser,
  selectAuthAuthenticated,
} from '../../store/selectors/auth';
import {
  clearProductCart,
  addProductCart,
  decreaseProductCart,
} from '../../store/actions/product';
import CardTemplate from '../../parts/card/CardTemplate';
import LoadingSpinner from '../../components/loadingspinner/LoadingSpinner';
import { Animated } from 'react-animated-css';

const Cart = ({
  cartProducts,
  total,
  clearProductCart,
  addProductCart,
  decreaseProductCart,
  loading,
  user,
  isAuthenticated,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const history = useHistory();

  const addQuantity = (product) => {
    addProductCart(product);
  };

  const handleOnclick = () => {
    history.push('/shop');
  };

  const isButton = () => {
    if (cartProducts.length > 0) {
      if (isAuthenticated) {
        return (
          <Button
            className='checkout-btn shadow-none'
            type='submit'
            onClick={() => history.push('/checkout')}
          >
            Checkout
          </Button>
        );
      } else {
        return (
          <Button
            className='login-checkout-btn shadow-none'
            type='submit'
            onClick={() => history.push('/checkout')}
          >
            Please login to checkout
          </Button>
        );
      }
    }
  };

  return (
    <Fragment>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Fragment>
          <Animated
            animationIn='fadeIn'
            animationOut='fadeOut'
            isVisible={true}
          >
            <Row>
              <Col md={12}>
                <Jumbotron className='shopping-cart'>
                  <h1>My Shopping Cart</h1>
                </Jumbotron>
              </Col>
            </Row>

            {cartProducts.length > 0 ? (
              <Table responsive='sm md lg xl'>
                <thead>
                  <tr className='tr-header'>
                    <th>Image</th>
                    <th className='mobile-hide'>Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className='tbody-cart'>
                  {cartProducts.length > 0 &&
                    cartProducts.map((product, index) => (
                      <tr key={index}>
                        <Fragment>
                          <td>
                            <Card className='cart-card'>
                              <CardTemplate
                                product={product}
                                src={`/api/product/photo/${product._id}`}
                                classImage='cart-image'
                                variant='top'
                              />
                            </Card>
                          </td>
                          <td className='mobile-hide'>{product.name}</td>
                          <td>
                            {product.count > 1 ? (
                              <span
                                className='decrease-quantity'
                                onClick={() => decreaseProductCart(product)}
                              >
                                &#65308;
                              </span>
                            ) : (
                              <span
                                className='decrease-quantity'
                                onClick={() => clearProductCart(product)}
                              >
                                &#65308;
                              </span>
                            )}{' '}
                            {product.count}{' '}
                            <span
                              className='increase-quantity'
                              onClick={() => addQuantity(product)}
                            >
                              &#65310;
                            </span>
                          </td>
                          <td>{product.price}</td>
                          <td onClick={() => clearProductCart(product)}>
                            <i className='fas fa-trash-alt'></i>
                          </td>
                        </Fragment>
                      </tr>
                    ))}
                  <tr>
                    <td className='no-border-right-td'>Total</td>
                    <td className='no-border-td mobile-hide'></td>
                    <td className='no-border-td '></td>
                    <td className='no-border-td'></td>
                    <td>{total}</td>
                  </tr>
                </tbody>
              </Table>
            ) : (
              <Row>
                <Col md={12}>
                  <div className='empty-cart'>
                    <h5>You have no existing item please shop first</h5>
                    <Button
                      variant='secondary'
                      className='button-goback shadow-none'
                      type='submit'
                      onClick={handleOnclick}
                    >
                      Shop
                    </Button>
                  </div>
                </Col>
              </Row>
            )}
            <div className='proceed-checkout'>{isButton()}</div>
          </Animated>
        </Fragment>
      )}
    </Fragment>
  );
};

Cart.propTypes = {
  clearProductCart: PropTypes.func.isRequired,
  addProductCart: PropTypes.func.isRequired,
  decreaseProductCart: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  cartProducts: selectCartProducts,
  total: selectCartProductTotal,
  loading: selectAuthLoading,
  user: selectAuthUser,
  isAuthenticated: selectAuthAuthenticated,
});

export default connect(mapStateToProps, {
  clearProductCart,
  addProductCart,
  decreaseProductCart,
})(Cart);
