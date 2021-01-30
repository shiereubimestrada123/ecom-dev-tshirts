import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import { Animated } from 'react-animated-css';
import ShopCard from '../../parts/card/ShopCard';
import { getCategories } from '../../store/actions/category';
import { getProducts } from '../../store/actions/product';
import { selectAllProducts } from '../../store/selectors/product';
import { selectAuthLoading } from '../../store/selectors/auth';
import { selectAllCategories } from '../../store/selectors/category';
import PaginationProduct from '../../components/pagination/PaginationProduct';
import AlertPrompt from '../../components/alertprompt/AlertPrompt';
import LoadingSpinner from '../../components/loadingspinner/LoadingSpinner';

const Shop = ({
  categories,
  products,
  loading,
  getCategories,
  getProducts,
}) => {
  const [currentpage, setcurrentpage] = useState(1);
  const [productperpage] = useState(8);

  const indexOfLastProduct = currentpage * productperpage;
  const indexOfFirstProduct = indexOfLastProduct - productperpage;
  const allProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setcurrentpage(pageNumber);

  useEffect(() => {
    getCategories();
    getProducts();
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
            <div className='shop-header'>
              <h2>Welcome to our store</h2>
              <p>Check our new items</p>
            </div>

            <Row>
              {allProducts.map((product, index) => (
                <Col lg={4} md={4} className='mb-4' key={index}>
                  <ShopCard product={product} />
                </Col>
              ))}
            </Row>

            <div>
              <PaginationProduct
                productperpage={productperpage}
                totalproducts={products.length}
                paginate={paginate}
                currentpage={currentpage}
              />
            </div>
          </Animated>
        </Fragment>
      )}
    </Fragment>
  );
};

Shop.propTypes = {
  getCategories: PropTypes.func.isRequired,
  getProducts: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  products: selectAllProducts,
  loading: selectAuthLoading,
  categories: selectAllCategories,
});

export default connect(mapStateToProps, {
  getProducts,
  getCategories,
})(Shop);
