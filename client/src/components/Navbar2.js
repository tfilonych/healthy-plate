import React, {useContext} from 'react'
import { Link, useHistory } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export const Navbar = () => {
  const history = useHistory()
  const auth = useContext(AuthContext)

  const logoutHandler = event => {
    event.preventDefault()
    auth.logout()
    history.push('/')
  }

  return (
    <div className="nav">
      <Link to="/">Home</Link>
      <Link to="/">About</Link>
      <Link to="/recipes">Recipes</Link>
    </div>
  )
};
