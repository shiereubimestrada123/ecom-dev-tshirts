import React, { Fragment, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Row, Col, ListGroup, Button } from 'react-bootstrap';
import { Animated } from 'react-animated-css';
import PaginationHistory from '../../../../components/pagination/paginationhistory/PaginationHistory';
import {
  selectAuthLoading,
  selectAuthUser,
} from '../../../../store/selectors/auth';
import { loadUser } from '../../../../store/actions/auth';
import LoadingSpinner from '../../../../components/loadingspinner/LoadingSpinner';

const UserPurchase = ({ loading, user, loadUser }) => {
  useEffect(() => {
    loadUser();
    window.scrollTo(0, 0);
  }, []);

  const [currentpage, setcurrentpage] = useState(1);
  const [purchaseperpage] = useState(5);

  const indexOfLastPurchase = currentpage * purchaseperpage;
  const indexOfFirstPurchase = indexOfLastPurchase - purchaseperpage;
  const purchase =
    user && user.history.slice(indexOfFirstPurchase, indexOfLastPurchase);

  const paginate = (pageNumber) => setcurrentpage(pageNumber);

  let history = useHistory();

  const handleOnclick = () => {
    history.goBack();
  };

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
            <Fragment>
              <Row>
                <Col md={12}>
                  <section className='holder-purchase-history'>
                    <div className='parent-purchase-history'>
                      <div className='purchase-heading'>
                        <h2>Purchase History</h2>
                      </div>
                      <div className='purchase-body'>
                        {purchase.length > 0 ? (
                          purchase.map((history, index) => (
                            <ListGroup
                              as='ul'
                              key={index}
                              className='purchase-history'
                            >
                              <ListGroup.Item as='li'>
                                <strong>Name:</strong> {history.name}
                              </ListGroup.Item>
                              <ListGroup.Item as='li'>
                                <strong>Description:</strong>{' '}
                                {history.description}
                              </ListGroup.Item>
                              <ListGroup.Item as='li'>
                                <strong>Quantity:</strong> {history.quantity}
                              </ListGroup.Item>
                              <ListGroup.Item as='li'>
                                <strong>Amount:</strong> {history.amount}
                              </ListGroup.Item>
                            </ListGroup>
                          ))
                        ) : (
                          <p className='no-purchase'>
                            No user purchase to show yet
                          </p>
                        )}
                        <div className='pagination-purchase-history'>
                          <PaginationHistory
                            purchaseperpage={purchaseperpage}
                            totalpurchase={user.history.length}
                            paginate={paginate}
                            currentpage={currentpage}
                          />
                        </div>
                      </div>
                    </div>
                    <div className='go-back'>
                      <Button
                        variant='secondary'
                        className='button-goback shadow-none'
                        type='submit'
                        onClick={handleOnclick}
                      >
                        Go Back
                      </Button>
                    </div>
                  </section>
                </Col>
              </Row>
            </Fragment>
          </Animated>
        </Fragment>
      )}
    </Fragment>
  );
};

const mapStateToProps = createStructuredSelector({
  loading: selectAuthLoading,
  user: selectAuthUser,
});

export default connect(mapStateToProps, { loadUser })(UserPurchase);
