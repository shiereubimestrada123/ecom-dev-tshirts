import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <Card style={{ width: '18rem' }}>
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

ProductCard.propTypes = {};

export default ProductCard;
