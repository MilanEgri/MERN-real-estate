import React, { useState } from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  const [isLogined, setIsLogined] = useState(false);
  return (
    <header>
      <nav>
        <Link to="/">
          <span>Home</span>
        </Link>
        <input type="text" placeholder="Search..." />
        {isLogined ? (
          <span>Sign out</span>
        ) : (
          <div className="navbar-sign-in-up">
            <Link to="sign-in">
              <span>Sign in</span>
            </Link>
            <Link to="sign-up">
              <span>Sign up</span>
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
