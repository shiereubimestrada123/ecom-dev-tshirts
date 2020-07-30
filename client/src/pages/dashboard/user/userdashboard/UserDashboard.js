import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Spinner } from 'react-bootstrap';

const UserDashboard = ({ auth: { loading, isAuthenticated } }) => {
  return (
    <Fragment>
      {loading ? (
        <Row style={{ textAlign: 'center', marginTop: '200px' }}>
          <Col className='spinner-class'>
            <Spinner animation='border' variant='info' />
          </Col>
        </Row>
      ) : (
        <span>User Dashboard</span>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(UserDashboard);
