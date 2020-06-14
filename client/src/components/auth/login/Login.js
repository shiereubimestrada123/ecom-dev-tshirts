import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';

const Login = (props) => {
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
  };

  return (
    <Fragment>
      <Form className='login-form-parent' onSubmit={(e) => onSubmit(e)}>
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
        <p className='my-1 login-text'>
          Don't have an account? <Link to='/login'>Sign Up</Link>
        </p>
      </Form>
    </Fragment>
  );
};

Login.propTypes = {};

export default Login;
