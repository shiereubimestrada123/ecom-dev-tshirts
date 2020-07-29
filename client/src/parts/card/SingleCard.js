import React, { Fragment } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CardTemplate from './CardTemplate';

const ShopCard = ({ product }) => {
  return (
    <Card
      style={{
        width: '30rem',
        marginLeft: '20px',
        marginTop: '20px',
      }}
    >
      <CardTemplate
        product={product}
        src={`/api/product/photo/${product._id}`}
        classImage='single-image'
        variant='top'
      />
    </Card>
  );
};

export default ShopCard;
