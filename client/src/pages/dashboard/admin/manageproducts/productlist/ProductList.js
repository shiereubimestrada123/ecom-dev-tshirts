import React from 'react';

const ProductList = ({ product, handleRedirect, handleShow }) => {
  return (
    <tr>
      <td>{product.name}</td>
      <td onClick={() => handleRedirect(product._id)}>
        <i className='fas fa-edit'></i>
      </td>
      <td onClick={() => handleShow(product)}>
        <i className='fas fa-trash-alt'></i>
      </td>
    </tr>
  );
};

export default ProductList;
