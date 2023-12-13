import React, { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
    const { request, error } = useHttp();
    const formRef = useRef(null);
    const navigate = useNavigate();
    const auth = useContext(AuthContext);

    const loginHandler = async (formData) => {
        const user = Object.fromEntries(formData);
        const data = await request('/api/auth/login', 'POST', {...user});

        formRef.current.reset()
        if (!data?.token) return;

        auth.login(data.token);
        navigate('/recipes')
  }

  return (
      <LoginForm
          loginHandler={loginHandler}
          error={error}
          ref={formRef}
      />
  )

};
export default LoginPage;
