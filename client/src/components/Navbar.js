import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <div className="nav">
    <Link to="/">Home</Link>
    <Link to="/">About</Link>
    <Link to="/recipes">Recipes</Link>
  </div>
);

export default Navbar;
