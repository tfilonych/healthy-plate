import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="nav" tabIndex={-1}>
    <Link to="/">Home</Link>
    <Link to="/about">About</Link>
    <Link to="/recipes">Recipes</Link>
  </nav>
);

export default Navbar;
