import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from '../components/ui/Form';
import Input from '../components/ui/Input';
import useAuthContext from '../hooks/useAuthContext';
import withValidation from '../validation/withValidationHOC';
import validation from '../validation/validationErrors';

const InputWithValidation = withValidation(Input, validation);
const SignUpPage = () => {
  const navigate = useNavigate();
  const { register } = useAuthContext();
  const [serverError, setServerError] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await register(formData);
      navigate('/login');
    } catch (e) {
      setServerError(e);
    }
  };

  return (
    <Form
      id='sign-up'
      setFormData={setFormData}
      formData={formData}
      submitHandler={submitHandler}
    >
      <div className='form-title'>Sign Up</div>
      <InputWithValidation
        placeholder='Enter username'
        name='username'
        value={formData.username}
        required
      />
      <InputWithValidation
        type='email'
        placeholder='Enter email'
        name='email'
        value={formData.email}
        required
      />
      <InputWithValidation
        type='password'
        name='password'
        value={formData.password}
        placeholder='Enter password'
        required
      />
      <InputWithValidation
        type='password'
        name='confirmPassword'
        value={formData.confirmPassword}
        placeholder='Confirm password'
        additionalVal={formData.password}
        required
      />
      <div className='error'>{serverError}</div>
      <button role='submit' type='button' className='button'>Sign Up</button>
    </Form>
  );
};

export default SignUpPage;