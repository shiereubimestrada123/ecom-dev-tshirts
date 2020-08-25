import React, { Fragment, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { Table, Card, Spinner, Row, Col, Button } from 'react-bootstrap';
import {
  selectCartProducts,
  selectCartProductTotal,
} from '../../store/selectors/product';
import {
  selectAuthLoading,
  selectAuthUser,
  selectAuthAuthenticated,
} from '../../store/selectors/auth';
import { selectBraintreeClientToken } from '../../store/selectors/product';
import {
  clearProductCart,
  getBraintreeClientToken,
} from '../../store/actions/product';
import CardTemplate from '../../parts/card/CardTemplate';

const Cart = ({
  cartProducts,
  total,
  clearProductCart,
  getBraintreeClientToken,
  loading,
  user,
  isAuthenticated,
  clientToken,
}) => {
  const history = useHistory();

  useEffect(() => {
    const userId = user && user._id;

    getBraintreeClientToken(userId);
  }, [getBraintreeClientToken, user && user._id]);

  return (
    <Fragment>
      {loading ? (
        <Row style={{ textAlign: 'center', marginTop: '200px' }}>
          <Col className='spinner-class'>
            <Spinner animation='border' variant='info' />
          </Col>
        </Row>
      ) : (
        <Table striped bordered className='mt-5 table-parent'>
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
      )}
      <div className='proceed-checkout'>
        {cartProducts.length > 0 ? (
          <Button
            variant='info'
            type='submit'
            onClick={() => history.push('/checkout')}
          >
            Checkout
          </Button>
        ) : (
          <Button disabled variant='secondary'>
            Checkout
          </Button>
        )}
      </div>
    </Fragment>
  );
};

Cart.propTypes = {
  clearProductCart: PropTypes.func.isRequired,
  getBraintreeClientToken: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  cartProducts: selectCartProducts,
  total: selectCartProductTotal,
  loading: selectAuthLoading,
  user: selectAuthUser,
  isAuthenticated: selectAuthAuthenticated,
  clientToken: selectBraintreeClientToken,
});

export default connect(mapStateToProps, {
  clearProductCart,
  getBraintreeClientToken,
})(Cart);
