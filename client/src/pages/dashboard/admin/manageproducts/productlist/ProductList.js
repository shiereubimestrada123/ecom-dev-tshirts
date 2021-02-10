import React from 'react';

const ProductList = ({ product, handleRedirect, handleShow }) => {
  return (
    <tr>
      <td>{product.name}</td>
      <td>
        <i
          className='fas fa-edit'
          onClick={() => handleRedirect(product._id)}
        ></i>
      </td>
      <td>
        <i className='fas fa-trash-alt' onClick={() => handleShow(product)}></i>
      </td>
    </tr>
  );
};

export default ProductList;
