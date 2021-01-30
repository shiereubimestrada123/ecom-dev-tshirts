import React, { Fragment, useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { Form, Row, Col, InputGroup, Button } from 'react-bootstrap';
import {
  getSingleProduct,
  updateProduct,
  getProducts,
} from '../../../../store/actions/product';
import { getCategories } from '../../../../store/actions/category';
import { selectSingleProduct } from '../../../../store/selectors/product';
import {
  selectAuthLoading,
  selectAuthUser,
} from '../../../../store/selectors/auth';
import { selectAllCategories } from '../../../../store/selectors/category';
import AlertPrompt from '../../../../components/alertprompt/AlertPrompt';
import LoadingSpinner from '../../../../components/loadingspinner/LoadingSpinner';
import { Animated } from 'react-animated-css';

const ProductUpdate = ({
  getProducts,
  getCategories,
  getSingleProduct,
  updateProduct,
  product,
  user,
  categories,
  loading,
  match,
}) => {
  const [values, setValues] = useState({
    name: '',
    description: '',
    price: '',
    shipping: '',
    quantity: '',
    photo: '',
    formData: '',
    category: '',
  });
  const { name, description, price, quantity, formData } = values;

  const history = useHistory();

  useEffect(() => {
    getCategories();
    getSingleProduct(match.params.productId);
    setValues({
      ...values,
      name: product && product.name,
      description: product && product.description,
      price: product && product.price,
      quantity: product && product.quantity,
      formData: new FormData(),
    });
    getProducts();
    window.scrollTo(0, 0);
  }, [
    product && product._id,
    product && product.name,
    product && product.description,
    product && product.price,
    product && product.quantity,
  ]);

  const onChange = (e) => {
    const value =
      e.target.name === 'photo' ? e.target.files[0] : e.target.value;
    formData.set(e.target.name, value);

    setValues({
      ...values,
      [e.target.name]: value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const productId = match.params.productId;
    const userId = user && user._id;

    await updateProduct(productId, userId, formData);
    history.push('/admin/products');
    await getProducts();
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
                <section className='holder-product-update'>
                  <div className='parent-product-update'>
                    <div className='product-update-heading'>
                      <h2>Update product</h2>
                    </div>
                    <div className='product-update-body'>
                      <Form className='my-5' onSubmit={(e) => onSubmit(e)}>
                        <div>
                          <input
                            type='file'
                            name='photo'
                            accept='image/*'
                            className='image-upload'
                            onChange={(e) => onChange(e)}
                          />
                        </div>

                        <InputGroup className='mb-3'>
                          <InputGroup.Prepend>
                            <InputGroup.Text>Name</InputGroup.Text>
                          </InputGroup.Prepend>
                          <Form.Control
                            type='name'
                            name='name'
                            value={name || ''}
                            onChange={(e) => onChange(e)}
                          />
                        </InputGroup>

                        <InputGroup className='mb-3'>
                          <InputGroup.Prepend>
                            <InputGroup.Text>Description</InputGroup.Text>
                          </InputGroup.Prepend>
                          <Form.Control
                            type='description'
                            name='description'
                            value={description || ''}
                            onChange={(e) => onChange(e)}
                          />
                        </InputGroup>

                        <InputGroup className='mb-3'>
                          <InputGroup.Prepend>
                            <InputGroup.Text>Price</InputGroup.Text>
                          </InputGroup.Prepend>
                          <Form.Control
                            type='number'
                            name='price'
                            value={price || ''}
                            onChange={(e) => onChange(e)}
                          />
                        </InputGroup>

                        <InputGroup className='mb-3'>
                          <InputGroup.Prepend>
                            <InputGroup.Text>Category</InputGroup.Text>
                          </InputGroup.Prepend>
                          <Form.Control
                            as='select'
                            name='category'
                            onChange={(e) => onChange(e)}
                          >
                            <option>Please select category</option>
                            {categories &&
                              categories.map((cat, index) => (
                                <option key={index} value={cat._id}>
                                  {cat.name}
                                </option>
                              ))}
                          </Form.Control>
                        </InputGroup>

                        <InputGroup className='mb-3'>
                          <InputGroup.Prepend>
                            <InputGroup.Text id='basic-addon1'>
                              Shipping
                            </InputGroup.Text>
                          </InputGroup.Prepend>
                          <Form.Control
                            as='select'
                            name='shipping'
                            onChange={(e) => onChange(e)}
                            className='product-update-input'
                          >
                            <option>Please select</option>
                            <option value='1'>True</option>
                            <option value='0'>False</option>
                          </Form.Control>
                        </InputGroup>

                        <InputGroup className='mb-3'>
                          <InputGroup.Prepend>
                            <InputGroup.Text id='basic-addon1'>
                              Quantity
                            </InputGroup.Text>
                          </InputGroup.Prepend>
                          <Form.Control
                            type='quantity'
                            name='quantity'
                            value={quantity || ''}
                            onChange={(e) => onChange(e)}
                          />
                        </InputGroup>

                        <div className='button-holder'>
                          <span></span>
                          <Link
                            to='/admin/products'
                            className='cancel'
                            style={{ textDecoration: 'none' }}
                          >
                            Cancel
                          </Link>{' '}
                          <Button
                            variant='success'
                            className='button'
                            type='submit'
                          >
                            Submit
                          </Button>
                        </div>
                      </Form>
                    </div>
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

ProductUpdate.propTypes = {
  getProducts: PropTypes.func.isRequired,
  getCategories: PropTypes.func.isRequired,
  getSingleProduct: PropTypes.func.isRequired,
  updateProduct: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loading: selectAuthLoading,
  user: selectAuthUser,
  categories: selectAllCategories,
  product: selectSingleProduct,
});

export default connect(mapStateToProps, {
  getProducts,
  getCategories,
  getSingleProduct,
  updateProduct,
})(ProductUpdate);
