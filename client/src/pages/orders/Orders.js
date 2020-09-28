import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Row, Col, Spinner, ListGroup } from 'react-bootstrap';
import moment from 'moment';
import { listOrders } from '../../store/actions/product';
import { selectAuthUser, selectAuthLoading } from '../../store/selectors/auth';
import { selectOrders } from '../../store/selectors/product';

const Order = ({ listOrders, user, orders, loading }) => {
  useEffect(() => {
    listOrders(user && user._id);
  }, [user]);

  return (
    <Fragment>
      {loading ? (
        <Row style={{ textAlign: 'center', marginTop: '200px' }}>
          <Col className='spinner-class'>
            <Spinner animation='border' variant='info' />
          </Col>
        </Row>
      ) : (
        <Row>
          <Col>
            <div>
              {orders.map((order, orderIndex) => (
                <ListGroup as='ul' key={orderIndex} className='my-3'>
                  <ListGroup.Item as='li' active>
                    Transaction Id: {order.transactionId}
                  </ListGroup.Item>
                  <ListGroup.Item as='li'>
                    Ordered by: {order.name}
                  </ListGroup.Item>
                  <ListGroup.Item as='li'>
                    Ordered date: {moment(order.createdAt).format('MM/DD/YYYY')}
                  </ListGroup.Item>
                  <ListGroup.Item as='li'>
                    Status: {order.status}
                  </ListGroup.Item>
                  <ListGroup.Item as='li'>
                    Delivery Address: {order.address}
                  </ListGroup.Item>
                  <ListGroup.Item as='li'>
                    Total: &#8369;{order.total}
                  </ListGroup.Item>
                </ListGroup>
              ))}
            </div>
          </Col>
        </Row>
      )}
    </Fragment>
  );
};

Order.propTypes = { listOrders: PropTypes.func.isRequired };

const mapStateToProps = createStructuredSelector({
  user: selectAuthUser,
  orders: selectOrders,
  loading: selectAuthLoading,
});

export default connect(mapStateToProps, { listOrders })(Order);
