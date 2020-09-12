import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col, Spinner } from 'react-bootstrap';
import FormInput from '../../components/forms/forminput/FormInput';
import { createStructuredSelector } from 'reselect';
import { selectAuthUser } from '../../store/selectors/auth';
import { selectAuthLoading } from '../../store/selectors/auth';
import {
  selectCartProductTotal,
  selectBraintreeClientToken,
  selectCartProducts,
  selectInstance,
} from '../../store/selectors/product';
import {
  getBraintreeClientToken,
  processPayment,
  clearCart,
} from '../../store/actions/product';
import DropIn from 'braintree-web-drop-in-react';

const Checkout = ({
  loading,
  user,
  clientToken,
  instance,
  getBraintreeClientToken,
  processPayment,
  cartProducts,
  total,
}) => {
  useEffect(() => {
    const userId = user && user._id;

    getBraintreeClientToken(userId);
  }, [user]);

  const buy = () => {
    let nonce;
    let getNonce = clientToken.instance
      .requestPaymentMethod()
      .then((data) => {
        nonce = data.nonce;

        const paymentData = {
          paymentMethodNonce: nonce,
          amount: total,
        };

        const userId = user && user._id;
        // clearCart();
        processPayment(userId, paymentData);

        // console.log(paymentData);
      })
      .catch((error) => {
        console.log('error');
        console.log(error);
      });
  };

  return (
    <div className='holder-payment'>
      {clientToken != null && cartProducts.length > 0 && (
        <Fragment>
          <DropIn
            options={{
              authorization: clientToken.clientToken,
              paypal: {
                flow: 'vault',
              },
            }}
            onInstance={(instance) => (clientToken.instance = instance)}
          />

          <div className='holder-place-order-button'>
            <FormInput
              className='btn btn-block place-order-btn'
              type='submit'
              value='Place order'
              onClick={buy}
            />
          </div>
        </Fragment>
      )}
    </div>
  );
};

Checkout.propTypes = { getBraintreeClientToken: PropTypes.func.isRequired };

const mapStateToProps = createStructuredSelector({
  user: selectAuthUser,
  clientToken: selectBraintreeClientToken,
  cartProducts: selectCartProducts,
  instance: selectInstance,
  total: selectCartProductTotal,
  loading: selectAuthLoading,
});

export default connect(mapStateToProps, {
  getBraintreeClientToken,
  processPayment,
  clearCart,
})(Checkout);
