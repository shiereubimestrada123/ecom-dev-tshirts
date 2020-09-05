import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FormInput from '../../components/forms/forminput/FormInput';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Row, Col, Spinner } from 'react-bootstrap';
import { getCategories } from '../../store/actions/category';
import { getProducts } from '../../store/actions/product';
import { selectAuthLoading } from '../../store/selectors/auth';
import { selectAllProducts } from '../../store/selectors/product';
import AlertPrompt from '../../components/alertprompt/AlertPrompt';
import home from '../../assets/images/home.jpg';

const Home = ({ getCategories, getProducts, loading, products }) => {
  useEffect(() => {
    getCategories();
    getProducts();
    console.log(products);
  }, [getCategories, getProducts]);
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Fragment>
      <AlertPrompt />
      <Row>
        <Col>
          {loading ? (
            <Row style={{ textAlign: 'center', marginTop: '200px' }}>
              <Col className='spinner-class'>
                <Spinner animation='border' variant='info' />
              </Col>
            </Row>
          ) : (
            <div className='parent-home'>
              <img src={home} />
              <div class='parent-home-image'>
                <FormInput
                  name='test'
                  id='test'
                  className='btn btn-block home-btn'
                  type='button'
                  value='SHOP NOW'
                />
              </div>
            </div>
          )}
        </Col>
      </Row>
    </Fragment>
  );
};

Home.propTypes = {
  getCategories: PropTypes.func.isRequired,
  getProducts: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loading: selectAuthLoading,
  products: selectAllProducts,
});

export default connect(mapStateToProps, { getCategories, getProducts })(Home);
