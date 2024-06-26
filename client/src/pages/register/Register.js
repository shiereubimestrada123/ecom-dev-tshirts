import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Form, Row, Col, Spinner } from 'react-bootstrap';
import { Animated } from 'react-animated-css';
import signup from '../../assets/images/signup.jpeg';
import { register } from '../../store/actions/auth';
import {
  selectAuthLoading,
  selectAuthAuthenticated,
} from '../../store/selectors/auth';
import { setAlertPrompt } from '../../store/actions/alertPrompt';
import FormInput from '../../components/forms/forminput/FormInput';
import AlertPrompt from '../../components/alertprompt/AlertPrompt';
import LoadingSpinner from '../../components/loadingspinner/LoadingSpinner';

const Register = ({ register, setAlertPrompt, loading, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
        <LoadingSpinner />
      ) : (
        <Row className='parent-row-register'>
          <Col md={12}>
            <Animated
              animationIn='fadeIn'
              animationOut='fadeOut'
              isVisible={true}
            >
              <div className='register-wrapper'>
                <h1 className='register-title'>Register</h1>
                <Form className='register-parent' onSubmit={(e) => onSubmit(e)}>
                  <Form.Group controlId='formBasicName' className='form-group'>
                    <Form.Label>Name</Form.Label>

                    <FormInput
                      type='name'
                      placeholder='Enter name'
                      name='name'
                      value={name}
                      onChange={(e) => onChange(e)}
                      className='form-control'
                    />
                  </Form.Group>

                  <Form.Group controlId='formBasicEmail' className='form-group'>
                    <Form.Label>Email</Form.Label>
                    <FormInput
                      type='email'
                      placeholder='Enter email'
                      name='email'
                      value={email}
                      onChange={(e) => onChange(e)}
                      className='form-control'
                    />
                  </Form.Group>

                  <Form.Group
                    controlId='formBasicPassword'
                    className='form-group'
                  >
                    <Form.Label>Password</Form.Label>
                    <FormInput
                      type='password'
                      placeholder='Enter password'
                      name='password'
                      value={password}
                      onChange={(e) => onChange(e)}
                      className='form-control'
                    />
                  </Form.Group>

                  <Form.Group
                    controlId='formBasicPassword2'
                    className='form-group'
                  >
                    <Form.Label>Confirm Password</Form.Label>
                    <FormInput
                      type='password'
                      placeholder='Confirm password'
                      name='password2'
                      value={password2}
                      onChange={(e) => onChange(e)}
                      className='form-control'
                    />
                  </Form.Group>

                  <FormInput
                    name='register'
                    id='register'
                    className='btn btn-block register-btn'
                    type='submit'
                    value='Submit'
                  />

                  <p className='my-1 register-text'>
                    Already have an account?{' '}
                    <Link to='/login' variant='info' className='signup-text'>
                      Login
                    </Link>
                  </p>
                </Form>
              </div>
            </Animated>
          </Col>
        </Row>
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
