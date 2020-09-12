import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { Row, Col, Spinner } from 'react-bootstrap';
import ShopCard from '../../parts/card/ShopCard';
import { getCategories } from '../../store/actions/category';
import { getProducts } from '../../store/actions/product';
import { selectAllProducts } from '../../store/selectors/product';
import { selectAuthLoading } from '../../store/selectors/auth';
import { selectAllCategories } from '../../store/selectors/category';
import PaginationProduct from '../../components/pagination/PaginationProduct';
import AlertPrompt from '../../components/alertprompt/AlertPrompt';

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
  }, []);

  return (
    <Fragment>
      <AlertPrompt />
      {loading ? (
        <Row style={{ textAlign: 'center', marginTop: '200px' }}>
          <Col className='spinner-class'>
            <Spinner animation='border' variant='info' />
          </Col>
        </Row>
      ) : (
        <Row>
          <Col md={12}>
            <div className='shop-card mt-2 mb-4'>
              {allProducts.map((product, index) => (
                <div key={index}>
                  <ShopCard product={product} />
                </div>
              ))}
            </div>
            <div>
              <PaginationProduct
                productperpage={productperpage}
                totalproducts={products.length}
                paginate={paginate}
                currentpage={currentpage}
              />
            </div>
          </Col>
        </Row>
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
