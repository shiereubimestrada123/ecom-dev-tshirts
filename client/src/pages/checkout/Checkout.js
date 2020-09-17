import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Spinner, Form } from 'react-bootstrap';
import FormInput from '../../components/forms/forminput/FormInput';
import { Animated } from 'react-animated-css';
import { createStructuredSelector } from 'reselect';
import { selectAuthUser, selectAuthLoading } from '../../store/selectors/auth';
import {
  selectCartProductTotal,
  selectCartProducts,
  selectCartProductCount,
} from '../../store/selectors/product';
import { createOrder } from '../../store/actions/product';

const Checkout = ({
  loading,
  user,
  cartProducts,
  total,
  createOrder,
  productCount,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    email: '',
    contact: '',
  });

  const { name, address, email, contact } = formData;

  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const onSubmit = async (e) => {
    e.preventDefault();
    // login(email, password);
  };

  const buy = () => {
    const userId = user && user._id;

    const createOrderData = {
      products: cartProducts,
      total: total,
      name: name,
      address: address,
      email: email,
      contact: contact,
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
          <Fragment>
            <Animated
              animationIn='fadeIn'
              animationOut='fadeOut'
              isVisible={true}
            >
              <Row>
                <Col>
                  <h1 className='heading-checkout'>Secure Checkout</h1>
                </Col>
              </Row>
              <Row>
                <Col md={9}>
                  <div className='checkout-wrapper'>
                    <Form
                      className='checkout-form-parent'
                      onSubmit={(e) => onSubmit(e)}
                    >
                      <Form.Group className='form-group'>
                        <Form.Label className='form-label'>Name</Form.Label>
                        <FormInput
                          type='text'
                          placeholder='Enter name'
                          name='name'
                          value={name}
                          onChange={(e) => onChange(e)}
                          className='form-control'
                        />
                      </Form.Group>

                      <Form.Group className='form-group'>
                        <Form.Label className='form-label'>
                          Email address
                        </Form.Label>
                        <FormInput
                          type='email'
                          placeholder='Enter email'
                          name='email'
                          value={email}
                          onChange={(e) => onChange(e)}
                          className='form-control'
                        />
                      </Form.Group>

                      <Form.Group className='form-group'>
                        <Form.Label className='form-label'>Address</Form.Label>

                        <FormInput
                          type='text'
                          placeholder='Enter address'
                          name='address'
                          value={address}
                          onChange={(e) => onChange(e)}
                          className='form-control'
                        />
                      </Form.Group>

                      <Form.Group className='form-group'>
                        <Form.Label className='form-label'>
                          Contact number
                        </Form.Label>

                        <FormInput
                          type='number'
                          placeholder='Enter contact number'
                          name='contact'
                          value={contact}
                          onChange={(e) => onChange(e)}
                          className='form-control'
                        />
                      </Form.Group>
                    </Form>
                  </div>
                </Col>
                <Col md={3}>
                  <div className='holder-payment'>
                    <h3>Order Details</h3>
                    <div className='checkout-product-count'>
                      <span> # item(s)</span>
                      <span>{productCount}</span>
                    </div>
                    <div className='checkout-total'>
                      <span>Total</span>
                      <span>&#8369;{total}</span>
                    </div>
                    <div className='holder-place-order-button'>
                      <FormInput
                        className='btn btn-block place-order-btn'
                        type='submit'
                        value='Place order'
                        onClick={buy}
                      />
                    </div>
                  </div>
                </Col>
              </Row>
            </Animated>
          </Fragment>
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
  productCount: selectCartProductCount,
});

export default connect(mapStateToProps, {
  createOrder,
})(Checkout);
