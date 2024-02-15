import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Error from "./Error";

const Listing = () => {
  const [isNotExist, setIsNotExist] = useState(false);
  const [listingData, setListingData] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const { id } = useParams();
  useEffect(() => {
    fetch(`/listings/${id}`).then((res) => {
      if (!res.ok) {
        setIsNotExist(true);
        document.title = "MERN Estate - Something Went Wrong";
      } else {
        res.json().then((data) => {
          setListingData(data);
          document.title = `MERN Estate - ${data.name}`;
          setIsLoaded(true);
          console.log(data);
        });
      }
    });
  }, []);
  return (
    <div className="listing-container">
      {isNotExist ? (
        <Error />
      ) : (
        isLoaded && (
          <div className="single-listing">
            <div>
              <img
                src={`data:image/png;base64,${listingData.imagerUrls[0].data}`}
              />
            </div>
            <h1>{listingData && listingData.name}</h1>
            <h2 className="single-listing-description">
              {listingData && listingData.adress}
            </h2>
            <h2>
              price: {listingData && listingData.price}${" "}
              {listingData.type == "Rent" ? "/Month" : ""}
            </h2>
            <div className="single-listing-data">
              <p>Bathrooms: {listingData && listingData.bathrooms}</p>
              <p>Bedrooms: {listingData && listingData.bedrooms}</p>
              <p>
                Furnished: {listingData && listingData.furnished ? "Yes" : "No"}
              </p>
              <p>
                Parking: {listingData && listingData.parking ? "Yes" : "No"}
              </p>
              <p>Type: {listingData && listingData.type}</p>
            </div>
            <h2 className="single-line-description-title">Description:</h2>
            <h2 className="single-listing-description">
              {listingData && listingData.description}
            </h2>
          </div>
        )
      )}
    </div>
  );
};

export default Listing;
