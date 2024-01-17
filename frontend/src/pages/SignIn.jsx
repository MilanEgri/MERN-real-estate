import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'

const SignIn = () => {
  const [username, setUsername] = useState("")
  const [displaySucces,setDispalySucces] = useState("none")
  const [displayError,setDispalyError] = useState("none")
  const [password, setPassword] = useState("")
  let navigate = useNavigate();
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
        setDispalySucces("inline")
        clearUseStates()
        setTimeout(() => {
          setDispalySucces("none")
          navigate('/')
        }, 2000);
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
      <button className='sign-up-sign-up-button'>Sing Up</button>
      <button>Continue with google</button>
    </form>
    <p>Don't have an accout? <Link to={"/sign-up"}>Sign up</Link></p>
  </div>
  )
}

export default SignIn