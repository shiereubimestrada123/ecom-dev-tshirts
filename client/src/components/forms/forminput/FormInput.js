import React, { Fragment } from 'react';

const FormInput = ({
  name,
  type,
  placeholder,
  onChange,
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
        value={value}
        className={className}
      />
    </Fragment>
  );
};

export default FormInput;
