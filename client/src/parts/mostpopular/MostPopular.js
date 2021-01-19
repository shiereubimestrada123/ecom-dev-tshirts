import React from 'react';
import { Row, Col } from 'react-bootstrap';
import ShopCard from '../../parts/card/ShopCard';

const MostPopular = ({ soldProducts }) => {
  return (
    <Row>
      <Col md={12}>
        <div className='holder-most-popular'>
          <span className='child-most-popular'></span>
          <h2 className='mt-5'>Most Popular</h2>
          <div className='home-card mt-2 mb-4'>
            {soldProducts.map((product, index) => (
              <ShopCard product={product} key={index} />
            ))}
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default MostPopular;
