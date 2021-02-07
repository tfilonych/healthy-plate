import React, {useState, useEffect, useContext} from 'react';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import { AuthContext } from '../context/AuthContext';

const AuthPage = () => {
    const { error, request, clearError } = useHttp();
    const message = useMessage();
    const auth = useContext(AuthContext);

    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const changeHandler = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', { ...form });
            console.log(data);
        } catch (e) {}
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', { ...form });
            console.log(data);
            auth.login(data.token, data.userId);
        } catch (e) {}
    }

    return (
        <div className="form-container">
            <div className="form-title">Sign In</div>
            <div className="login">
                <input
                  placeholder="Enter login"
                  id="login"
                  type="text"
                  name="login"
                  className="validate"
                  // autoComplete="off"
                  // onChange={changeHandler}
                />
            </div>
            <div className="password">
                <input
                  placeholder="Enter password"
                  id="password"
                  type="text"
                  name="password"
                  // onChange={changeHandler}
                  className="validate"
                />
            </div>
            <div className="buttons">
                <div className="button sign-in"
                  // style={{marginRight: 10}}
                  // onClick={loginHandler}
                >
                    Sign In
                </div>
                <div
                  className="button"
                  onClick={registerHandler}
                >
                    Sign Up
                </div>
            </div>

        </div>
    )
}

export default AuthPage;