import React, { Fragment, useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import { createCategory } from '../../../../store/actions/category';
import {
  selectAuthUser,
  selectAuthLoading,
} from '../../../../store/selectors/auth';
import AlertPrompt from '../../../../components/alertprompt/AlertPrompt';
import LoadingSpinner from '../../../../components/loadingspinner/LoadingSpinner';

const CreateCategory = ({ createCategory, user, loading }) => {
  let history = useHistory();

  const [formData, setFormData] = useState({
    name: '',
  });

  const { name } = formData;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const onSubmit = async (e) => {
    e.preventDefault();
    createCategory(name, user && user._id);
    if (name) {
      history.push('/admin/dashboard');
    }
  };

  return (
    <Fragment>
      <AlertPrompt />
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Fragment>
          <Row className='mt-5 admin-row-header'>
            <Col>
              <i className='fab fa-black-tie' aria-hidden='true'></i> Create
              Category
            </Col>
          </Row>
          <Row className='admin-row-body'>
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
                      className='category-input'
                      onChange={(e) => handleChange(e)}
                    />
                  </InputGroup>

                  <div className='category-holder'>
                    <Link
                      to='/admin/dashboard'
                      className='cancel'
                      style={{ textDecoration: 'none' }}
                    >
                      Cancel
                    </Link>{' '}
                    <Button variant='success' className='button' type='submit'>
                      Submit
                    </Button>
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
