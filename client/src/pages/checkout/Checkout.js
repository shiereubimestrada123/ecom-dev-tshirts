import React, { Fragment, useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Row,
  Col,
  Form,
  Jumbotron,
  Button,
  Table,
  InputGroup,
} from 'react-bootstrap';
import { createStructuredSelector } from 'reselect';
import AlertPrompt from '../../components/alertprompt/AlertPrompt';
import { Animated } from 'react-animated-css';
import { selectAuthUser, selectAuthLoading } from '../../store/selectors/auth';
import {
  selectCartProductTotal,
  selectCartProducts,
  selectCartProductCount,
} from '../../store/selectors/product';
import { createOrder } from '../../store/actions/product';
import LoadingSpinner from '../../components/loadingspinner/LoadingSpinner';

const Checkout = ({
  loading,
  user,
  cartProducts,
  total,
  createOrder,
  productCount,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    email: '',
    contact: '',
  });
  const history = useHistory();

  const { name, address, email, contact } = formData;

  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const buy = () => {
    let transactionId = Math.random().toString(36).substr(2, 9);
    const userId = user && user._id;

    const createOrderData = {
      transactionId: transactionId,
      products: cartProducts,
      total: total,
      name: name,
      address: address,
      email: email,
      contact: contact,
    };

    createOrder(userId, createOrderData);
    if (name || address || email || contact !== '') {
      history.push('/shop');
    }
  };

  return (
    <Row>
      <Col>
        <AlertPrompt />
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
                  <Jumbotron className='checkout-jumbotron'>
                    <h1>Checkout Page</h1>
                  </Jumbotron>
                </Col>
              </Row>

              <Row>
                <Col md={8}>
                  <section className='holder-checkout-page'>
                    <div className='parent-checkout-page'>
                      <div className='checkout-heading'>
                        <h3>Delivery Address</h3>
                      </div>
                      <div className='checkout-body'>
                        <Form className='checkout-form-parent'>
                          <Form.Group className='form-group'>
                            <InputGroup className='mb-3'>
                              <InputGroup.Prepend>
                                <InputGroup.Text id='basic-addon1'>
                                  Name
                                </InputGroup.Text>
                              </InputGroup.Prepend>
                              <Form.Control
                                type='name'
                                name='name'
                                value={name || ''}
                                onChange={(e) => onChange(e)}
                              />
                            </InputGroup>
                          </Form.Group>

                          <Form.Group className='form-group'>
                            <InputGroup className='mb-3'>
                              <InputGroup.Prepend>
                                <InputGroup.Text id='basic-addon1'>
                                  Email
                                </InputGroup.Text>
                              </InputGroup.Prepend>
                              <Form.Control
                                type='email'
                                name='email'
                                value={email || ''}
                                onChange={(e) => onChange(e)}
                              />
                            </InputGroup>
                          </Form.Group>

                          <Form.Group className='form-group'>
                            <InputGroup className='mb-3'>
                              <InputGroup.Prepend>
                                <InputGroup.Text id='basic-addon1'>
                                  Address
                                </InputGroup.Text>
                              </InputGroup.Prepend>
                              <Form.Control
                                type='text'
                                name='address'
                                value={address || ''}
                                onChange={(e) => onChange(e)}
                              />
                            </InputGroup>
                          </Form.Group>

                          <Form.Group className='form-group'>
                            <InputGroup className='mb-3'>
                              <InputGroup.Prepend>
                                <InputGroup.Text id='basic-addon1'>
                                  Contact Number
                                </InputGroup.Text>
                              </InputGroup.Prepend>
                              <Form.Control
                                type='text'
                                name='contact'
                                value={contact || ''}
                                onChange={(e) => onChange(e)}
                              />
                            </InputGroup>
                          </Form.Group>
                        </Form>
                      </div>
                    </div>
                  </section>
                </Col>
                <Col md={4}>
                  <section className='holder-order-details'>
                    <Table responsive='sm md lg xl'>
                      <thead>
                        <tr className='tr-header'>
                          <th colSpan='2' className='product-name'>
                            <h3>Order Details</h3>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className='td-left remove-border'># Item(s)</td>
                          <td className='td-right remove-border'>
                            {productCount}
                          </td>
                        </tr>
                        <tr>
                          <td className='td-left'>Total</td>
                          <td className='td-right'>{total}</td>
                        </tr>
                      </tbody>
                    </Table>
                    <div className='parent-order-button'>
                      <Button
                        variant='success'
                        className='button shadow-none'
                        type='submit'
                        onClick={buy}
                      >
                        Place Order
                      </Button>
                    </div>
                  </section>
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
