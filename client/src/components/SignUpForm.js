import React, { forwardRef } from 'react';

const SignUpForm = ({ signUpHandler, confirmHandler }, formRef) => {

  return (
    <form id='sign-up' onSubmit={(e) => signUpHandler(e)} role='form' ref={formRef}>
      <div className='input-group'>
        <input type='text'
               placeholder='Enter username'
               name='userName'
               minLength='6'
               required
        />
        <span className='tooltip'>
          Username has to be 6 symbol length
        </span>
      </div>
      <div className='input-group'>
        {/*<label htmlFor='email'>Email</label>*/}
        <input name='email' type='email' id='email' placeholder='Enter email' />
      </div>
      <div className='input-group'>
        {/*<label htmlFor='password'>Password</label>*/}
        <input name='password' type='password' id='password' placeholder='Enter password' required />
        <span className='tooltip'>
          Password has to be 6 symbol length
        </span>
      </div>
      <div className='input-group'>
        {/*<label htmlFor='confirm'>Confirm Password</label>*/}
        <input type='password' id='confirm' placeholder='Confirm password' onBlur={confirmHandler} />
      </div>
      <button role='submit' className='button'>Sign Up</button>
    </form>
  );
};

export default forwardRef(SignUpForm);