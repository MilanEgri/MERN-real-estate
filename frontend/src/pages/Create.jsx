import React, { useContext, useEffect, useState } from "react";
import { FaBed, FaBath } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Context } from "../App";
import "../switchs.css";
const Create = () => {
  const [user, setUser] = useContext(Context);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [adress, setAdress] = useState("");
  const [rent, setRent] = useState(false);
  const [hasParking, setParking] = useState(false);
  const [hasFurnished, setFurnished] = useState(false);
  const [beds, setBeds] = useState("");
  const [baths, setBaths] = useState("");
  const [price, setPrice] = useState("");
  const [displaySucces, setDispalySucces] = useState("none");
  const [displayError, setDispalyError] = useState("none");
  const [image, setImage] = useState([]);
  const deleteCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  };
  function signOut() {
    localStorage.removeItem("id");
    setUser(null);
    deleteCookie("token");
  }
  function clearUseStates() {
    setName("");
    setDescription("");
    setAdress("");
    setBeds("");
    setBaths("");
    setPrice("");
    setImage([]);
    setParking(false);
    setFurnished(false);
  }
  let navigate = useNavigate();
  useEffect(() => {
    const id = localStorage.getItem("id");
    if (!id) {
      navigate("/");
    }
    fetch(`/user/${id}`).then((res) => {
      res.json();
      if (!res.ok) {
        signOut();
        navigate("/");
      }
    });
    document.title = 'MERN Estate - Create listing';
  }, []);
  function clickSubmit(e) {
    e.preventDefault();
    console.log(rent);
    const rentType = rent ? "Rent" : "Sell";
    const data = new FormData();
    data.set("name", name);
    data.set("description", description);
    data.set("adress", adress);
    data.set("furnished", hasFurnished);
    data.set("parking", hasParking);
    data.set("bathrooms", baths);
    data.set("type", rentType);
    data.set("bedrooms", beds);
    data.set("price", price);
    data.set("useRef", user);
    for (let i = 0; i < image.length; i++) {
      data.append("image", image[i]);
    }
    fetch("/create", {
      method: "POST",
      body: data,
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setDispalySucces("inline");
          clearUseStates();
          setTimeout(() => {
            setDispalySucces("none");
            navigate(`/listings/${data}`);
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
  return (
    <div className="create">
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
        <span>Succesfull registration</span>
      </div>
      <h1>Create Listing</h1>
      <form onSubmit={(e) => clickSubmit(e)}>
        <input
          placeholder="Name"
          type="text"
          id="name"
          name="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="Description"
          id="description"
          name="description"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          placeholder="Address"
          type="text"
          id="address"
          name="address"
          value={adress}
          onChange={(e) => setAdress(e.target.value)}
          required
        />
        <div className="switch-box">
          <span>Sell</span>
          <label className="switch">
            <input
              type="checkbox"
              value={rent}
              onChange={(e) => setRent(!rent)}
            />
            <span className="slider round"></span>
          </label>
          <span>Rent</span>
        </div>
        <div>
          <div>
            Furnished:
            <input
              type="checkbox"
              id="furnished"
              named="furnished"
              value={hasFurnished}
              onChange={(e) => setFurnished(e.target.value)}
            />
          </div>
          <div>
            Parking:
            <input
              type="checkbox"
              id="parking"
              named="parking"
              value={hasParking}
              onChange={(e) => setParking(e.target.value)}
            />
          </div>
        </div>
        <div className="create-rooms-and-price">
          <div className="create-rooms">
            <input
              placeholder="Beds"
              type="text"
              id="beds"
              named="beds"
              required
              value={beds}
              onChange={(e) => setBeds(e.target.value)}
            />
            <FaBed />
            <input
              placeholder="Baths"
              type="text"
              id="baths"
              named="baths "
              required
              value={baths}
              onChange={(e) => setBaths(e.target.value)}
            />
            <FaBath />
          </div>
          <input
            className="create-rooms-price"
            placeholder="Price $"
            type="text"
            id="price"
            name="price"
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <input
          type="file"
          id="images"
          accept="images/*"
          multiple
          onChange={(e) => setImage(e.target.files)}
        />
        <button className="sign-up-sign-up-button">Submit</button>
      </form>
    </div>
  );
};

export default Create;
