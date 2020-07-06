import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { getCategories } from '../../store/actions/category';

const Home = ({ getCategories }) => {
  useEffect(() => {
    getCategories();
  }, [getCategories]);

  return (
    <Row>
      <Col md={9}>Home</Col>
    </Row>
  );
};

Home.propTypes = {};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { getCategories })(Home);
