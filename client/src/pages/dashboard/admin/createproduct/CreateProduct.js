import React, { Fragment, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { createProduct } from '../../../../store/actions/product';
import { getCategories } from '../../../../store/actions/category';
import AlertPrompt from '../../../../components/alertprompt/AlertPrompt';

const CreateProduct = ({
  createProduct,
  getCategories,
  category: { categories },
  user,
}) => {
  let history = useHistory();

  const [values, setValues] = useState({
    name: '',
    description: '',
    price: '',
    shipping: '',
    quantity: '',
    photo: '',
    formData: '',
  });

  const { name, description, price, shipping, quantity, formData } = values;

  useEffect(() => {
    getCategories().then(() => {
      setValues({
        ...values,
        formData: new FormData(),
      });
    });
  }, [getCategories]);

  const handleClick = () => {
    history.push('/admin/dashboard');
  };

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
  };

  return (
    <Fragment>
      <AlertPrompt />
      <Form className='my-5' onSubmit={(e) => onSubmit(e)}>
        <div>
          <input
            type='file'
            name='photo'
            accept='image/*'
            onChange={(e) => onChange(e)}
          />
        </div>
        {/* <Form.Group>
          <Form.File
            id='photo'
            name='photo'
            label='Photo'
            onChange={(e) => onChange(e)}
          />
        </Form.Group> */}

        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Name'
            name='name'
            value={name}
            onChange={(e) => onChange(e)}
          />
        </Form.Group>

        <Form.Group controlId='description'>
          <Form.Label>Description</Form.Label>
          <Form.Control
            type='description'
            placeholder='Description'
            name='description'
            value={description}
            onChange={(e) => onChange(e)}
          />
        </Form.Group>

        <Form.Group controlId='price'>
          <Form.Label>Price</Form.Label>
          <Form.Control
            type='price'
            placeholder='Price'
            name='price'
            value={price}
            onChange={(e) => onChange(e)}
          />
        </Form.Group>

        <Form.Group controlId='category'>
          <Form.Label>Category</Form.Label>
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
        </Form.Group>

        <Form.Group controlId='shipping'>
          <Form.Label>Shipping</Form.Label>
          <Form.Control
            as='select'
            name='shipping'
            onChange={(e) => onChange(e)}
          >
            <option>Please select</option>
            <option value='1'>True</option>
            <option value='0'>False</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId='quantity'>
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type='quantity'
            placeholder='Quantity'
            name='quantity'
            value={quantity}
            onChange={(e) => onChange(e)}
          />
        </Form.Group>

        <Button
          variant='light'
          type='submit'
          className='my-3 mr-2'
          onClick={handleClick}
        >
          Cancel
        </Button>
        <Button variant='info' type='submit' className='my-3'>
          Submit
        </Button>
      </Form>
    </Fragment>
  );
};

CreateProduct.propTypes = {
  createProduct: PropTypes.func.isRequired,
  getCategories: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  category: state.category,
});

export default connect(mapStateToProps, {
  createProduct,
  getCategories,
})(CreateProduct);
