import React from 'react';
import Pagination from 'react-bootstrap/Pagination';

const PaginationOrder = ({
  orderperpage,
  totalOrders,
  paginate,
  currentpage,
}) => {
  let active = currentpage;
  let pageNumbers = [];
  for (
    let number = 1;
    number <= Math.ceil(totalOrders / orderperpage);
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

export default PaginationOrder;
