import React, { useEffect } from 'react'
import errorImg from '../images/error.svg'
import { Link } from 'react-router-dom'

const Error = () => {
  useEffect(() =>{
    document.title = 'MERN Estate - Something Went Wrong';

},[])
  return (
    <div className='error'>
      <div className='error-contanier'>
        <img src={errorImg} alt='Error'/>
        <h1>Ooops! You weren't supposed to see this</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
        <Link to="/">Back to homepage</Link>
      </div>
    </div>
  )
}

export default Error
