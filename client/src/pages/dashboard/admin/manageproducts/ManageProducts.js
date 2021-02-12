import React, { Fragment, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Row, Col, Table, Button, Modal } from 'react-bootstrap';
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
import MyModal from '../../../../components/modal/MyModal';
import ProductList from './productlist/ProductList';

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

  const [product, setProduct] = useState();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (product) => {
    setShow(true);
    setProduct(product);
  };

  const handleDeleteProduct = (productId) => {
    const userId = user && user._id;
    deleteProduct(productId, userId);
    setShow(false);
  };

  let history = useHistory();

  const handleGoBack = () => {
    history.push('/admin/dashboard');
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
                              <ProductList
                                key={index}
                                product={product}
                                handleShow={handleShow}
                                handleRedirect={handleRedirect}
                              />
                            ))}
                          <MyModal
                            product={product}
                            handleClose={handleClose}
                            handleDeleteProduct={handleDeleteProduct}
                            show={show}
                          />
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
                      variant='secondary'
                      className='button-goback shadow-none'
                      type='submit'
                      onClick={handleGoBack}
                    >
                      Go back
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
