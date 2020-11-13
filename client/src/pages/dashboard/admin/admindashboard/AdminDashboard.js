import React, { Fragment, useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';
import { Row, Col, Spinner, Nav, Tab, ListGroup } from 'react-bootstrap';
import {
  selectAuthLoading,
  selectAuthUser,
} from '../../../../store/selectors/auth';
import { selectOrders } from '../../../../store/selectors/product';
import { listOrders } from '../../../../store/actions/product';
import { createCategory } from '../../../../store/actions/category';
import PaginationOrder from '../../../../components/pagination/PaginationOrder';
import AlertPrompt from '../../../../components/alertprompt/AlertPrompt';
import CategoryComponent from '../categorycomponent/CategoryComponent';

const AdminDashboard = ({
  listOrders,
  createCategory,
  loading,
  user,
  orders,
}) => {
  let history = useHistory();

  const [currentpage, setcurrentpage] = useState(1);
  const [orderperpage] = useState(3);

  const indexOfLastOrder = currentpage * orderperpage;
  const indexOfFirstOrder = indexOfLastOrder - orderperpage;
  const allOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const paginate = (pageNumber) => setcurrentpage(pageNumber);

  const [categoryData, setCategoryData] = useState('');

  useEffect(() => {
    listOrders(user && user._id);
  }, [user]);

  const categoryFormCallback = () => {
    setCategoryData(categoryData);
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
                  <Link to='/'>Orders</Link>
                </li>
                <li>
                  <Link to='/user/account'>Update Account</Link>
                </li>
              </ul>
            </Col>
            <Col className='left' md={9}>
              <ListGroup>
                <ListGroup.Item>{user && user.name}</ListGroup.Item>
                <ListGroup.Item>{user && user.email}</ListGroup.Item>
                {/* <ListGroup.Item>
                  {user && user.role === 1 ? 'Admin' : 'Registered User'}
                </ListGroup.Item> */}
              </ListGroup>
            </Col>
          </Row>
          {/* <Tab.Container id='left-tabs-example' defaultActiveKey='first'>
            <Row className='admin-row-body'>
              <Col className='left' md={3}>
                <Nav variant='pills' className='flex-column'>
                  <Nav.Item>
                    <Nav.Link eventKey='first'>Create Category</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey='second'>Create Product</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey='three'>Orders</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col className='right' md={9}>
                <Tab.Content>
                  <Tab.Pane eventKey='first'>
                    <CategoryComponent parentCallback={categoryFormCallback} />
                  </Tab.Pane>
                  <Tab.Pane eventKey='second'>
                    <p>second</p>
                  </Tab.Pane>
                  <Tab.Pane eventKey='three'>
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

                    <PaginationOrder
                      orderperpage={orderperpage}
                      totalOrders={orders.length}
                      paginate={paginate}
                      currentpage={currentpage}
                    />
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container> */}
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

export default connect(mapStateToProps, { listOrders, createCategory })(
  AdminDashboard
);
