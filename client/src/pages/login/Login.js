import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { Form, Row, Col } from 'react-bootstrap';
import { Animated } from 'react-animated-css';
import { Link, Redirect } from 'react-router-dom';
import FormInput from '../../components/forms/forminput/FormInput';
import LoadingSpinner from '../../components/loadingspinner/LoadingSpinner';
import { login } from '../../store/actions/auth';
import register from '../../assets/images/register.jpeg';
import {
  selectAuthLoading,
  selectAuthAuthenticated,
} from '../../store/selectors/auth';
import AlertPrompt from '../../components/alertprompt/AlertPrompt';

const Login = ({ login, loading, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
        <LoadingSpinner />
      ) : (
        <Row className='parent-row-login'>
          <Col md={12}>
            <Animated
              animationIn='fadeIn'
              animationOut='fadeOut'
              isVisible={true}
            >
              <div className='login-wrapper'>
                <h1 className='login-title'>Login</h1>
                <Form className='login-parent' onSubmit={(e) => onSubmit(e)}>
                  <Form.Group controlId='formBasicEmail' className='form-group'>
                    <Form.Label className='form-label'>Email</Form.Label>

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
                    <Form.Label className='form-label'>Password</Form.Label>

                    <FormInput
                      type='password'
                      placeholder='Enter Password'
                      name='password'
                      value={password}
                      onChange={(e) => onChange(e)}
                      className='form-control'
                    />
                  </Form.Group>

                  <FormInput
                    name='login'
                    id='login'
                    className='btn btn-block login-btn'
                    type='submit'
                    value='Login'
                  />

                  <p className='my-1'>
                    Don't have an account yet?{' '}
                    <Link to='/register' variant='info' className='signin-text'>
                      Register
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

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  loading: selectAuthLoading,
  isAuthenticated: selectAuthAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
