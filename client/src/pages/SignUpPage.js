import React, { useRef } from 'react';
import SignUpForm from '../components/SignUpForm';
import { useHttp } from '../hooks/http.hook'

const SignUpPage = () => {
  const { request } = useHttp();
  const formRef = useRef(null);
  const signUpHandler = async (formData) => {
    console.log(...formData.entries())
    const user = Object.fromEntries(formData);
    const data = await request('/api/auth/register', 'POST', user);
    console.log(data)

    // formRef.current.reset()
    //if (!data?.token) return;

    //auth.login(data.token);
    //navigate('/recipes')
  }

  const confirmHandler = () => {
    console.log(formRef.current)
  }

  return (
    <div className="form-container">
      <div>Sign Up</div>
      <SignUpForm signUpHandler={signUpHandler} confirmHandler={confirmHandler} formRef={formRef}/>
    </div>
  )
}

export default SignUpPage;