import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Spinner, Row, Col, Table } from 'react-bootstrap';
import { getProducts } from '../../../../store/actions/product';
import { selectAllProducts } from '../../../../store/selectors/product';
import {
  selectAuthLoading,
  selectAuthUser,
} from '../../../../store/selectors/auth';

const ManageProducts = ({ loading, products, getProducts, user }) => {
  useEffect(() => {
    getProducts();
    window.scrollTo(0, 0);
  }, []);

  const deleteProduct = (productId) => {
    console.log(user);
  };

  return (
    <Fragment>
      {loading ? (
        <Row style={{ textAlign: 'center', marginTop: '200px' }}>
          <Col className='spinner-class'>
            <Spinner animation='border' variant='info' />
          </Col>
        </Row>
      ) : (
        <Fragment>
          <Row className='mt-5 manage-row-header'>
            <Col>
              <i className='fab fa-black-tie' aria-hidden='true'></i> Manage
              Products
            </Col>
          </Row>
          <Row className='manage-row-body'>
            <Col>
              <div className='manage-product-holder'>
                <h2>Total {products.length} products</h2>
                <Table responsive='sm md lg xl' striped bordered>
                  <thead>
                    <tr>
                      <th>Product Name</th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.length > 0 ? (
                      products.map((product, index) => (
                        <tr key={index}>
                          <td>{product.name}</td>
                          <td onClick={() => deleteProduct(product._id)}>
                            <i className='fas fa-edit'></i>
                          </td>
                          <td>
                            <i className='fas fa-trash-alt'></i>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td>123123</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
            </Col>
          </Row>
        </Fragment>
      )}
    </Fragment>
  );
};

ManageProducts.propTypes = {
  getProducts: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  user: selectAuthUser,
  loading: selectAuthLoading,
  products: selectAllProducts,
});

export default connect(mapStateToProps, { getProducts })(ManageProducts);
