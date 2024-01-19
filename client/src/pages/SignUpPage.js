import React, { useRef } from 'react';
import SignUpForm from '../components/SignUpForm';
// import { useHttp } from '../hooks/http.hook'

const SignUpPage = () => {
  // const { request } = useHttp();
  const formRef = useRef(null);

  const signUpHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const user = Object.fromEntries(formData);
    console.log(user);
    // await request('/api/auth/register', 'POST', user);
    // formRef.current.reset()
    //if (!data?.token) return;

    //auth.login(data.token);
    //navigate('/recipes')
  };

  const confirmHandler = () => {
    console.log(formRef.current);
  };

  return (
    <div className='form-container'>
      <div>Sign Up</div>
      <SignUpForm signUpHandler={signUpHandler} confirmHandler={confirmHandler} ref={formRef} />
    </div>
  );
};

export default SignUpPage;