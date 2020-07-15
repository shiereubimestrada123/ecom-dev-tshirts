import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form } from 'react-bootstrap';
import { getProducts } from '../../store/actions/product';
import ProductCard from '../productcard/ProductCard';

const Search = ({ getProducts, products }) => {
  const [data, setData] = useState({
    search: '',
  });

  const { search } = data;

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const filteredProducts = products.filter((product) => {
    return product.name.toLowerCase().indexOf(search.toLowerCase()) >= 0;
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Fragment>
      <Form.Group
        controlId='search'
        className='search-form mt-3'
        autoComplete='off'
      >
        <Form.Control
          type='text'
          name='search'
          placeholder='Search'
          className='search-input'
          onChange={handleChange}
        />
      </Form.Group>

      <div className='shop-card mt-2 mb-4'>
        <ProductCard products={filteredProducts} />
      </div>
    </Fragment>
  );
};

Search.propTypes = {
  getProducts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  products: state.product.products,
});

export default connect(mapStateToProps, { getProducts })(Search);
