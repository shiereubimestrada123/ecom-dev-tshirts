import React, { Fragment, useEffect, useState } from 'react';
import AlertPrompt from '../../components/alertprompt/AlertPrompt';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col, ListGroup } from 'react-bootstrap';
import ProductCard from '../../parts/productcard/ProductCard';
import { getCategories } from '../../store/actions/category';
import { getFilteredProducts } from '../../store/actions/product';
import CategoryFilter from '../../components/categoryfilter/CategoryFilter';

const Shop = ({
  category: { categories },
  product: { filteredProducts },
  getCategories,
  getFilteredProducts,
}) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  // const [filters, setFilters] = useState('');
  const [limit, setLimit] = useState(10);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(0);
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    getCategories();
    getFilteredProducts(skip, limit, selectedCategoryId);
  }, [getCategories, getFilteredProducts]);

  const handleFilters = (selectedCategoryId) => {
    setSelectedCategoryId(selectedCategoryId);
    getFilteredProducts(skip, limit, selectedCategoryId);
  };

  return (
    <Fragment>
      <AlertPrompt />
      <Row>
        <Col md={2}>
          <div className='mt-4 mb-4'>
            <ListGroup as='ul'>
              {categories &&
                categories.map((category, index) => (
                  <CategoryFilter
                    key={index}
                    category={category}
                    handleFilters={(filterCategory) =>
                      handleFilters(filterCategory)
                    }
                  />
                ))}
            </ListGroup>
          </div>
        </Col>
        <Col md={10}>
          {' '}
          <div className='shop-card mt-2 mb-4'>
            <ProductCard
              filteredProducts={filteredProducts}
              selectedCategoryId={selectedCategoryId}
              className='product-card'
            />
          </div>
        </Col>
      </Row>
    </Fragment>
  );
};

Shop.propTypes = {
  getCategories: PropTypes.func.isRequired,
  getFilteredProducts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  product: state.product,
  category: state.category,
});

export default connect(mapStateToProps, {
  getCategories,
  getFilteredProducts,
})(Shop);
