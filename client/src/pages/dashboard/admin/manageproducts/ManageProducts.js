import React, { Fragment, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Row, Col, Table, Button } from 'react-bootstrap';
import { Animated } from 'react-animated-css';
import { getProducts, deleteProduct } from '../../../../store/actions/product';
import { selectAllProducts } from '../../../../store/selectors/product';
import {
  selectAuthLoading,
  selectAuthUser,
} from '../../../../store/selectors/auth';
import AlertPrompt from '../../../../components/alertprompt/AlertPrompt';
import LoadingSpinner from '../../../../components/loadingspinner/LoadingSpinner';
import PaginationProduct from '../../../../components/pagination/PaginationProduct';

const ManageProducts = ({
  loading,
  products,
  user,
  getProducts,
  deleteProduct,
}) => {
  const [currentpage, setcurrentpage] = useState(1);
  const [productperpage] = useState(8);

  const indexOfLastProduct = currentpage * productperpage;
  const indexOfFirstProduct = indexOfLastProduct - productperpage;
  const allProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setcurrentpage(pageNumber);

  useEffect(() => {
    getProducts();
    window.scrollTo(0, 0);
  }, []);

  const handleDeleteProduct = (productId) => {
    const userId = user && user._id;
    deleteProduct(productId, userId);
  };

  let history = useHistory();

  const handleOnclick = () => {
    history.goBack();
  };

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
                      <Table responsive='sm md lg xl'>
                        <thead>
                          <tr className='tr-header'>
                            <th className='product-name'>Product Name</th>
                            <th></th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {allProducts.length > 0 &&
                            allProducts.map((product, index) => (
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
                      <div>
                        <PaginationProduct
                          productperpage={productperpage}
                          totalproducts={products.length}
                          paginate={paginate}
                          currentpage={currentpage}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='go-back'>
                    <Button
                      variant='success'
                      className='button-goback shadow-none'
                      type='submit'
                      onClick={handleOnclick}
                    >
                      Back
                    </Button>
                  </div>
                </section>
              </Col>
            </Row>
          </Animated>
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
