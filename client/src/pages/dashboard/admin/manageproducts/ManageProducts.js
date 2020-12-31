import React, { Fragment, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Spinner, Row, Col, Table } from 'react-bootstrap';
import { getProducts, deleteProduct } from '../../../../store/actions/product';
import { selectAllProducts } from '../../../../store/selectors/product';
import {
  selectAuthLoading,
  selectAuthUser,
} from '../../../../store/selectors/auth';
import AlertPrompt from '../../../../components/alertprompt/AlertPrompt';

const ManageProducts = ({
  loading,
  products,
  user,
  getProducts,
  deleteProduct,
}) => {
  useEffect(() => {
    getProducts();
    window.scrollTo(0, 0);
  }, []);

  const handleDeleteProduct = (productId) => {
    const userId = user && user._id;
    deleteProduct(productId, userId);
  };

  let history = useHistory();

  const handleRedirect = async (productId) => {
    history.push(`/admin/product/update/${productId}`);
    // window.location.reload();
  };

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
                    {products.length > 0 &&
                      products.map((product, index) => (
                        <tr key={index}>
                          <td>{product.name}</td>
                          <td onClick={() => handleRedirect(product._id)}>
                            <i className='fas fa-edit'></i>
                          </td>
                          <td onClick={() => handleDeleteProduct(product._id)}>
                            <i className='fas fa-trash-alt'></i>
                          </td>
                        </tr>
                      ))}
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
  deleteProduct: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  user: selectAuthUser,
  loading: selectAuthLoading,
  products: selectAllProducts,
});

export default connect(mapStateToProps, { getProducts, deleteProduct })(
  ManageProducts
);
