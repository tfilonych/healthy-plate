import React, { Children, cloneElement } from 'react';

const Form = ({ submitHandler, id, children, setFormData }) => {
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const childrenWithProps = Children.map(children, (child) =>
    cloneElement(child, { onChangeHandler })
  );

  return (
    <form role='form' onSubmit={submitHandler} id={id}>
      {childrenWithProps}
    </form>
  );
};

export default Form;
