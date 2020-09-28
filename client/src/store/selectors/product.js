import { createSelector } from 'reselect';

const selectProduct = (state) => state.product;

export const selectOrders = createSelector(
  [selectProduct],
  (product) => product.orders
);

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

export const selectCartProductCount = createSelector(
  [selectCartProducts],
  (cartProducts) =>
    cartProducts.reduce(
      (accumulatedQuantity, cartProduct) =>
        accumulatedQuantity + cartProduct.count,
      0
    )
);

export const selectCartProductTotal = createSelector(
  [selectCartProducts],
  (cartProducts) =>
    cartProducts.reduce(
      (accumalatedQuantity, cartProduct) =>
        accumalatedQuantity + cartProduct.count * cartProduct.price,
      0
    )
);
