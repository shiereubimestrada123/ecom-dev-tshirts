import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import CardTemplate from './CardTemplate';
import { addProductCart } from '../../store/actions/product';

const ShopCard = ({ product, addProductCart }) => {
  const history = useHistory();

  const handleRedirect = () => {
    history.push(`/product/${product._id}`);
  };

  return (
    <Card style={{ width: '18rem', marginLeft: '20px', marginTop: '20px' }}>
      <Card.Img variant='top' src={`/api/product/photo/${product._id}`} />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>{product.description}</Card.Text>
        <button onClick={handleRedirect}>View</button>
      </Card.Body>
    </Card>
  );
};

ShopCard.propTypes = {
  addProductCart: PropTypes.func.isRequired,
};

export default connect(null, { addProductCart })(ShopCard);
