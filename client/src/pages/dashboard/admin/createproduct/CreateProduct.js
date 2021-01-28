import React, { Fragment, useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { Form, Row, Col, InputGroup, Button } from 'react-bootstrap';
import { Animated } from 'react-animated-css';
import { createProduct } from '../../../../store/actions/product';
import { getCategories } from '../../../../store/actions/category';
import {
  selectAuthLoading,
  selectAuthUser,
} from '../../../../store/selectors/auth';
import { selectAllCategories } from '../../../../store/selectors/category';
import AlertPrompt from '../../../../components/alertprompt/AlertPrompt';
import LoadingSpinner from '../../../../components/loadingspinner/LoadingSpinner';

const CreateProduct = ({
  createProduct,
  getCategories,
  user,
  categories,
  loading,
}) => {
  const [values, setValues] = useState({
    name: '',
    description: '',
    price: '',
    shipping: '',
    quantity: '',
    photo: '',
    formData: '',
  });

  const { name, description, price, quantity, formData } = values;

  const history = useHistory();

  useEffect(() => {
    getCategories().then(() => {
      setValues({
        ...values,
        formData: new FormData(),
      });
    });
    window.scrollTo(0, 0);
  }, [getCategories]);

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
    createProduct(formData, user && user._id);
    if (name && description && price && quantity && formData) {
      history.push('/admin/dashboard');
    }
    // setValues('');
    // e.target.reset();
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
                <section className='holder-create-product'>
                  <div className='parent-create-product'>
                    <div className='product-heading'>
                      <h2>Create Product</h2>
                    </div>
                    <div className='product-body'>
                      <Form className='my-5' onSubmit={(e) => onSubmit(e)}>
                        <div className='image-upload'>
                          <input
                            type='file'
                            name='photo'
                            accept='image/*'
                            onChange={(e) => onChange(e)}
                          />
                        </div>

                        <InputGroup className='mb-3'>
                          <InputGroup.Prepend>
                            <InputGroup.Text id='basic-addon1'>
                              Name
                            </InputGroup.Text>
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
                            <InputGroup.Text id='basic-addon1'>
                              Price
                            </InputGroup.Text>
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
                            className='create-product-input'
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
                            value={quantity}
                            onChange={(e) => onChange(e)}
                            className='create-product-input'
                          />
                        </InputGroup>

                        <div className='button-holder'>
                          <Link
                            to='/admin/dashboard'
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

CreateProduct.propTypes = {
  createProduct: PropTypes.func.isRequired,
  getCategories: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loading: selectAuthLoading,
  user: selectAuthUser,
  categories: selectAllCategories,
});

export default connect(mapStateToProps, {
  createProduct,
  getCategories,
})(CreateProduct);
