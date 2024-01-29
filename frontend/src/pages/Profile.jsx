import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../App";
import { IoIosCloseCircle } from "react-icons/io";

const Profile = () => {
  const [user, setUser] = useContext(Context);
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(true);
  const [displayError, setDispalyError] = useState("none");
  const deleteCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  };
  function signOut() {
    localStorage.removeItem("id");
    setUser(null);
    deleteCookie("token");
  }
  let navigate = useNavigate();
  function handleDelete() {
    return fetch(`/user/${user}`, { method: "DELETE" }).then((res) => {
      if (res.ok) {
        signOut();
        navigate("/deleted");
      } else {
        setDispalyError("inline");
        setTimeout(() => {
          setDispalyError("none");
        }, 2000);
      }
    });
  }

  useEffect(() => {
    const id = localStorage.getItem("id");
    if (!id) {
      navigate("/");
    }
    fetch(`/user/${id}`).then((res) => {
      if (!res.ok) {
        signOut();
        navigate("/");
      } else {
        res.json().then((data) => {
          setUserData(data);
        });
      }
    });
  }, []);
  return (
    <div className="profile">
      {editMode && (
        <div className="profile-edite-profile">
          <IoIosCloseCircle className="profile-edit-close" onClick={e => setEditMode(false)}/>
          <div className="profile-edite-profile-in">
            <h1>Edit Profile</h1>
            <input placeholder="Username" />
            <input placeholder="Email" />
            <input placeholder="Password" />
            <button className="sign-up-sign-up-button">Send</button>
            <p>If you don't want to change something leave it empty</p>
          </div>
        </div>
      )}
      <div
        className="signup-alert signup-error"
        style={{ display: displayError }}
      >
        <span>Something went wrong</span>
      </div>
      <h1>Welcome {userData}</h1>
      <Link to="/create" className="profile-create-button">
        Create listing
      </Link>
      <button onClick={handleDelete}>Delete Profile</button>
    </div>
  );
};

export default Profile;
