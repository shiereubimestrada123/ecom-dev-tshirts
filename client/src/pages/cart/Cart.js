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
import { clearProductCart } from '../../store/actions/product';
import CardTemplate from '../../parts/card/CardTemplate';
import LoadingSpinner from '../../components/loadingspinner/LoadingSpinner';
import { Animated } from 'react-animated-css';

const Cart = ({
  cartProducts,
  total,
  clearProductCart,

  loading,
  user,
  isAuthenticated,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const history = useHistory();

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

            <Table responsive='sm md lg xl'>
              <thead>
                <tr className='tr-header'>
                  <th>Image</th>
                  <th className='mobile-hide'>Name</th>
                  <th className='mobile-hide'>Quantity</th>
                  <th>Price</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cartProducts.length > 0 ? (
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
                        <td className='mobile-hide'>{product.count}</td>
                        <td>{product.price}</td>
                        <td onClick={() => clearProductCart(product)}>
                          <i className='fas fa-trash-alt'></i>
                        </td>
                      </Fragment>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan='6' className='empty-cart'>
                      You have no existing item, please{' '}
                      <Link to='/shop'>Shop</Link> first
                    </td>
                  </tr>
                )}
                <tr>
                  <td className='no-border-right-td'>Total</td>
                  <td className='no-border-td mobile-hide'></td>
                  <td className='no-border-td mobile-hide'></td>
                  <td className='no-border-td'></td>
                  <td>{total}</td>
                </tr>
              </tbody>
            </Table>
            <div className='proceed-checkout'>{isButton()}</div>
          </Animated>
        </Fragment>
      )}
    </Fragment>
  );
};

Cart.propTypes = {
  clearProductCart: PropTypes.func.isRequired,
  // getBraintreeClientToken: PropTypes.func.isRequired,
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
})(Cart);
