import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { Table, Card, Spinner, Row, Col } from 'react-bootstrap';
import {
  selectCartProducts,
  selectCartProductTotal,
} from '../../store/selectors/product';
import { selectAuthLoading } from '../../store/selectors/auth';
import CardTemplate from '../../parts/card/CardTemplate';
import { clearProductCart } from '../../store/actions/product';

const checkout = ({ cartProducts, total, clearProductCart, loading }) => {
  return (
    <Fragment>
      {loading ? (
        <Row style={{ textAlign: 'center', marginTop: '200px' }}>
          <Col className='spinner-class'>
            <Spinner animation='border' variant='info' />
          </Col>
        </Row>
      ) : (
        <Table striped bordered className='mt-5'>
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
                          classImage='checkout-image'
                          variant='top'
                        />
                      </Card>
                    </td>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>{product.quantity}</td>
                    <td>{product.price}</td>
                    <td onClick={() => clearProductCart(product)}>
                      <i className='fas fa-trash-alt'></i>
                    </td>
                  </Fragment>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='6' className='empty-checkout'>
                  You have no existing item go to <Link to='/shop'>Shop</Link>
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
    </Fragment>
  );
};

checkout.propTypes = {
  clearProductCart: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  cartProducts: selectCartProducts,
  total: selectCartProductTotal,
  loading: selectAuthLoading,
});

export default connect(mapStateToProps, { clearProductCart })(checkout);
