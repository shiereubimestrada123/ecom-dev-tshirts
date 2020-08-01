import React, { Fragment, useEffect, useState } from 'react';
import AlertPrompt from '../../components/alertprompt/AlertPrompt';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col, Spinner } from 'react-bootstrap';
import ShopCard from '../../parts/card/ShopCard';
import { getCategories } from '../../store/actions/category';
import { getProducts } from '../../store/actions/product';
// import Search from '../../parts/search/Search';
import PaginationProduct from '../../components/pagination/PaginationProduct';

const Shop = ({
  category: { categories },
  product: { products },
  auth: { loading },
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
  }, [getCategories, getProducts]);

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
            {/* <Search /> */}
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

const mapStateToProps = (state) => ({
  product: state.product,
  category: state.category,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getProducts,
  getCategories,
})(Shop);
