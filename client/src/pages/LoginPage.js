import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Form from '../components/ui/Form';
import Input from '../components/ui/Input';
import useAuthContext from '../hooks/useAuthContext';
import withValidation from '../validation/withValidationHOC';
import validation from '../validation/validationErrors';

const InputWithValidation = withValidation(Input, validation);
const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuthContext();
  const [serverError, setServerError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  useEffect(() => {
    console.log('render')
  }, []);


  const submitHandler = async (e) => {
    console.log('yey');
    e.preventDefault();
    try {
      await login(formData);
      navigate('/recipes');
    } catch (e) {
      setServerError(e);
    }
  };

  return (
    <Form
      id='loginForm'
      setFormData={setFormData}
      formData={formData}
      submitHandler={submitHandler}
    >
      <div className='form-title'>Sign In</div>
      <InputWithValidation
        placeholder='Enter email'
        type='email'
        name='email'
        value={formData.email}
        required
      />
      <InputWithValidation
        placeholder='Enter password'
        type='password'
        name='password'
        required
        value={formData.password}
      />
      <div className='error'>{serverError}</div>
      <div className='form-footer'>
        <button
          role='submit'
          className='button sign-in'
        >Sign-In
        </button>
        <div className='sign-up-link'>
          <span>New user?</span>
          <Link to='/sign-up'>Sign Up here</Link>
        </div>
      </div>
    </Form>
  );

};
export default LoginPage;
