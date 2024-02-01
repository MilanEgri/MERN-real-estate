import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../App";
import { IoIosCloseCircle } from "react-icons/io";
import Listing from "../components/Listing";

const Profile = () => {
  const [user, setUser] = useContext(Context);
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [displayError, setDispalyError] = useState("none");
  const [displaySucces, setDispalySucces] = useState("none");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [listings,setListings] = useState([])
  const deleteCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  };
  function signOut() {
    localStorage.removeItem("id");
    setUser(null);
    deleteCookie("token");
  }
  function clearUseStates() {
    setUsername("");
    setEmail("");
    setPassword("");
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
  function handleUpdate() {
    const id = localStorage.getItem("id");
    fetch(`/user/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setDispalySucces("inline");
          setUserData(username);
          clearUseStates();
          setTimeout(() => {
            setDispalySucces("none");
            setEditMode(false);
          }, 2000);
        });
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
          document.title = `MERN Estate - Welcome ${data}`;
          fetch(`/userlistings/${id}`).then((res) => {
            res.json().then((data) => {
              setListings(data);
            });
          });
        });
      }
    });
  }, []);
  return (
    <div className="profile">
      {editMode && (
        <div className="profile-edite-profile">
          <IoIosCloseCircle
            className="profile-edit-close"
            onClick={(e) => setEditMode(false)}
          />
          <div className="profile-edite-profile-in">
            <h1>Edit Profile</h1>
            <input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="sign-up-sign-up-button" onClick={handleUpdate}>
              Send
            </button>
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
      <div
        className="signup-alert signup-succes"
        style={{ display: displaySucces }}
      >
        <span>Succesfull Update</span>
      </div>
      <h1>Welcome {userData}</h1>
      <Link to="/create" className="profile-create-button">
        Create listing
      </Link>
      <div className="profile-btns">
        <button className="profile-delete-button" onClick={handleDelete}>
          Delete Profile
        </button>
        <button
          className="profile-edit-button"
          onClick={(e) => setEditMode(true)}
        >
          Edit Profile
        </button>
      </div>
        <h1>Listings</h1>
        {listings ? (
        <div>
          {listings.map((e) => (
            <Listing data={e} key={e._id} />
          ))}
        </div>
      ) : (
        <div>No listing found</div>
      )}
    </div>
  );
};

export default Profile;
