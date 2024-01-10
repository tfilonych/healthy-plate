import React, {useContext, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import AuthContext from '../context/AuthContext';

const LoginPage = () => {
  const formRef = useRef(null);
  const navigate = useNavigate();
  const {login} = useContext(AuthContext);

  const loginHandler = async (e) => {
    e.preventDefault()
    const formData = new FormData(formRef.current)
    const user = Object.fromEntries(formData);
    login(user);
    formRef.current.reset()
    navigate('/recipes')
  }

  return (
    <LoginForm
      loginHandler={loginHandler}
      ref={formRef}
    />
  )

};
export default LoginPage;
