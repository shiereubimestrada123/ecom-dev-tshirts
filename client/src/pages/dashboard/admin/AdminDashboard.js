import React, { Fragment } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <Fragment>
      <Row className='mt-5 admin-row-header'>
        <Col>
          <i className='fab fa-black-tie'></i> Admin Dashboard
        </Col>
      </Row>
      <Row className='admin-row-body'>
        <Col className='left' md={3}>
          <div>
            <Link to='/create/category' variant='info' className=''>
              Create Category
            </Link>
          </div>
        </Col>
        <Col className='right' md={9}>
          right
        </Col>
      </Row>
    </Fragment>
  );
};

export default AdminDashboard;
