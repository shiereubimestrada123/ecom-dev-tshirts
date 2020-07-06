import React, { Fragment, useEffect } from 'react';
import AlertPrompt from '../../components/alertprompt/AlertPrompt';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import ProductCard from '../../parts/productcard/ProductCard';
import {
  loadProductsBySell,
  loadProductsByArrival,
} from '../../store/actions/product';

const Shop = ({
  product: { productsSell, productsArrival },
  loadProductsBySell,
  loadProductsByArrival,
}) => {
  useEffect(() => {
    loadProductsBySell('sold');
    loadProductsByArrival('createdAt');
  }, [loadProductsBySell, loadProductsByArrival]);

  return (
    <Fragment>
      <AlertPrompt />
      <Row>
        <Col md={2}>
          <div className=' mt-4 mb-4'>Left</div>
        </Col>
        <Col md={10}>
          {' '}
          <div className='shop-card mt-2 mb-4'>
            {productsSell.map((product, index) => (
              <ProductCard
                key={index}
                product={product}
                className='product-card'
              />
            ))}
          </div>
        </Col>
      </Row>
    </Fragment>
  );
};

Shop.propTypes = {
  loadProductsBySell: PropTypes.func.isRequired,
  loadProductsByArrival: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  product: state.product,
});

export default connect(mapStateToProps, {
  loadProductsBySell,
  loadProductsByArrival,
})(Shop);
