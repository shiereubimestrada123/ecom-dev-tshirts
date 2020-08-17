import { createSelector } from 'reselect';

const selectAuth = (state) => state.auth;

export const selectAuthAuthenticated = createSelector(
  [selectAuth],
  (auth) => auth.isAuthenticated
);

export const selectAuthUser = createSelector([selectAuth], (auth) => auth.user);

export const selectAuthLoading = createSelector(
  [selectAuth],
  (auth) => auth.loading
);
