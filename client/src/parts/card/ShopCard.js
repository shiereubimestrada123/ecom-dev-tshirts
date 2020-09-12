import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CardTemplate from './CardTemplate';
import { addProductCart } from '../../store/actions/product';

const ShopCard = ({ product, addProductCart }) => {
  return (
    <Card
      style={{
        width: '18rem',
        marginLeft: '20px',
        marginTop: '20px',
      }}
    >
      <CardTemplate
        product={product}
        src={`/api/product/photo/${product._id}`}
        classImage='product-image'
        variant='top'
      />

      <Card.Body className='overlay'>
        <Link
          to={`/product/${product._id}`}
          variant='light'
          className='mr-5 product-text'
        >
          View
        </Link>
      </Card.Body>
    </Card>
  );
};

ShopCard.propTypes = {
  addProductCart: PropTypes.func.isRequired,
};

export default connect(null, { addProductCart })(ShopCard);
