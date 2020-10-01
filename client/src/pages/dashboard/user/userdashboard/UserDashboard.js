import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { Row, Col, Spinner, Tab, Nav, Form, InputGroup } from 'react-bootstrap';
import {
  selectAuthLoading,
  selectAuthUser,
} from '../../../../store/selectors/auth';
import { updateUser } from '../../../../store/actions/auth';
import AlertPrompt from '../../../../components/alertprompt/AlertPrompt';
import FormInput from '../../../../components/forms/forminput/FormInput';

const UserDashboard = ({ loading, user, updateUser }) => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
  });
  console.log(values);
  useEffect(() => {
    setValues({
      ...values,
      name: user && user.name,
      email: user && user.email,
    });
  }, [user]);

  const { name, email, password } = values;

  const handleChange = async (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    const userId = user && user._id;

    e.preventDefault();
    updateUser({ name, password, email, userId });
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
          <Row className='mt-5 user-row-header'>
            <Col>
              <i className='fa fa-user' aria-hidden='true'></i> User Dashboard
            </Col>
          </Row>
          <Tab.Container id='left-tabs-example' defaultActiveKey='first'>
            <Row className='user-row-body'>
              <Col className='left' md={3}>
                <Nav variant='pills' className='flex-column'>
                  <Nav.Item>
                    <Nav.Link eventKey='first'>My Cart</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey='second'>Update Profile</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col className='right' md={9}>
                <Tab.Content>
                  <Tab.Pane eventKey='first'>
                    <p>first</p>
                  </Tab.Pane>
                  <Tab.Pane eventKey='second'>
                    <Form className='my-5' onSubmit={(e) => handleSubmit(e)}>
                      <Form.Group controlId='formUpdateName'>
                        <InputGroup className='mb-3'>
                          <InputGroup.Prepend>
                            <InputGroup.Text id='basic-addon1'>
                              Name
                            </InputGroup.Text>
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
                            <InputGroup.Text id='basic-addon1'>
                              Email
                            </InputGroup.Text>
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

                        <div className='update-button-holder'>
                          <FormInput
                            name='text'
                            id='update'
                            className='btn btn-block user-update-btn'
                            type='submit'
                            value='Update'
                          />
                        </div>
                      </Form.Group>
                    </Form>
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Fragment>
      )}
    </Fragment>
  );
};

UserDashboard.propTypes = {
  updateUser: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loading: selectAuthLoading,
  user: selectAuthUser,
});

export default connect(mapStateToProps, { updateUser })(UserDashboard);
