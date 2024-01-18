import React, { useContext, useEffect } from 'react'
import { FaBed, FaBath } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'
import { Context } from "../App";
import "../switchs.css"
const Create = () => {
    const [user, setUser] = useContext(Context);
    const deleteCookie = (name) => {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    };
    function signOut() {
        localStorage.removeItem('id');
        setUser(null)
        deleteCookie('token');
    }
    let navigate = useNavigate();
    useEffect(() => {
        const id = localStorage.getItem('id');
        if (!id) {
            navigate('/')
        }
        fetch(`/user/${id}`).then((res) => {
            res.json()
            if (!res.ok) {
                signOut()
                navigate('/')
            }
        });
    }, [])
    return (
        <div className='create'>
            <h1>Create Listing</h1>
            <form>
                <input placeholder='Name' type='text' id="name" name='name' required />
                <textarea placeholder='Description' id='description' name='description' required />
                <input placeholder='Address' type="text" id='address' name='address' required />
                <div className='switch-box'>
                    <span>Sell</span>
                    <label class="switch">
                        <input type="checkbox" />
                        <span class="slider round"></span>
                    </label>
                    <span>Rent</span>
                </div>
                <div className='create-rooms-and-price'>
                    <div className='create-rooms'>
                        <input placeholder='Beds'type='text'id='beds' named='beds' required />
                        <FaBed />
                        <input placeholder='Baths' type='text' id='baths' named='baths 'required />
                        <FaBath />

                    </div>
                        <input className='create-rooms-price' placeholder='Price $' type='text' id='price' name='price' required />
                </div>
                <input   type="file" id='images' accept='images/*' multiple/>
                <button className='sign-up-sign-up-button'>Submit</button>
            </form>
        </div>
    )
}

export default Create
