import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import { selectCartProducts } from '../../store/selectors/product';

const checkout = ({ cartProducts }) => {
  return (
    <Table striped bordered hover className='mt-5'>
      <thead>
        <tr>
          <th>Product</th>
          <th>Description</th>
          <th>Quantity</th>
          <th>Price</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {cartProducts.map((product) => (
          <tr>
            <Fragment>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.quantity}</td>
              <td>{product.price}</td>
              <td>
                <i class='fas fa-trash-alt'></i>
              </td>
            </Fragment>
          </tr>
        ))}
        <tr>
          <td style={{ borderStyle: 'hidden' }}>Total</td>
          <td style={{ borderStyle: 'hidden' }}></td>
          <td style={{ borderStyle: 'hidden' }}></td>
          <td style={{ borderStyle: 'hidden' }}></td>
          <td style={{ borderStyle: 'hidden' }}>123123</td>
          {/* <td
            colSpan='5'
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <span>Total</span>
            <span>123</span>
          </td> */}
        </tr>
      </tbody>
    </Table>
  );
};

checkout.propTypes = {};

const mapStateToProps = createStructuredSelector({
  cartProducts: selectCartProducts,
});

export default connect(mapStateToProps)(checkout);
