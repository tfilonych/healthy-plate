import React, { useEffect, useRef, forwardRef } from 'react';
import { Link } from 'react-router-dom';
import SubmitButton from './SubmitButton';

const LoginForm = ({ loginHandler, error=null }, formRef) => {
    const emailRef = useRef(null);

    useEffect(() => {
        emailRef.current.focus();
    }, []);

    return (
        <form id="loginForm" className="form-container" action={loginHandler} ref={formRef}>
            <div className="form-title">Sign In</div>
            <div className="login">
                <input
                    placeholder="Enter login"
                    type="email"
                    className="validate"
                    required={true}
                    name="email"
                    ref={emailRef}
                />
                <div className="error-container">
                    <span className="error">Please enter a valid email</span>
                </div>
            </div>
            <div className="password">
                <input
                    placeholder="Enter password"
                    type="password"
                    required={true}
                    className="validate"
                    name="password"
                    minLength="6"
                />
                <div className="error-container">
                    <span className="error">Please enter a valid password</span>
                </div>
            </div>
            <div className="button-container">
                {error && <div className="error-container server-error">
                    <div className="error">{error}</div>
                </div>}
                <div className="auth-container-btn">
                    <SubmitButton />
                    <div className="sign-up-link">
                        <span>New user?</span>
                        <Link to="/sign-up">Sign Up here</Link>
                    </div>

                </div>
            </div>
        </form>
    );
};

export default forwardRef(LoginForm);