import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Row, Col, Form, InputGroup, Button } from 'react-bootstrap';
import { Animated } from 'react-animated-css';
import AlertPrompt from '../../../../components/alertprompt/AlertPrompt';
import {
  selectAuthLoading,
  selectAuthUser,
} from '../../../../store/selectors/auth';
import { updateUser } from '../../../../store/actions/auth';
import LoadingSpinner from '../../../../components/loadingspinner/LoadingSpinner';

const Account = ({ updateUser, loading, user }) => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
  });

  let history = useHistory();

  useEffect(() => {
    setValues({
      ...values,
      name: user && user.name,
      email: user && user.email,
    });
    window.scrollTo(0, 0);
  }, [user]);

  const { name, email, password } = values;

  const handleChange = async (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = user && user._id;
    updateUser({ name, password, email, userId });

    if (user && user.role === 1) {
      history.push('/admin/dashboard');
    } else {
      history.push('/user/dashboard');
    }
  };

  return (
    <Fragment>
      <AlertPrompt />
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Fragment>
          <Animated
            animationIn='fadeIn'
            animationOut='fadeOut'
            isVisible={true}
          >
            <Row>
              <Col md={12}>
                <section className='holder-update-account'>
                  <div className='parent-update-product'>
                    <div className='update-heading'>
                      <h2>Update Account</h2>
                    </div>
                    <div className='update-body'>
                      <Form className='my-5' onSubmit={(e) => handleSubmit(e)}>
                        <Form.Group controlId='formUpdateName'>
                          <InputGroup className='mb-3'>
                            <InputGroup.Prepend>
                              <InputGroup.Text>Name</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                              type='name'
                              name='name'
                              value={name || ''}
                              onChange={(e) => handleChange(e)}
                            />
                          </InputGroup>

                          <InputGroup className='mb-3'>
                            <InputGroup.Prepend>
                              <InputGroup.Text>Email</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                              type='email'
                              name='email'
                              value={email || ''}
                              onChange={(e) => handleChange(e)}
                            />
                          </InputGroup>

                          <InputGroup className='mb-3'>
                            <InputGroup.Prepend>
                              <InputGroup.Text>Password</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                              type='password'
                              name='password'
                              value={password || ''}
                              placeholder='Enter new password'
                              onChange={(e) => handleChange(e)}
                            />
                          </InputGroup>

                          <div className='button-holder'>
                            <Link
                              to={
                                user && user.role === 1
                                  ? '/admin/dashboard'
                                  : '/user/dashboard'
                              }
                              className='cancel'
                              style={{ textDecoration: 'none' }}
                            >
                              Cancel
                            </Link>{' '}
                            <Button
                              variant='success'
                              className='button shadow-none'
                              type='submit'
                            >
                              Submit
                            </Button>
                          </div>
                        </Form.Group>
                      </Form>
                    </div>
                  </div>
                </section>
              </Col>
            </Row>
          </Animated>
        </Fragment>
      )}
    </Fragment>
  );
};

Account.propTypes = {
  updateUser: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loading: selectAuthLoading,
  user: selectAuthUser,
});

export default connect(mapStateToProps, { updateUser })(Account);
