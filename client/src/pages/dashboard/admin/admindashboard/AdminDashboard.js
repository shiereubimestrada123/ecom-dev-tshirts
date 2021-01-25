import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Row, Col, ListGroup, Jumbotron, Button } from 'react-bootstrap';
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
        <section className='admin-parent'>
          <Row>
            <Col md={12}>
              <Jumbotron>
                <h1>Admin Dashboard</h1>
                <p>Welcome back {user && user.name}</p>
                {/* <p>
                  <Button variant='primary'>Learn more</Button>
                </p> */}
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
                  <Link to='/admin/orders'>Orders</Link>
                </ListGroup.Item>
                <ListGroup.Item as='li'>
                  <Link to='/user/account'>Update Account</Link>
                </ListGroup.Item>
                <ListGroup.Item as='li'>
                  <Link to='/admin/products'>Manage Products</Link>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={6} className='user-information-parent'>
              <ListGroup as='ul'>
                <ListGroup.Item as='li' active>
                  User Information
                </ListGroup.Item>
                <ListGroup.Item as='li'>{user && user.name}</ListGroup.Item>
                <ListGroup.Item as='li'>{user && user.email}</ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          {/* <Row className='admin-row-header'>
            <Col>
              <i className='fab fa-black-tie'></i> Admin Dashboard
            </Col>
          </Row>
          <Row className='admin-row-body'>
            <Col className='left' md={3}>
              <ul>
                <li>
                  <Link to='/admin/create/category'>Create Category</Link>
                </li>
                <li>
                  <Link to='/admin/create/product'>Create Product</Link>
                </li>
                <li>
                  <Link to='/admin/orders'>Orders</Link>
                </li>
                <li>
                  <Link to='/user/account'>Update Account</Link>
                </li>
                <li>
                  <Link to='/admin/products'>Manage Products</Link>
                </li>
              </ul>
            </Col>
            <Col className='left' md={9}>
              <ListGroup>
                <ListGroup.Item>{user && user.name}</ListGroup.Item>
                <ListGroup.Item>{user && user.email}</ListGroup.Item>
              </ListGroup>
            </Col>
          </Row> */}
        </section>
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
