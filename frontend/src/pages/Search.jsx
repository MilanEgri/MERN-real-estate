import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Listing from "../components/Listing";

const Search = () => {
  const [searchParams] = useSearchParams();
  const [listings, setListings] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const search = searchParams.get("search");
    if (search == null) {
      navigate("/");
    }
    document.title = `MERN Estate - ${search}`;
    if (search.length > 0) {
      fetch(`/search/${search}`).then((res) => {
        res.json().then((data) => {
          setListings(data);
        });
      });
    }
  }, [searchParams]);
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

export default Search;
