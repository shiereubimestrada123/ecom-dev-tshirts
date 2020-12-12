import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import FormInput from '../../components/forms/forminput/FormInput';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Row, Col, Spinner, Carousel } from 'react-bootstrap';
import { getCategories } from '../../store/actions/category';
import { getProducts, showCarouselProducts } from '../../store/actions/product';
import { selectAuthLoading } from '../../store/selectors/auth';
import {
  selectAllProducts,
  selectCarouselProducts,
} from '../../store/selectors/product';
import AlertPrompt from '../../components/alertprompt/AlertPrompt';
import home from '../../assets/images/home.jpg';
import { Animated } from 'react-animated-css';

const Home = ({
  getCategories,
  getProducts,
  showCarouselProducts,
  loading,
  products,
  carouselProducts,
}) => {
  useEffect(() => {
    getCategories();
    getProducts();
    showCarouselProducts();
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
                <Carousel>
                  {carouselProducts.map((product) => (
                    <Carousel.Item interval={1000} key={product._id}>
                      <Link to={`/product/${product._id}`}>
                        <img
                          style={{ height: '500px', width: '100%' }}
                          className=''
                          src={`/api/product/photo/${product._id}`}
                          alt={product.name}
                        />
                        <Carousel.Caption>
                          <h3>First slide label</h3>
                          <p>{product.name}</p>
                        </Carousel.Caption>
                      </Link>
                    </Carousel.Item>
                  ))}
                </Carousel>

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
  showCarouselProducts: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loading: selectAuthLoading,
  products: selectAllProducts,
  carouselProducts: selectCarouselProducts,
});

export default connect(mapStateToProps, {
  getCategories,
  getProducts,
  showCarouselProducts,
})(Home);
