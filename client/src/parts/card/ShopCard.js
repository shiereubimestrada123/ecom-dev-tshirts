import React from 'react';
import { useHistory } from 'react-router-dom';
import { Card } from 'react-bootstrap';

const ShopCard = ({ product }) => {
  const history = useHistory();

  const handleRedirect = () => {
    history.push(`/product/${product._id}`);
  };

  return (
    <Card>
      <Card.Img variant='top' src={`/api/product/photo/${product._id}`} />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>{product.description}</Card.Text>
        <button onClick={handleRedirect}>View</button>
      </Card.Body>
    </Card>
  );
};

export default ShopCard;
