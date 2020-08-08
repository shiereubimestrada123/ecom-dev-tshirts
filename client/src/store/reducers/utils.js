export const addItemToCart = (cartProducts, cartItemToAdd) => {
  const existingCartProduct = cartProducts.find(
    (cartProduct) => cartProduct._id === cartItemToAdd._id
  );

  if (existingCartProduct) {
    return cartProducts.map((cartProduct) =>
      cartProduct._id === cartItemToAdd._id
        ? { ...cartProduct, count: cartProduct.count + 1 }
        : cartProduct
    );
  }

  return [...cartProducts, { ...cartItemToAdd, count: 1 }];
};
