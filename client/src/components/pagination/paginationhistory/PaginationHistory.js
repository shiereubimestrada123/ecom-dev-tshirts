import React from 'react';
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

export default PaginationProduct;
