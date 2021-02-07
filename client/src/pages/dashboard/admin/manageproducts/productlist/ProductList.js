import React from 'react';
import { Button } from 'react-bootstrap';

const ProductList = ({ text, product, handleRedirect, confirm }) => {
  console.log(confirm);
  return (
    <tr>
      <td>{product.name}</td>
      <td onClick={() => handleRedirect(product._id)}>
        <i className='fas fa-edit'></i>
      </td>
      <td>
        <Button
          // variant={props.variant}
          style={{ borderRadius: '0' }}
          onClick={confirm}
        >
          {text}
        </Button>
      </td>
    </tr>
  );
};

export default ProductList;
