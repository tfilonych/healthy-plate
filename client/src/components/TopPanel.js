import React, {useContext} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const TopPanel = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);

  const logoutHandler = event => {
    event.preventDefault();
    auth.logout();
    history.push('/');
  }

  return (
    <div className="top-panel">
      <div className="login-btn">
        <Link to="/login">Sign In</Link>
      </div>
    </div>
  );
};
