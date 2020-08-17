import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Row, Col, Spinner } from 'react-bootstrap';
import { getCategories } from '../../store/actions/category';
import { selectAuthLoading } from '../../store/selectors/auth';
import AlertPrompt from '../../components/alertprompt/AlertPrompt';

const Home = ({ getCategories, loading }) => {
  useEffect(() => {
    getCategories();
  }, [getCategories]);

  return (
    <Fragment>
      <AlertPrompt />
      <Row>
        <Col>
          {loading ? (
            <Row style={{ textAlign: 'center', marginTop: '200px' }}>
              <Col className='spinner-class'>
                <Spinner animation='border' variant='info' />
              </Col>
            </Row>
          ) : (
            <span>Home</span>
          )}
        </Col>
      </Row>
    </Fragment>
  );
};

Home.propTypes = {
  getCategories: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  loading: selectAuthLoading,
});

export default connect(mapStateToProps, { getCategories })(Home);
