import React, { Fragment, useEffect, useState } from 'react';
import AlertPrompt from '../../components/alertprompt/AlertPrompt';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import ProductCard from '../../parts/productcard/ProductCard';
import { getCategories } from '../../store/actions/category';
import { getProducts } from '../../store/actions/product';
// import CategoryFilter from '../../components/categoryfilter/CategoryFilter';
import Search from '../../parts/search/Search';
import PaginationProduct from '../../components/pagination/PaginationProduct';

const Shop = ({
  category: { categories },
  product: { products },
  getCategories,
  getProducts,
}) => {
  // const [selectedCategoryId, setSelectedCategoryId] = useState({});
  // const [selectedAll, setSelectedAll] = useState('All');
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

  // const handleFilters = (selectedCategoryId) => {
  //   setSelectedCategoryId(selectedCategoryId);
  // };

  return (
    <Fragment>
      <AlertPrompt />
      <Row>
        {/* <Col md={2}>
          <div className='mt-4 mb-4'>
            <CategoryFilter
              categories={categories}
              handleFilters={handleFilters}
              selectedAll={selectedAll}
            />
          </div>
        </Col> */}
        <Col md={12}>
          {/* <Search /> */}
          <div className='shop-card mt-2 mb-4'>
            <ProductCard allProducts={allProducts} />
          </div>
          <div>
            <PaginationProduct
              productperpage={productperpage}
              totalproducts={products.length}
              paginate={paginate}
              currentpage={currentpage}
            />
          </div>
          {/* <p style={{ textAlign: 'center' }}>Display products</p>
          <div className='shop-card mt-2 mb-4'>
            <ProductCard
              products={products}
              selectedCategoryId={selectedCategoryId}
              className='product-card'
              selectedAll={selectedAll}
            />
          </div> */}
        </Col>
      </Row>
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
});

export default connect(mapStateToProps, {
  getProducts,
  getCategories,
})(Shop);
