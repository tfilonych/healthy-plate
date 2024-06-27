import React, { useState } from 'react';

const withValidation = (WrappedComponent, validation) => {
  // eslint-disable-next-line react/display-name
  return (props) => {
    const [error, setError] = useState({});
    const [invalid, setInvalid] = useState(false);
    const { validateHandler } = validation();
    const onBlurHandler = (e) => {
      const { name } = e.target;
      const inputError = validateHandler(props.name, props.value, props.additionalVal);
      setInvalid(!!inputError);
      setError(prev => ({
        ...prev,
        [name]: inputError
      }));
    };

    return (
      <WrappedComponent
        {...props}
        onBlurHandler={onBlurHandler}
        error={error}
        className={invalid ? 'invalid' : ''}
      />
    );
  };
};
export default withValidation;