import React, { Fragment, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Button, Spinner, Row, Col } from 'react-bootstrap';
import { createCategory } from '../../../../store/actions/category';
import AlertPrompt from '../../../../components/alertprompt/AlertPrompt';

const CreateCategory = ({
  createCategory,
  user,
  auth: { loading, isAuthenticated },
}) => {
  let history = useHistory();

  const [formData, setFormData] = useState({
    name: '',
  });

  const { name } = formData;

  const handleClick = () => {
    history.push('/admin/dashboard');
  };

  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const onSubmit = async (e) => {
    e.preventDefault();
    createCategory(name, user && user._id);
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
            </Form.Group>
          </Form>
        </Fragment>
      )}
    </Fragment>
  );
};

CreateCategory.propTypes = {
  createCategory: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  auth: state.auth,
});

export default connect(mapStateToProps, { createCategory })(CreateCategory);
