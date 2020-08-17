import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { Form, Button, Row, Col, Spinner } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { login } from '../../store/actions/auth';
import {
  selectAuthLoading,
  selectAuthAuthenticated,
} from '../../store/selectors/auth';
import AlertPrompt from '../../components/alertprompt/AlertPrompt';

const Login = ({
  login,
  // auth: { loading, isAuthenticated },
  loading,
  isAuthenticated,
}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
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
        <Form className='login-parent' onSubmit={(e) => onSubmit(e)}>
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

          <Button variant='info' type='submit'>
            Submit
          </Button>
          <p className='my-1'>
            Already have an account?{' '}
            <Link to='/register' variant='info' className='signin-text'>
              Sign In
            </Link>
          </p>
        </Form>
      )}
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  // auth: state.auth,
  loading: selectAuthLoading,
  isAuthenticated: selectAuthAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
