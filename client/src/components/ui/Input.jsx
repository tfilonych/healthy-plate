import React from 'react';

const Input =
  ({
     type,
     onChangeHandler,
     onBlurHandler,
     placeholder,
     className,
     name,
     error = null,
     ...rest
   }) => (
    <div className={`input-group ${className}`}>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={onChangeHandler}
        onBlur={onBlurHandler}
        {...rest}
      />
      {error && error[name] && <span className='error'>{error[name]}</span>}
    </div>
  );

export default Input;
