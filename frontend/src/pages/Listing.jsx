import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Error from './Error'

const Listing = () => {
  const [isNotExist, setIsNotExist] = useState(false)
  const [listingData, setListingData] = useState(null)
  const { id } = useParams();
  useEffect(() => {
    fetch(`/listings/${id}`).then((res) => {
      if (!res.ok) {
        setIsNotExist(true)
      } else {

        res.json().then((data) => {
          setListingData(data)
          console.log(data)
        })
      }

    });
  }, [])
  return (
    <div>
      {isNotExist ? <Error /> : 
      <>
      <h1>name:{listingData && listingData.name}</h1>
      <h2>description:{listingData && listingData.description}</h2>
      <h2>adress:{listingData && listingData.adress}</h2>
      <h2>price:{listingData && listingData.price}</h2>
      <p>bathrooms:{listingData && listingData.bathrooms}</p>
      <p>bedrooms:{listingData && listingData.bedrooms}</p>
      <p>furnished:{listingData && listingData.furnished}</p>
      <p>parking:{listingData && listingData.parking}</p>
      <p>type:{listingData && listingData.type}</p>
      <p>imageUrls:{listingData && listingData.imageUrls}</p>
      </>
      }
    </div>
  )
}

export default Listing