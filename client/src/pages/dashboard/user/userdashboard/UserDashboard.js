import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Row, Col, ListGroup } from 'react-bootstrap';
import {
  selectAuthLoading,
  selectAuthUser,
} from '../../../../store/selectors/auth';
import { updateUser } from '../../../../store/actions/auth';
import AlertPrompt from '../../../../components/alertprompt/AlertPrompt';
import LoadingSpinner from '../../../../components/loadingspinner/LoadingSpinner';

const UserDashboard = ({ loading, user, updateUser }) => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
  });

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
    const userId = user && user._id;

    e.preventDefault();
    updateUser({ name, password, email, userId });
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
              <i className='fa fa-user' aria-hidden='true'></i> User Dashboard
            </Col>
          </Row>
          <Row className='user-row-body'>
            <Col className='left' md={3}>
              <ul>
                <li>
                  <Link to='/cart'>My Cart</Link>
                </li>
                <li>
                  <Link to='/user/account'>Update Account</Link>
                </li>
                <li>
                  <Link to='/user/purchase'>Purchase History</Link>
                </li>
              </ul>
            </Col>
            <Col className='right' md={9}>
              <ListGroup>
                <ListGroup.Item>{user && user.name}</ListGroup.Item>
                <ListGroup.Item>{user && user.email}</ListGroup.Item>
                {/* <ListGroup.Item>
                  {user && user.role === 1 ? 'Admin' : 'Registered User'}
                </ListGroup.Item> */}
              </ListGroup>
            </Col>
          </Row>
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
