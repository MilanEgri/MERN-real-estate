
import React, {  useContext,useEffect } from 'react'
import {  useNavigate } from 'react-router-dom'
import { Context } from "../App";
const Profile = () => {
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
  useEffect(() =>{
    const id = localStorage.getItem('id');
    if(!id){
      navigate('/')
    }
    fetch(`/user/${id}`).then((res) => {
      res.json()
      if(!res.ok){
        signOut()
        navigate('/')
      }
    });
  },[])
  return (
    <div>Profile</div>
  )
}

export default Profile