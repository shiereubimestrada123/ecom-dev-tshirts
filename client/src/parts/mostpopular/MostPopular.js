import React from 'react';
import { Fragment } from 'react';
import { Row, Col } from 'react-bootstrap';
import ShopCard from '../../parts/card/ShopCard';

const MostPopular = ({ soldProducts }) => {
  return (
    <Fragment>
      <Row>
        <Col md={12}>
          <div className='holder-most-popular'>
            <span className='child-most-popular'></span>
            <h2 className='mt-5'>Most Popular</h2>
          </div>
        </Col>
      </Row>

      <Row>
        {soldProducts.map((product, index) => (
          <Col md={4} className='mb-4'>
            <ShopCard product={product} key={index} />
          </Col>
        ))}
      </Row>
    </Fragment>
  );
};

export default MostPopular;
