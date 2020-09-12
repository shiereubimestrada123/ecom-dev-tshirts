import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  selectAuthAuthenticated,
  selectAuthLoading,
} from '../../store/selectors/auth';

const UserRoute = ({
  component: Component,
  isAuthenticated,
  loading,
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

const mapStateStoProps = createStructuredSelector({
  isAuthenticated: selectAuthAuthenticated,
  loading: selectAuthLoading,
});

export default connect(mapStateStoProps)(UserRoute);
