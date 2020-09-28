import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  selectAuthAuthenticated,
  selectAuthUser,
  selectAuthLoading,
} from '../../store/selectors/auth';

const AdminRoute = ({
  component: Component,
  isAuthenticated,
  user,
  loading,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      loading || (isAuthenticated && user.role === 1) ? (
        <Component {...props} />
      ) : (
        <Redirect to='/login' />
      )
    }
  />
);

const mapStateStoProps = createStructuredSelector({
  isAuthenticated: selectAuthAuthenticated,
  user: selectAuthUser,
  loading: selectAuthLoading,
});

export default connect(mapStateStoProps)(AdminRoute);
