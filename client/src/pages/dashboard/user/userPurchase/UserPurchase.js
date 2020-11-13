import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { Row, Col, Spinner, ListGroup } from 'react-bootstrap';

import {
  selectAuthLoading,
  selectAuthUser,
} from '../../../../store/selectors/auth';

const UserPurchase = ({ loading, user }) => {
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
          {user.history.map((history) => (
            <ListGroup key={history._id} style={{ marginBottom: '10px' }}>
              <ListGroup.Item as='li'>{history._id}</ListGroup.Item>
              <ListGroup.Item as='li'>{history.name}</ListGroup.Item>
              <ListGroup.Item as='li'>{history.description}</ListGroup.Item>
              <ListGroup.Item as='li'>{history.quantity}</ListGroup.Item>
              <ListGroup.Item as='li'>{history.amount}</ListGroup.Item>
            </ListGroup>
          ))}
        </Fragment>
      )}
    </Fragment>
  );
};

UserPurchase.propTypes = {};

const mapStateToProps = createStructuredSelector({
  loading: selectAuthLoading,
  user: selectAuthUser,
});

export default connect(mapStateToProps)(UserPurchase);
