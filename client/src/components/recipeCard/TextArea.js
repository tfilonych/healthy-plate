import React from 'react';

const TextArea = ({ placeholder, value, changeHandler, name }) => (
  <textarea
    className=""
    placeholder={placeholder}
    name={name}
    value={value}
    onChange={changeHandler}
  />
);

export default TextArea;
