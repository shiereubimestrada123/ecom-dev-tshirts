import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <Card style={{ width: '18rem', marginLeft: '20px', marginTop: '20px' }}>
      <Card.Img variant='top' src={`api/product/photo/${product._id}`} />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>{product.description}</Card.Text>
      </Card.Body>
      <Card.Body>
        <Link to='/' variant='light' className='mr-5'>
          View Product
        </Link>
        <Link to='/' variant='info'>
          Add to cart
        </Link>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
