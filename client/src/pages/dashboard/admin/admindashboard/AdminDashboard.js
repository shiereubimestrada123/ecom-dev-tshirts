import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Row, Col, ListGroup, Jumbotron } from 'react-bootstrap';
import { Animated } from 'react-animated-css';
import {
  selectAuthLoading,
  selectAuthUser,
} from '../../../../store/selectors/auth';
import { selectOrders } from '../../../../store/selectors/product';
import { listOrders } from '../../../../store/actions/product';
import AlertPrompt from '../../../../components/alertprompt/AlertPrompt';
import LoadingSpinner from '../../../../components/loadingspinner/LoadingSpinner';

const AdminDashboard = ({ listOrders, loading, user, orders }) => {
  useEffect(() => {
    listOrders(user && user._id);
    window.scrollTo(0, 0);
  }, [user]);

  return (
    <Fragment>
      <AlertPrompt />
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Animated animationIn='fadeIn' animationOut='fadeOut' isVisible={true}>
          <section className='admin-parent'>
            <Row>
              <Col md={12}>
                <Jumbotron>
                  <h1>Admin Dashboard</h1>
                </Jumbotron>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <ListGroup as='ul'>
                  <ListGroup.Item as='li' active>
                    Admin Links
                  </ListGroup.Item>
                  <ListGroup.Item as='li'>
                    <Link to='/admin/create/category'>Create Category</Link>
                  </ListGroup.Item>
                  <ListGroup.Item as='li'>
                    <Link to='/admin/create/product'>Create Product</Link>
                  </ListGroup.Item>
                  <ListGroup.Item as='li'>
                    <Link to='/admin/products'>Manage Products</Link>
                  </ListGroup.Item>
                  <ListGroup.Item as='li'>
                    <Link to='/admin/orders'>Orders</Link>
                  </ListGroup.Item>
                  <ListGroup.Item as='li'>
                    <Link to='/user/account'>Update Account</Link>
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={6} className='user-information-parent'>
                <ListGroup as='ul'>
                  <ListGroup.Item as='li' active>
                    Admin Information
                  </ListGroup.Item>
                  <ListGroup.Item as='li'>{user && user.name}</ListGroup.Item>
                  <ListGroup.Item as='li'>{user && user.email}</ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          </section>
        </Animated>
      )}
    </Fragment>
  );
};

const mapStateToProps = createStructuredSelector({
  user: selectAuthUser,
  orders: selectOrders,
  loading: selectAuthLoading,
});

export default connect(mapStateToProps, { listOrders })(AdminDashboard);
