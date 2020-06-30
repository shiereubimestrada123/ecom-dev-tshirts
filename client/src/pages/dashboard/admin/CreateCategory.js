import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { createCategory } from '../../../store/actions/category';
import AlertPrompt from '../../../components/alertprompt/AlertPrompt';

const CreateCategory = ({ createCategory, user: { _id } }) => {
  const [formData, setFormData] = useState({
    name: '',
  });

  const { name } = formData;

  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const onSubmit = async (e) => {
    e.preventDefault();
    createCategory(name, _id);
  };

  return (
    <Fragment>
      <AlertPrompt />
      <Form className='my-5' onSubmit={(e) => onSubmit(e)}>
        <Form.Group controlId='formCategoryName'>
          <Form.Label>Category Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter category name'
            name='name'
            value={name}
            onChange={(e) => onChange(e)}
          />

          <Button variant='info' type='submit' className='my-3'>
            Submit
          </Button>
        </Form.Group>
      </Form>
    </Fragment>
  );
};

CreateCategory.propTypes = {
  createCategory: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { createCategory })(CreateCategory);
