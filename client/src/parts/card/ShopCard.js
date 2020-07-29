import React, { Fragment } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CardTemplate from './CardTemplate';

const ShopCard = ({ product }) => {
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

export default ShopCard;
