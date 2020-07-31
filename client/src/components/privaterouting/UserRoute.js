import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const UserRoute = ({
  component: Component,
  auth: { isAuthenticated, loading, user },
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      loading || isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect to='/login' />
      )
    }
  />
);

UserRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateStoProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateStoProps)(UserRoute);
