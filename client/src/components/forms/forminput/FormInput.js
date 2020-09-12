import React, { Fragment } from 'react';

const FormInput = ({
  name,
  type,
  placeholder,
  onChange,
  onClick,
  className,
  value,
  label,
  ...props
}) => {
  return (
    <Fragment>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        onClick={onClick}
        value={value}
        className={className}
      />
    </Fragment>
  );
};

export default FormInput;
