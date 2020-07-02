import React, { Fragment, useEffect } from 'react';
import AlertPrompt from '../../components/alertprompt/AlertPrompt';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadProductsBySell } from '../../store/actions/product';

const Home = ({ product }) => {
  useEffect(() => {
    loadProductsBySell();
  }, [loadProductsBySell]);

  console.log(product);

  return (
    <Fragment>
      <AlertPrompt />
      <h1>home</h1>
    </Fragment>
  );
};

Home.propTypes = {
  loadProductsBySell: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  product: state.product,
});

export default connect(mapStateToProps, { loadProductsBySell })(Home);
