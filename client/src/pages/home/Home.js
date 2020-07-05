import React, { Fragment, useEffect } from 'react';
import AlertPrompt from '../../components/alertprompt/AlertPrompt';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card } from 'react-bootstrap';
import ProductCard from './ProductCard';
import {
  loadProductsBySell,
  loadProductsByArrival,
} from '../../store/actions/product';

const Home = ({
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
      <Card style={{ width: '18rem' }}>
        {productsSell.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </Card>
    </Fragment>
  );
};

Home.propTypes = {
  loadProductsBySell: PropTypes.func.isRequired,
  loadProductsByArrival: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  product: state.product,
});

export default connect(mapStateToProps, {
  loadProductsBySell,
  loadProductsByArrival,
})(Home);
