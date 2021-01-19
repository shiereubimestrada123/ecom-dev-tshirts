import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getCategories } from '../../store/actions/category';
import { getSoldProducts } from '../../store/actions/product';
import { selectAuthLoading } from '../../store/selectors/auth';
import { selectSoldProducts } from '../../store/selectors/product';
import AlertPrompt from '../../components/alertprompt/AlertPrompt';
import { Animated } from 'react-animated-css';
import LoadingSpinner from '../../components/loadingspinner/LoadingSpinner';
import HomeCarousel from '../../parts/carousel/HomeCarousel';
import Welcome from '../../parts/welcome/Welcome';
import MostPopular from '../../parts/mostpopular/MostPopular';
import NewsLetter from '../../parts/newsletter/NewsLetter';

const Home = ({ getCategories, getSoldProducts, loading, soldProducts }) => {
  useEffect(() => {
    async function callfunc() {
      await getCategories();
      await getSoldProducts();
      window.scrollTo(0, 0);
    }

    callfunc();
  }, []);

  const [email, setEmail] = useState('');

  const newsletterCallback = (email) => {
    setEmail(email);
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
            <NewsLetter parentNewsletterCallback={newsletterCallback} />
          </Animated>
        </Fragment>
      )}
    </Fragment>
  );
};

Home.propTypes = {
  getCategories: PropTypes.func.isRequired,
  getSoldProducts: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loading: selectAuthLoading,
  soldProducts: selectSoldProducts,
});

export default connect(mapStateToProps, {
  getCategories,
  getSoldProducts,
})(Home);
