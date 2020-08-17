import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Form, Button, Row, Col, Spinner } from 'react-bootstrap';
import { register } from '../../store/actions/auth';
import {
  selectAuthLoading,
  selectAuthAuthenticated,
} from '../../store/selectors/auth';
import { setAlertPrompt } from '../../store/actions/alertPrompt';
import AlertPrompt from '../../components/alertprompt/AlertPrompt';

const Register = ({
  register,
  setAlertPrompt,
  // auth: { loading, isAuthenticated },
  loading,
  isAuthenticated,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlertPrompt('Password do not match', 'danger');
    } else {
      register({ name, email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to='/' />;
  }

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
        <Form className='register-parent' onSubmit={(e) => onSubmit(e)}>
          <Form.Group controlId='formBasicName'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='name'
              placeholder='Name'
              name='name'
              value={name}
              onChange={(e) => onChange(e)}
            />
          </Form.Group>

          <Form.Group controlId='formBasicEmail'>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              name='email'
              value={email}
              onChange={(e) => onChange(e)}
            />
          </Form.Group>

          <Form.Group controlId='formBasicPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Password'
              name='password'
              value={password}
              onChange={(e) => onChange(e)}
            />
          </Form.Group>

          <Form.Group controlId='formBasicPassword2'>
            <Form.Label>Re-enter Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Password'
              name='password2'
              value={password2}
              onChange={(e) => onChange(e)}
            />
          </Form.Group>

          <Button variant='info' type='submit'>
            Submit
          </Button>
          <p className='my-1 register-text'>
            Already have an account?{' '}
            <Link to='/login' variant='info' className='signup-text'>
              Sign In
            </Link>
          </p>
        </Form>
      )}
    </Fragment>
  );
};

Register.propTypes = {
  register: PropTypes.func.isRequired,
  setAlertPrompt: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  // auth: state.auth,
  loading: selectAuthLoading,
  isAuthenticated: selectAuthAuthenticated,
});

export default connect(mapStateToProps, { register, setAlertPrompt })(Register);
