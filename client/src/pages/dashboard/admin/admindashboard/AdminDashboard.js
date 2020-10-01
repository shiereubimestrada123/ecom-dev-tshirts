import React, { Fragment, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';
import {
  Row,
  Col,
  Spinner,
  Nav,
  Tab,
  ListGroup,
  Form,
  InputGroup,
} from 'react-bootstrap';
import {
  selectAuthLoading,
  selectAuthUser,
} from '../../../../store/selectors/auth';
import { selectOrders } from '../../../../store/selectors/product';
import { listOrders } from '../../../../store/actions/product';
import { createCategory } from '../../../../store/actions/category';
import PaginationOrder from '../../../../components/pagination/PaginationOrder';
import AlertPrompt from '../../../../components/alertprompt/AlertPrompt';
import FormInput from '../../../../components/forms/forminput/FormInput';

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

  const [formData, setFormData] = useState({
    name: '',
  });

  const { name } = formData;

  useEffect(() => {
    listOrders(user && user._id);
  }, [user]);

  const handleCategoryClick = () => {
    history.push('/');
  };

  const onCategoryChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const onCategorySubmit = async (e) => {
    e.preventDefault();
    createCategory(name, user && user._id);
    // history.push('/shop');
    setFormData('');
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
          <Tab.Container id='left-tabs-example' defaultActiveKey='first'>
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
                    <Form
                      className='my-5'
                      onSubmit={(e) => onCategorySubmit(e)}
                    >
                      <Form.Group controlId='formCategoryName'>
                        <InputGroup className='mb-3'>
                          <InputGroup.Prepend>
                            <InputGroup.Text id='basic-addon1'>
                              Name
                            </InputGroup.Text>
                          </InputGroup.Prepend>
                          <Form.Control
                            type='name'
                            placeholder='Enter category name'
                            name='name'
                            value={name || ''}
                            className='create-category-input'
                            onChange={(e) => onCategoryChange(e)}
                          />
                        </InputGroup>

                        <div className='create-category-holder'>
                          <FormInput
                            name='text'
                            id='update'
                            className='btn btn-block create-category-btn'
                            type='submit'
                            value='Create Category'
                          />
                        </div>
                        {/* <Form.Label>Category Name</Form.Label>
                        <Form.Control
                          type='name'
                          placeholder='Enter category name'
                          name='name'
                          value={name || ''}
                          onChange={(e) => onCategoryChange(e)}
                        />

                        <Button
                          variant='light'
                          type='submit'
                          className='my-3 mr-2'
                          onClick={handleCategoryClick}
                        >
                          Cancel
                        </Button>
                        <Button variant='info' type='submit' className='my-3'>
                          Submit
                        </Button> */}
                      </Form.Group>
                    </Form>
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
          </Tab.Container>
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
