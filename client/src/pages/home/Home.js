import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col, Spinner } from 'react-bootstrap';
import { getCategories } from '../../store/actions/category';

const Home = ({ getCategories, auth: { loading } }) => {
  useEffect(() => {
    getCategories();
  }, [getCategories]);

  return (
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
  );
};

Home.propTypes = {};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { getCategories })(Home);
