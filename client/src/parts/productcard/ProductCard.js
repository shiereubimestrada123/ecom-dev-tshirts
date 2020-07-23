import React, { Fragment } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProductCard = ({ allProducts, selectedCategoryId }) => {
  // const showPerCategory =
  //   products &&
  //   products.map((product, index) => (
  //     <div key={index}>
  //       {product.category._id === selectedCategoryId && (
  //         <Card
  //           style={{
  //             width: '14rem',
  //             marginLeft: '20px',
  //             marginTop: '20px',
  //           }}
  //         >
  //           <Card.Img variant='top' src={`api/product/photo/${product._id}`} />
  //           <Card.Body>
  //             <Card.Title>{product.name}</Card.Title>
  //             <Card.Text>{product.description}</Card.Text>
  //           </Card.Body>
  //           <Card.Body>
  //             <Link to='/' variant='light' className='mr-5'>
  //               View
  //             </Link>
  //             <Link to='/' variant='info'>
  //               Add to cart
  //             </Link>
  //           </Card.Body>
  //         </Card>
  //       )}
  //     </div>
  //   ));

  const showAll = allProducts.map((product, index) => (
    <div key={index}>
      <Card
        style={{
          width: '18rem',
          marginLeft: '20px',
          marginTop: '20px',
        }}
      >
        <Card.Img
          className='product-image'
          variant='top'
          src={`api/product/photo/${product._id}`}
        />
        {/* <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>{product.description}</Card.Text>
          <Card.Text>${product.price}</Card.Text>
        </Card.Body> */}
        <Card.Body className='overlay'>
          <Link
            to={`/product/${product._id}`}
            variant='light'
            className='mr-5 product-text'
          >
            View
          </Link>
          {/* <Link to='/' variant='info'>
            Add to cart
          </Link> */}
        </Card.Body>
      </Card>
    </div>
  ));

  return <Fragment>{showAll}</Fragment>;
};

export default ProductCard;
