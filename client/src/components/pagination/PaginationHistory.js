import React from 'react';
// import PropTypes from 'prop-types';
import Pagination from 'react-bootstrap/Pagination';

const PaginationProduct = ({
  purchaseperpage,
  totalpurchase,
  paginate,
  currentpage,
}) => {
  let active = currentpage;
  let pageNumbers = [];
  for (
    let number = 1;
    number <= Math.ceil(totalpurchase / purchaseperpage);
    number++
  ) {
    pageNumbers.push(
      <Pagination.Item
        key={number}
        active={number === active}
        onClick={() => paginate(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <div>
      <Pagination>{pageNumbers}</Pagination>
    </div>
  );
};

// PaginationProduct.propTypes = {};

export default PaginationProduct;
