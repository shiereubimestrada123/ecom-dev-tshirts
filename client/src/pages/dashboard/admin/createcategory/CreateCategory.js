import React, { Fragment, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Form, Button, Spinner, Row, Col, InputGroup } from 'react-bootstrap';
import { createCategory } from '../../../../store/actions/category';
import {
  selectAuthUser,
  selectAuthLoading,
} from '../../../../store/selectors/auth';
import AlertPrompt from '../../../../components/alertprompt/AlertPrompt';
import FormInput from '../../../../components/forms/forminput/FormInput';

const CreateCategory = ({ createCategory, user, loading }) => {
  let history = useHistory();

  const [formData, setFormData] = useState({
    name: '',
  });

  const { name } = formData;

  const handleChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const onSubmit = async (e) => {
    e.preventDefault();
    createCategory(name, user && user._id);
    setFormData('');
    // e.target.reset();
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
              <i className='fab fa-black-tie' aria-hidden='true'></i> Create
              Category
            </Col>
          </Row>
          <Row className='user-row-body'>
            <Col>
              <Form className='my-5' onSubmit={(e) => onSubmit(e)}>
                <Form.Group controlId='formCategoryName'>
                  <InputGroup className='mb-3'>
                    <InputGroup.Prepend>
                      <InputGroup.Text id='basic-addon1'>Name</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                      type='name'
                      name='name'
                      value={name || ''}
                      className='user-profile-input'
                      onChange={(e) => handleChange(e)}
                    />
                  </InputGroup>

                  <div className='update-button-holder'>
                    <FormInput
                      name='text'
                      id='update'
                      className='btn btn-block user-update-btn'
                      type='submit'
                      value='Create'
                    />
                  </div>
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Fragment>
      )}
    </Fragment>
  );
};

CreateCategory.propTypes = {
  createCategory: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  user: selectAuthUser,
  loading: selectAuthLoading,
});

export default connect(mapStateToProps, { createCategory })(CreateCategory);
