import React from 'react';
import { Card } from 'react-bootstrap';
import CardTemplate from './CardTemplate';

const SingleCard = ({ product }) => {
  return (
    <Card>
      <CardTemplate
        product={product}
        src={`/api/product/photo/${product._id}`}
        classImage='single-image'
        variant='top'
      />
    </Card>
  );
};

export default SingleCard;
