import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Row, Col } from 'react-bootstrap';
import { getCategories } from '../../store/actions/category';
import { addMailNewsletter } from '../../store/actions/auth';
import {
  // getProducts,
  // showCarouselProducts,
  getSoldProducts,
} from '../../store/actions/product';
import { selectAuthLoading } from '../../store/selectors/auth';
import {
  // selectAllProducts,
  // selectCarouselProducts,
  selectSoldProducts,
} from '../../store/selectors/product';
import AlertPrompt from '../../components/alertprompt/AlertPrompt';
import ShopCard from '../../parts/card/ShopCard';
import { Animated } from 'react-animated-css';
import LoadingSpinner from '../../components/loadingspinner/LoadingSpinner';
import HomeCarousel from '../../parts/carousel/HomeCarousel';
import Welcome from '../../parts/welcome/Welcome';
import MostPopular from '../../parts/mostpopular/MostPopular';

const Home = ({
  getCategories,
  // getProducts,
  addMailNewsletter,
  getSoldProducts,
  // showCarouselProducts,
  loading,
  // products,
  // carouselProducts,
  soldProducts,
}) => {
  useEffect(() => {
    async function callfunc() {
      await getCategories();
      // await showCarouselProducts();
      // await getProducts();
      await getSoldProducts();
      window.scrollTo(0, 0);
    }

    callfunc();
  }, []);

  const [formData, setFormData] = useState({
    email: '',
  });

  const { email } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    addMailNewsletter({ email });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
            <HomeCarousel soldProducts={soldProducts} />
            <Welcome />
            <MostPopular soldProducts={soldProducts} />

            <Row>
              <Col md={12}>
                <div className='mail-parent'>
                  <div className='mail-container'>
                    <div className='copy-wrapper'>
                      <p> SIGN UP FOR OUR NEWSLETTER</p>
                    </div>
                    <div className='form-wrapper'>
                      <form
                        className='form-parent-mailing'
                        onSubmit={(e) => onSubmit(e)}
                      >
                        <input
                          type='email'
                          name='email'
                          placeholder='Enter email'
                          onChange={handleChange}
                        />
                        <button>Go</button>
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
  // getProducts: PropTypes.func.isRequired,
  getSoldProducts: PropTypes.func.isRequired,
  // showCarouselProducts: PropTypes.func.isRequired,
  addMailNewsletter: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loading: selectAuthLoading,
  // products: selectAllProducts,
  // carouselProducts: selectCarouselProducts,
  soldProducts: selectSoldProducts,
});

export default connect(mapStateToProps, {
  getCategories,
  // getProducts,
  getSoldProducts,
  // showCarouselProducts,
  addMailNewsletter,
})(Home);
