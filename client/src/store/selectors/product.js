import { createSelector } from 'reselect';

const selectProduct = (state) => state.product;

export const selectCartProducts = createSelector(
  [selectProduct],
  (product) => product.cartProducts
);

export const selectAllProducts = createSelector(
  [selectProduct],
  (product) => product.products
);

export const selectSingleProduct = createSelector(
  [selectProduct],
  (product) => product.product
);

export const selectCartProductsCount = createSelector(
  [selectCartProducts],
  (cartProducts) =>
    cartProducts.reduce(
      (accumulatedQuantity, cartProduct) =>
        accumulatedQuantity + cartProduct.count,
      0
    )
);
