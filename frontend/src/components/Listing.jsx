import React from "react";
import image from "./300.webp";
import { IoLocationOutline } from "react-icons/io5";
import { FaBed, FaBath } from "react-icons/fa";

const Listing = ({ data }) => {
    function openListing(URL) {
        const currentPage = window.location.href;
        window.open(`${currentPage}listings/${URL}`, "_blank");
      }
  return (
    <div className="listing" onClick={() => openListing(data._id)}>
      <img src={`data:image/png;base64,${data.imagerUrls[0].data}`} />
      <div className="listing-datas">
        <p className="lisitig-datas-type">{data.type}</p>
        <p className="lisitig-datas-price">
          {data.price}
          {data.type === "Sell" ? " $ " : "$/ Month"}
        </p>
        <p className="lisitig-datas-name">{data.name}</p>
        <p className="lisitig-datas-adress">
          <IoLocationOutline />
          {data.adress}
        </p>
        <div className="lisitig-datas-b">
          <p>
            {" "}
            <FaBed />
            {" "}
            {data.bedrooms}
          </p>
          <p>
            {" "}
            <FaBath />
            {" "}
            {data.bathrooms}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Listing;
