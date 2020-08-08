import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import CardTemplate from '../../parts/card/CardTemplate';
import { Card } from 'react-bootstrap';

const CartDropdown = ({ product }) => {
  return (
    <Fragment>
      <Card
        style={{
          width: '5rem',
          marginLeft: '20px',
          marginTop: '20px',
        }}
      >
        <CardTemplate
          product={product}
          src={`/api/product/photo/${product._id}`}
          classImage='cart-image'
          variant='top'
        />
      </Card>
      <div className=''>
        <span className=''>{product.name}</span>
        <span className=''>
          {product.count} x ${product.price}
        </span>
      </div>
    </Fragment>
  );
};

CartDropdown.propTypes = {
  product: PropTypes.object.isRequired,
};

export default CartDropdown;
