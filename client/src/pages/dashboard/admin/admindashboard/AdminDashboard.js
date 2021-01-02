import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Row, Col, ListGroup } from 'react-bootstrap';
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
        <Fragment>
          <Row className='mt-5 admin-row-header'>
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
          </Row>
        </Fragment>
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
