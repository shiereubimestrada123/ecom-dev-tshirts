import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const AdminRoute = ({
  component: Component,
  auth: { isAuthenticated, loading, user },
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated && user.role === 1 ? (
        <Component {...props} />
      ) : (
        <Redirect to='/login' />
      )
    }
  />
);

AdminRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateStoProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateStoProps)(AdminRoute);
