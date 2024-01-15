import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import { useDispatch } from 'react-redux';
import { loginUser } from '../store/userSlice';

const LoginPage = () => {
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const user = Object.fromEntries(formData);
    await dispatch(loginUser(user));
    formRef.current.reset();
    navigate('/recipes');
  };

  return (
    <LoginForm
      loginHandler={loginHandler}
      ref={formRef}
    />
  );

};
export default LoginPage;
