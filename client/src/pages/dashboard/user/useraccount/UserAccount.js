import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory, Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { Row, Col, Form, InputGroup, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
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
          <Row className='mt-5 user-row-header'>
            <Col>
              <i className='fa fa-user' aria-hidden='true'></i> Update Account
            </Col>
          </Row>
          <Row className='user-row-body'>
            <Col>
              <Form className='my-5' onSubmit={(e) => handleSubmit(e)}>
                <Form.Group controlId='formUpdateName'>
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

                  <InputGroup className='mb-3'>
                    <InputGroup.Prepend>
                      <InputGroup.Text id='basic-addon1'>Email</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                      type='email'
                      name='email'
                      value={email || ''}
                      className='user-profile-input'
                      onChange={(e) => handleChange(e)}
                    />
                  </InputGroup>

                  <InputGroup className='mb-3'>
                    <InputGroup.Prepend>
                      <InputGroup.Text id='basic-addon1'>
                        Password
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                      type='password'
                      name='password'
                      value={password || ''}
                      className='user-profile-input'
                      placeholder='Enter new password'
                      onChange={(e) => handleChange(e)}
                    />
                  </InputGroup>

                  <div className='update-user-button-holder'>
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

Account.propTypes = {
  updateUser: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loading: selectAuthLoading,
  user: selectAuthUser,
});

export default connect(mapStateToProps, { updateUser })(Account);
