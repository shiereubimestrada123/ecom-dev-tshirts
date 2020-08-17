import { createSelector } from 'reselect';

const selectAlertPrompt = (state) => state.alertPrompt;

export const selectAlert = createSelector(
  [selectAlertPrompt],
  (alertPrompt) => alertPrompt
);
