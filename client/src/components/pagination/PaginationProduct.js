import React from 'react';
import PropTypes from 'prop-types';
import Pagination from 'react-bootstrap/Pagination';

const PaginationProduct = ({
  productperpage,
  totalproducts,
  paginate,
  currentpage,
}) => {
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
      {/* <ul>
        {items.map((item) => (
          <li key={item}>
            <a href='!#' onClick={() => paginate(number)}>
              {item}
            </a>
          </li>
        ))}
      </ul> */}
    </div>
  );
};

PaginationProduct.propTypes = {};

export default PaginationProduct;
