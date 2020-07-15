import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form } from 'react-bootstrap';
import { getProducts } from '../../store/actions/product';
import ProductCard from '../productcard/ProductCard';
// import Pagination from 'react-bootstrap/Pagination';
import PaginationProduct from '../../components/pagination/PaginationProduct';

const Search = ({ getProducts, products }) => {
  const [data, setData] = useState({
    search: '',
  });
  const [currentpage, setcurrentpage] = useState(1);
  const [productperpage] = useState(3);

  const { search } = data;

  useEffect(() => {
    getProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    return product.name.toLowerCase().indexOf(search.toLowerCase()) >= 0;
  });

  const indexOfLastProduct = currentpage * productperpage;
  const indexOfFirstProduct = indexOfLastProduct - productperpage;
  const allProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setcurrentpage(pageNumber);

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
        <ProductCard allProducts={allProducts} />
      </div>

      <div>
        <PaginationProduct
          productperpage={productperpage}
          totalproducts={filteredProducts.length}
          paginate={paginate}
          currentpage={currentpage}
        />
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
