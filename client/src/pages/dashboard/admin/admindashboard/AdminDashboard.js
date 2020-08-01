import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AdminDashboard = ({ auth: { loading } }) => {
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
              <div>
                <Link to='/create/product' variant='info' className=''>
                  Create Product
                </Link>
              </div>
            </Col>
            <Col className='right' md={9}>
              right
            </Col>
          </Row>
        </Fragment>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(AdminDashboard);
