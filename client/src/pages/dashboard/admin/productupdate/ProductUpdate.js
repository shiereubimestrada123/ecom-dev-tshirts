import React, { Fragment, useState, useEffect } from 'react';
import { useHistory, Link, Redirect } from 'react-router-dom';
import { connect, useStore } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { Form, Row, Col, Spinner, InputGroup, Button } from 'react-bootstrap';
import {
  getSingleProduct,
  updateProduct,
} from '../../../../store/actions/product';
import { getCategories } from '../../../../store/actions/category';
import { selectSingleProduct } from '../../../../store/selectors/product';
import {
  selectAuthLoading,
  selectAuthUser,
} from '../../../../store/selectors/auth';
import { selectAllCategories } from '../../../../store/selectors/category';
import AlertPrompt from '../../../../components/alertprompt/AlertPrompt';
import FormInput from '../../../../components/forms/forminput/FormInput';

const ProductUpdate = ({
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
    window.scrollTo(0, 0);
  }, [(product && product && product._id) || (user && user._id)]);

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

    updateProduct(productId, userId, formData);
    history.push('/admin/products');
    window.location.reload();
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
          <Row className='mt-5 admin-row-header'>
            <Col>
              <i className='fab fa-black-tie' aria-hidden='true'></i> Update
              Product
            </Col>
          </Row>
          <Row className='admin-row-body'>
            <Col>
              <Form className='my-5' onSubmit={(e) => onSubmit(e)}>
                <div>
                  <input
                    type='file'
                    name='photo'
                    accept='image/*'
                    onChange={(e) => onChange(e)}
                  />
                </div>

                <InputGroup className='mb-3'>
                  <InputGroup.Prepend>
                    <InputGroup.Text id='basic-addon1'>Name</InputGroup.Text>
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
                    <InputGroup.Text id='basic-addon1'>
                      Description
                    </InputGroup.Text>
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
                    <InputGroup.Text id='basic-addon1'>Price</InputGroup.Text>
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
                    <InputGroup.Text id='basic-addon1'>
                      Category
                    </InputGroup.Text>
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

                <div className='product-button-holder'>
                  <span></span>
                  <Link
                    to='/admin/products'
                    className='cancel'
                    style={{ textDecoration: 'none' }}
                  >
                    Cancel
                  </Link>{' '}
                  <Button variant='success' className='button' type='submit'>
                    Submit
                  </Button>
                </div>
              </Form>
            </Col>
          </Row>
        </Fragment>
      )}
    </Fragment>
  );
};

ProductUpdate.propTypes = {
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
  getCategories,
  getSingleProduct,
  updateProduct,
})(ProductUpdate);
