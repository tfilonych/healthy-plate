import React, { useEffect } from 'react';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';

const AuthPage = () => {
  const { error, clearError } = useHttp();
  const message = useMessage();

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  return (
    <div className="form-container">
      <div className="form-title">Sign In</div>
      <div className="login">
        <input
          placeholder="Enter login"
          id="login"
          type="text"
          name="login"
          className="validate"
          // autoComplete="off"
          // onChange={changeHandler}
        />
      </div>
      <div className="password">
        <input
          placeholder="Enter password"
          id="password"
          type="text"
          name="password"
          // onChange={changeHandler}
          className="validate"
        />
      </div>
      <div className="buttons">
        <div
          className="button sign-in"
          // style={{marginRight: 10}}
          // onClick={loginHandler}
        >
          Sign In
        </div>
        <div className="button">Sign Up</div>
      </div>
    </div>
  );
};

export default AuthPage;
