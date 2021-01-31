import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Row, Col, ListGroup, Jumbotron } from 'react-bootstrap';
import { Animated } from 'react-animated-css';
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
          <Animated
            animationIn='fadeIn'
            animationOut='fadeOut'
            isVisible={true}
          >
            <section className='user-parent'>
              <Row>
                <Col md={12}>
                  <Jumbotron>
                    <h1>User Dashboard</h1>
                  </Jumbotron>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <ListGroup as='ul'>
                    <ListGroup.Item as='li' active>
                      User Links
                    </ListGroup.Item>
                    <ListGroup.Item as='li'>
                      <Link to='/cart'>My Cart</Link>
                    </ListGroup.Item>
                    <ListGroup.Item as='li'>
                      <Link to='/user/purchase'>Purchase History</Link>
                    </ListGroup.Item>
                    <ListGroup.Item as='li'>
                      <Link to='/user/account'>Update Account</Link>
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
                <Col md={6} className='user-information-parent'>
                  <ListGroup as='ul'>
                    <ListGroup.Item as='li' active>
                      User Information
                    </ListGroup.Item>
                    <ListGroup.Item as='li'>{user && user.name}</ListGroup.Item>
                    <ListGroup.Item as='li'>
                      {user && user.email}
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>
            </section>
          </Animated>
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
