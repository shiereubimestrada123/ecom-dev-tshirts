import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ListGroup } from 'react-bootstrap';

const CategoryFilter = ({ categories, handleFilters, selectedAll }) => {
  const handleClick = (id) => {
    handleFilters(id);
  };

  const handleAll = () => {
    handleFilters(selectedAll);
  };

  return (
    <div>
      <ListGroup as='ul'>
        <ListGroup.Item onClick={handleAll}>{selectedAll}</ListGroup.Item>
        {categories &&
          categories.map((category, index) => (
            <ListGroup.Item
              as='li'
              key={index}
              onClick={() => handleClick(category._id)}
            >
              {category.name}
            </ListGroup.Item>
          ))}
      </ListGroup>
    </div>
  );
};

CategoryFilter.propTypes = {
  categories: PropTypes.array.isRequired,
};

export default CategoryFilter;
