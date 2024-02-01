import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch } from 'react-icons/fa'
import { Context } from "../App";
const Navbar = () => {
  const [user, setUser] = useContext(Context);
  let navigate = useNavigate();

  useEffect(() => {
    const id = localStorage.getItem('id');
    setUser(id)
  }, [])
  const deleteCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  };
  function signOut() {
    localStorage.removeItem('id');
    setUser(null)
    deleteCookie('token');
    navigate("/")
  }
  return (
    <header>
      <nav>
        <Link to="/">
          <span>MERN Estate</span>
        </Link>
        <form>
          <input type="text" placeholder="Search..." />
          <FaSearch style={{ "color": "#999" }} />
        </form>
        {user ? (
          <div className="navbar-sign-in-up">
            <span className="sign-out" onClick={signOut}>Sign out</span>
            <Link to="profile">
              <span>profile</span>
            </Link>
          </div>
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
