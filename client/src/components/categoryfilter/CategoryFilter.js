import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ListGroup } from 'react-bootstrap';

const CategoryFilter = ({ category, handleFilters }) => {
  const handleClick = (id) => {
    handleFilters(id);
  };

  return (
    <div>
      <ListGroup.Item as='li' onClick={() => handleClick(category._id)}>
        {category.name}
      </ListGroup.Item>
    </div>
  );
};

CategoryFilter.propTypes = {
  category: PropTypes.object.isRequired,
};

export default CategoryFilter;
