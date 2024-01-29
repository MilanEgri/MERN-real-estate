import React, { useState, useEffect } from "react";
import Listing from "../components/Listing";

const Home = () => {
  const [listings, setListings] = useState(null);

  useEffect(() => {
    fetch(`/listings`).then((res) => {
      res.json().then((data) => {
        setListings(data);
      });
    });
  }, []);
  return (
    <div className="home">
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

export default Home;
