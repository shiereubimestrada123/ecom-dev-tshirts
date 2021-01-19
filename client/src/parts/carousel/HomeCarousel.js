import React from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Row, Col } from 'react-bootstrap';

const HomeCarousel = ({ soldProducts }) => {
  return (
    <Row className='row-carousel'>
      <Col md={12}>
        <Carousel interval={3000} indicators={false}>
          {soldProducts.map((product) => (
            <Carousel.Item key={product._id}>
              <Link to={`/product/${product._id}`}>
                <img
                  style={{ height: '500px', width: '100%' }}
                  className=''
                  src={`/api/product/photo/${product._id}`}
                  alt={product.name}
                />
              </Link>
            </Carousel.Item>
          ))}
        </Carousel>
      </Col>
    </Row>
  );
};

export default HomeCarousel;
