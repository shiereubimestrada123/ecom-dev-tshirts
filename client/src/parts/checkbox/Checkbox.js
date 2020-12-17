import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

const Checkbox = ({ categories, handleFilters }) => {
  const [checked, setChecked] = useState([]);

  const handleToggle = (category) => {
    const currentCategoryId = checked.indexOf(category);
    const newCheckedCategoryId = [...checked];

    if (currentCategoryId === -1) {
      newCheckedCategoryId.push(category);
    } else {
      newCheckedCategoryId.splice(currentCategoryId, 1);
    }
    setChecked(newCheckedCategoryId);
    handleFilters(newCheckedCategoryId);
  };

  return (
    <Fragment>
      {categories.map((category, index) => (
        <li key={index} style={{ listStyle: 'none' }}>
          <input
            type='checkbox'
            onChange={() => handleToggle(category._id)}
            value={checked.indexOf(category._id === -1)}
          />
          <label>{category.name}</label>
        </li>
      ))}
    </Fragment>
  );
};

Checkbox.propTypes = {};

export default Checkbox;
