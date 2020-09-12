import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
import { Animated } from 'react-animated-css';

const Home = ({ getCategories, getProducts, loading, products }) => {
  useEffect(() => {
    getCategories();
    getProducts();
  }, []);

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
            <Fragment>
              <Animated
                animationIn='fadeIn'
                animationOut='fadeOut'
                isVisible={true}
              >
                <div className='parent-home'>
                  <img className='big-image' src={home} alt='home' />
                  <div className='parent-home-image'>
                    <Link to='/shop' style={{ textDecoration: 'none' }}>
                      <FormInput
                        name='test'
                        id='test'
                        className='btn btn-block home-btn'
                        type='button'
                        value='SHOP NOW'
                      />
                    </Link>
                  </div>
                </div>

                <h1 className='home-header'>Welcome to EcomDev</h1>
                <div className='parent-home-icons'>
                  <div className='child-home-icon'>
                    <i className='fas fa-undo-alt'></i>
                    <h3>return title</h3>
                    <p>
                      Curabitur arcu erat accumsan id imperdiet et porttitor at
                      sem.
                    </p>
                  </div>
                  <div className='child-home-icon'>
                    <i className='fas fa-check-double'></i>
                    <h3>authentic title</h3>
                    <p>
                      Curabitur arcu erat accumsan id imperdiet et porttitor at
                      sem.
                    </p>
                  </div>
                  <div className='child-home-icon'>
                    <i className='fas fa-shipping-fast'></i>
                    <h3>shipping title</h3>
                    <p>
                      Curabitur arcu erat accumsan id imperdiet et porttitor at
                      sem.
                    </p>
                  </div>
                </div>

                <div className='holder-new-arrival'>
                  <span className='child-new-arrival'>asdasd</span>
                </div>
              </Animated>
            </Fragment>
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
