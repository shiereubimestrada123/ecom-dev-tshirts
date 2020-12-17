import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { Row, Col, Spinner, ListGroup } from 'react-bootstrap';

import PaginationHistory from '../../../../components/pagination/PaginationHistory';

import {
  selectAuthLoading,
  selectAuthUser,
} from '../../../../store/selectors/auth';

const UserPurchase = ({ loading, user }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [currentpage, setcurrentpage] = useState(1);
  const [purchaseperpage] = useState(5);

  const indexOfLastPurchase = currentpage * purchaseperpage;
  const indexOfFirstPurchase = indexOfLastPurchase - purchaseperpage;
  const purchase =
    user && user.history.slice(indexOfFirstPurchase, indexOfLastPurchase);

  const paginate = (pageNumber) => setcurrentpage(pageNumber);

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
          <Row className='mt-5 user-row-header'>
            <Col>
              <i className='fa fa-user' aria-hidden='true'></i> Purchase History
            </Col>
          </Row>
          <Row className='user-row-body'>
            <Col>
              {purchase.map((history) => (
                <ListGroup key={history._id} className='purchase-history'>
                  <ListGroup.Item as='li'>{history._id}</ListGroup.Item>
                  <ListGroup.Item as='li'>{history.name}</ListGroup.Item>
                  <ListGroup.Item as='li'>{history.description}</ListGroup.Item>
                  <ListGroup.Item as='li'>{history.quantity}</ListGroup.Item>
                  <ListGroup.Item as='li'>{history.amount}</ListGroup.Item>
                </ListGroup>
              ))}
              <div className='pagination-purchase-history'>
                <PaginationHistory
                  purchaseperpage={purchaseperpage}
                  totalpurchase={user.history.length}
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

UserPurchase.propTypes = {};

const mapStateToProps = createStructuredSelector({
  loading: selectAuthLoading,
  user: selectAuthUser,
});

export default connect(mapStateToProps)(UserPurchase);
