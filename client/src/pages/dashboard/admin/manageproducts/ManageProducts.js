import React, { Fragment, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Spinner, Row, Col, Table } from 'react-bootstrap';
import { Animated } from 'react-animated-css';
import { getProducts, deleteProduct } from '../../../../store/actions/product';
import { selectAllProducts } from '../../../../store/selectors/product';
import {
  selectAuthLoading,
  selectAuthUser,
} from '../../../../store/selectors/auth';
import AlertPrompt from '../../../../components/alertprompt/AlertPrompt';
import LoadingSpinner from '../../../../components/loadingspinner/LoadingSpinner';

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
            <Row>
              <Col md={12}>
                <section className='holder-manage-product'>
                  <div className='parent-manage-product'>
                    <div className='manage-heading'>
                      <h2>Manage Products</h2>
                    </div>
                    <div className='manage-body'>
                      {/* <div className='manage-product-holder'>
                        <h2>Total {products.length} products</h2> */}
                      <Table responsive='sm md lg xl'>
                        <thead>
                          <tr className='tr-header'>
                            <th className='product-name'>Product Name</th>
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
                                <td
                                  onClick={() =>
                                    handleDeleteProduct(product._id)
                                  }
                                >
                                  <i className='fas fa-trash-alt'></i>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </Table>
                      {/* </div> */}
                    </div>
                  </div>
                </section>
              </Col>
            </Row>
          </Animated>
          {/* <Row className='mt-5 admin-row-header'>
            <Col>
              <i className='fab fa-black-tie' aria-hidden='true'></i> Manage
              Products
            </Col>
          </Row>
          <Row className='admin-row-body'>
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
          </Row> */}
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
