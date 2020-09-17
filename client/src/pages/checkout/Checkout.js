import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Spinner } from 'react-bootstrap';
import FormInput from '../../components/forms/forminput/FormInput';
import { createStructuredSelector } from 'reselect';
import { selectAuthUser } from '../../store/selectors/auth';
import { selectAuthLoading } from '../../store/selectors/auth';
import {
  selectCartProductTotal,
  selectCartProducts,
} from '../../store/selectors/product';
import { createOrder } from '../../store/actions/product';

const Checkout = ({ loading, user, cartProducts, total, createOrder }) => {
  const buy = () => {
    const userId = user && user._id;

    const createOrderData = {
      products: cartProducts,
      total: total,
    };

    createOrder(userId, createOrderData);
  };

  return (
    <Row>
      <Col>
        {loading ? (
          <Row style={{ textAlign: 'center', marginTop: '200px' }}>
            <Col className='spinner-class'>
              <Spinner animation='border' variant='info' />
            </Col>
          </Row>
        ) : (
          <div className='holder-payment'>
            <div className='holder-place-order-button'>
              <FormInput
                className='btn btn-block place-order-btn'
                type='submit'
                value='Place order'
                onClick={buy}
              />
            </div>
          </div>
        )}
      </Col>
    </Row>
  );
};

const mapStateToProps = createStructuredSelector({
  user: selectAuthUser,
  cartProducts: selectCartProducts,
  total: selectCartProductTotal,
  loading: selectAuthLoading,
});

export default connect(mapStateToProps, {
  createOrder,
})(Checkout);
