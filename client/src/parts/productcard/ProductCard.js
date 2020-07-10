import React, { Fragment } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProductCard = ({ filteredProducts, selectedCategoryId }) => {
  return (
    <Fragment>
      {filteredProducts &&
        filteredProducts.map((product, index) => (
          <div key={index}>
            {product.category._id === selectedCategoryId && (
              <Card
                style={{
                  width: '14rem',
                  marginLeft: '20px',
                  marginTop: '20px',
                }}
              >
                <Card.Img
                  variant='top'
                  src={`api/product/photo/${product._id}`}
                />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>{product.description}</Card.Text>
                </Card.Body>
                <Card.Body>
                  <Link to='/' variant='light' className='mr-5'>
                    View
                  </Link>
                  <Link to='/' variant='info'>
                    Add to cart
                  </Link>
                </Card.Body>
              </Card>
            )}
          </div>
        ))}
    </Fragment>
  );
};

export default ProductCard;
