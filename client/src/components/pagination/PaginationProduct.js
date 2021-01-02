import React, { useEffect } from 'react';
import Pagination from 'react-bootstrap/Pagination';

const PaginationProduct = ({
  productperpage,
  totalproducts,
  paginate,
  currentpage,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  let active = currentpage;
  let pageNumbers = [];
  for (
    let number = 1;
    number <= Math.ceil(totalproducts / productperpage);
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
