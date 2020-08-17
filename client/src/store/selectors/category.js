import { createSelector } from 'reselect';

const selectCategory = (state) => state.category;

export const selectAllCategories = createSelector(
  [selectCategory],
  (category) => category.categories
);
