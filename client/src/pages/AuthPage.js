import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';

const AuthPage = () => {
  const history = useHistory();
  const { error, request, clearError } = useHttp();
  const message = useMessage();
  const auth = useContext(AuthContext);

  const [form, setForm] = useState({
    email: '',
    password: ''
  });


  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', {...form});

      auth.login(data);
      history.push('/recipes')
    } catch (e) {
      console.log(e);
    }
  }
  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', { ...form });

      auth.login(data);
      history.push('/recipes')
    } catch (e) {}
  }
  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="form-container">
      <div className="form-title">Sign In</div>
      <div className="login">
        <input
          placeholder="Enter login"
          id="email"
          type="text"
          name="email"
          className="validate"
          onChange={changeHandler}
        />
      </div>
      <div className="password">
        <input
          placeholder="Enter password"
          id="password"
          type="text"
          name="password"
          onChange={changeHandler}
          className="validate"
        />
      </div>
      <div className="buttons">
        <div
          className="button sign-in"
          onClick={loginHandler}
        >
          Sign In
        </div>
        <div
          className="button"
          onClick={registerHandler}
        >Sign Up</div>
      </div>
    </div>
  );
};

export default AuthPage;
