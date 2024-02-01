import React, { useEffect } from 'react'
import errorImg from '../images/error.svg'
import { Link } from 'react-router-dom'

const Deleted = () => {
    useEffect(() =>{
        document.title = 'MERN Estate - Goodbye';

    },[])
    return (
        <div className='error'>
            <div className='error-contanier'>
                <img src={errorImg} alt='Error' />
                <h1>Goodbye,</h1>
                <p>Your profile has been successfully deleted. We appreciate the time you spent with us..
                    If you ever decide to return, we'll be here to welcome you back. Thank you for being a part of this website</p>
                <Link to="/">Back to homepage</Link>
            </div>
        </div>
    )
}

export default Deleted