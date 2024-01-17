import React, { useState, useContext,useEffect } from 'react'
import { Link, redirect, useNavigate } from 'react-router-dom'
import { Context } from "../App";
const SignIn = () => {
  const [username, setUsername] = useState("")
  const [displaySucces, setDispalySucces] = useState("none")
  const [displayError, setDispalyError] = useState("none")
  const [password, setPassword] = useState("")
  const [user, setUser] = useContext(Context);
  let navigate = useNavigate();
  useEffect(() =>{
    const id = localStorage.getItem('id');
    if(id){
      navigate('/')
    }
  },[])
  function clearUseStates() {
    setPassword("")
    setUsername("")
  }
  function handleSubmit(e) {
    e.preventDefault()
    fetch("/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((res) => {
      if (res.ok) {
        res.json()
          .then((data) =>{
            setDispalySucces("inline")
            clearUseStates()
            setUser(data.id)
            localStorage.setItem('id', data.id);
            setTimeout(() => {
              setDispalySucces("none")
              navigate('/')
            }, 2000);
            })
      } else {
        setDispalyError("inline")
        setTimeout(() => {
          setDispalyError("none")
        }, 2000);
      }
    });
  }
  return (
    <div className='sign-up'>
      <h1>Sing in</h1>
      <div className='signup-alert signup-error' style={{ "display": displayError }}>
        <span>Something went wrong</span>
      </div>
      <div className='signup-alert signup-succes' style={{ "display": displaySucces }}>
        <span>Succesfull Login</span>
      </div>
      <form onSubmit={handleSubmit}>
        <input type='text' placeholder='Username' id='username' name='username' value={username} onChange={e => setUsername(e.target.value)} />
        <input type='password' placeholder='Password' id='password' name='password' value={password} onChange={e => setPassword(e.target.value)} />
        <button className='sign-up-sign-up-button'>Sing In</button>
      </form>
      <p>Don't have an accout? <Link to={"/sign-up"}>Sign up</Link></p>
    </div>
  )
}

export default SignIn