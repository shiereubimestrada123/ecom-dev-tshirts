import React, { Fragment, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { Table, Card, Button } from 'react-bootstrap';
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
            className='checkout-btn'
            type='submit'
            onClick={() => history.push('/checkout')}
          >
            Checkout
          </Button>
        );
      } else {
        return (
          <Button
            className='login-checkout-btn'
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
          <h1 className='shopping-cart'>My Shopping Cart</h1>
          <Table responsive='sm md lg xl' striped bordered>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Description</th>
                <th>Quantity</th>
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
                        <Card
                          style={{
                            width: '10rem',
                          }}
                        >
                          <CardTemplate
                            product={product}
                            src={`/api/product/photo/${product._id}`}
                            classImage='cart-image'
                            variant='top'
                          />
                        </Card>
                      </td>
                      <td>{product.name}</td>
                      <td>{product.description}</td>
                      <td>{product.count}</td>
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
                    You have no existing item, please go to{' '}
                    <Link to='/shop'>Shop</Link>
                  </td>
                </tr>
              )}
              <tr>
                <td colSpan='5'>Total</td>
                <td>{total}</td>
              </tr>
            </tbody>
          </Table>
          <div className='proceed-checkout'>{isButton()}</div>
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
