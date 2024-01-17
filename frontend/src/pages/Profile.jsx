
import React, { useState, useContext,useEffect } from 'react'
import { Link, redirect, useNavigate } from 'react-router-dom'
import { Context } from "../App";
const Profile = () => {
  const [user, setUser] = useContext(Context);
  let navigate = useNavigate();
  useEffect(() =>{
    const id = localStorage.getItem('id');
    if(id){
      navigate('/')
    }
  },[])
  return (
    <div>Profile</div>
  )
}

export default Profile