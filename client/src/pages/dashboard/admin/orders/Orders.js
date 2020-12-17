import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Row, Col, Spinner, ListGroup } from 'react-bootstrap';
import moment from 'moment';
import { listOrders } from '../../../../store/actions/product';
import {
  selectAuthUser,
  selectAuthLoading,
} from '../../../../store/selectors/auth';
import { selectOrders } from '../../../../store/selectors/product';
import PaginationOrder from '../../../../components/pagination/PaginationOrder';

const Order = ({ listOrders, user, orders, loading }) => {
  const [currentpage, setcurrentpage] = useState(1);
  const [orderperpage] = useState(5);

  const indexOfLastOrder = currentpage * orderperpage;
  const indexOfFirstOrder = indexOfLastOrder - orderperpage;

  const allOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const paginate = (pageNumber) => setcurrentpage(pageNumber);

  useEffect(() => {
    listOrders(user && user._id);
    window.scrollTo(0, 0);
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
        <Fragment>
          <Row className='mt-5 admin-row-header'>
            <Col>
              <i className='fab fa-black-tie'></i> Orders
            </Col>
          </Row>
          <Row className='admin-row-body'>
            <Col>
              <div>
                {allOrders.map((order, orderIndex) => (
                  <ListGroup as='ul' key={orderIndex} className='my-3'>
                    <ListGroup.Item as='li' active>
                      Transaction Id: {order.transactionId}
                    </ListGroup.Item>
                    <ListGroup.Item as='li'>
                      Ordered by: {order.name}
                    </ListGroup.Item>
                    <ListGroup.Item as='li'>
                      Ordered date:{' '}
                      {moment(order.createdAt).format('MM/DD/YYYY')}
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
              <div>
                <PaginationOrder
                  orderperpage={orderperpage}
                  totalorders={orders.length}
                  paginate={paginate}
                  currentpage={currentpage}
                />
              </div>
            </Col>
          </Row>
        </Fragment>
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
