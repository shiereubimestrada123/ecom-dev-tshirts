import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Row, Col, Carousel, Form, Button } from 'react-bootstrap';
import { getCategories } from '../../store/actions/category';
import {
  getProducts,
  showCarouselProducts,
  getSoldProducts,
} from '../../store/actions/product';
import { selectAuthLoading } from '../../store/selectors/auth';
import {
  selectAllProducts,
  selectCarouselProducts,
  selectSoldProducts,
} from '../../store/selectors/product';
import AlertPrompt from '../../components/alertprompt/AlertPrompt';
import ShopCard from '../../parts/card/ShopCard';
import { Animated } from 'react-animated-css';
import LoadingSpinner from '../../components/loadingspinner/LoadingSpinner';

const Home = ({
  getCategories,
  getProducts,
  getSoldProducts,
  showCarouselProducts,
  loading,
  products,
  carouselProducts,
  soldProducts,
}) => {
  useEffect(() => {
    getCategories();
    getProducts();
    getSoldProducts();
    showCarouselProducts();
    window.scrollTo(0, 0);
  }, []);

  return (
    <Fragment>
      <AlertPrompt />

      {loading ? (
        <LoadingSpinner />
      ) : (
        <Fragment>
          <Animated
            animationIn='fadeIn'
            animationOut='fadeOut'
            isVisible={true}
          >
            <Row className='row-carousel'>
              <Col md={12}>
                <Carousel
                  // nextIcon=''
                  // nextLabel=''
                  // prevIcon=''
                  // prevLabel=''
                  interval={3000}
                  indicators={false}
                >
                  {carouselProducts.map((product) => (
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

            <h2 className='home-header'>Welcome to EcomDev</h2>
            <Row className='row-welcome'>
              <Col md={4}>
                <div className='child-home-icon'>
                  <i className='fas fa-undo-alt'></i>
                  <h3>return title</h3>
                  <p>
                    Curabitur arcu erat accumsan id imperdiet et porttitor at
                    sem.
                  </p>
                </div>
              </Col>
              <Col md={4}>
                <div className='child-home-icon'>
                  <i className='fas fa-check-double'></i>
                  <h3>authentic title</h3>
                  <p>
                    Curabitur arcu erat accumsan id imperdiet et porttitor at
                    sem.
                  </p>
                </div>
              </Col>
              <Col md={4}>
                <div className='child-home-icon'>
                  <i className='fas fa-shipping-fast'></i>
                  <h3>shipping title</h3>
                  <p>
                    Curabitur arcu erat accumsan id imperdiet et porttitor at
                    sem.
                  </p>
                </div>
              </Col>
            </Row>
            {/* <div className='parent-home-icons'> */}

            {/* </div> */}

            <Row>
              <Col md={12}>
                <div className='holder-most-popular'>
                  <span className='child-most-popular'></span>
                  <h2 className='mt-5'>Most Popular</h2>
                  <div className='shop-card mt-2 mb-4'>
                    {soldProducts.map((product, index) => (
                      <ShopCard product={product} key={index} />
                    ))}
                  </div>
                </div>
              </Col>
            </Row>

            <Row>
              <Col md={12}>
                <div className='mail-parent'>
                  <div className='mail-container'>
                    <div className='copy-wrapper'>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Nobis, sapiente.
                    </div>
                    <div className='form-wrapper'>
                      <form className='form-parent-mailing'>
                        <input type='email' placeholder='Enter email' />
                        <button>Subscribe</button>
                      </form>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Animated>
        </Fragment>
      )}
    </Fragment>
  );
};

Home.propTypes = {
  getCategories: PropTypes.func.isRequired,
  getProducts: PropTypes.func.isRequired,
  getSoldProducts: PropTypes.func.isRequired,
  showCarouselProducts: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loading: selectAuthLoading,
  products: selectAllProducts,
  carouselProducts: selectCarouselProducts,
  soldProducts: selectSoldProducts,
});

export default connect(mapStateToProps, {
  getCategories,
  getProducts,
  getSoldProducts,
  showCarouselProducts,
})(Home);
