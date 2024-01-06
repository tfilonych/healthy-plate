import React, { forwardRef } from 'react';

const SignUpForm = ({ signUpHandler, confirmHandler }, forwardRef) => {

  return (
    <form id="sign-up" action={signUpHandler} role="form" ref={forwardRef}>
      <div className="input-group">
        <label htmlFor="firstname">Firstname</label>
        <input type="text" name="firstname" id="firstname"/>
      </div>
      <div className="input-group">
        <label htmlFor="lastname">Lastname</label>
        <input type="text" name="lastname" id="lastname"/>
      </div>
      <div className="input-group">
        <label htmlFor="country">Country</label>
        <input type="text" name="country" id="country"/>
      </div>
      <div className="input-group">
        <label htmlFor="city">City</label>
        <input type="text" name="city" id="city"/>
      </div>
      <div className="input-group">
        <label htmlFor="email">Email</label>
        <input name="email" type="email" id="email"/>
      </div>
      <div className="input-group">
        <label htmlFor="password">Password</label>
        <input name="password" type="password" id="password"/>
        <span className="tooltip">
          Password has to be 6 symbol length
        </span>
      </div>
      <div className="input-group">
        <label htmlFor="confirm">Confirm Password</label>
        <input type="password" id="confirm" onBlur={confirmHandler}/>
      </div>
      <div className="input-group">
        <label htmlFor="password">Phone</label>
        <input name="phone" type="number" id="phone"/>
      </div>
      <input type="submit" role="button" className="button"/>
    </form>
  )
}

export default forwardRef(SignUpForm);