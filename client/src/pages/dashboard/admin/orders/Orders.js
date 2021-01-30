import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Row, Col, ListGroup } from 'react-bootstrap';
import { Animated } from 'react-animated-css';
import moment from 'moment';
import { listOrders } from '../../../../store/actions/product';
import {
  selectAuthUser,
  selectAuthLoading,
} from '../../../../store/selectors/auth';
import { selectOrders } from '../../../../store/selectors/product';
import PaginationOrder from '../../../../components/pagination/PaginationOrder';
import LoadingSpinner from '../../../../components/loadingspinner/LoadingSpinner';

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
                <div className='holder-orders'>
                  <div className='parent-orders'>
                    <div className='orders-heading'>
                      <h2>Orders</h2>
                    </div>
                    <div className='orders-body'>
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
                  </div>
                </div>
                <div className='holder-pagination'>
                  <PaginationOrder
                    orderperpage={orderperpage}
                    totalorders={orders.length}
                    paginate={paginate}
                    currentpage={currentpage}
                  />
                </div>
              </Col>
            </Row>
          </Animated>
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
