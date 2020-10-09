import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Form,
  InputGroup,
} from 'react-bootstrap';
import { createStructuredSelector } from 'reselect';
import { createCategory } from '../../../../store/actions/category';
import { selectAuthUser } from '../../../../store/selectors/auth';
import FormInput from '../../../../components/forms/forminput/FormInput';

const CategoryComponent = ({ createCategory, parentCallback, user }) => {
  const [formData, setFormData] = useState({
    name: '',
  });

  const { name } = formData;

  const onCategoryChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    parentCallback({[e.target.name]: e.target.value})
  };

  const onCategorySubmit = async (e) => {
    e.preventDefault();
    createCategory(name, user && user._id);
    setFormData('');
  };

  return (
    <Form className='my-5' onSubmit={onCategorySubmit}>
      <Form.Group controlId='formCategoryName'>
        <InputGroup className='mb-3'>
          <InputGroup.Prepend>
            <InputGroup.Text id='basic-addon1'>Name</InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            type='name'
            placeholder='Enter category name'
            name='name'
            value={name || ''}
            className='create-category-input'
            onChange={onCategoryChange}
          />
        </InputGroup>

        <div className='create-category-holder'>
          <FormInput
            name='text'
            id='update'
            className='btn btn-block create-category-btn'
            type='submit'
            value='Create Category'
          />
        </div>
      </Form.Group>
    </Form>
  );
};

CategoryComponent.propTypes = {};

const mapStateToProps = createStructuredSelector({
  user: selectAuthUser,
});

export default connect(mapStateToProps, {createCategory})(CategoryComponent);
