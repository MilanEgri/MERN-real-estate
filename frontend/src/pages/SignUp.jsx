import React, { useState,useEffect } from 'react'
import { Link,useNavigate } from 'react-router-dom'

const SignUp = () => {
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [displaySucces,setDispalySucces] = useState("none")
  const [displayError,setDispalyError] = useState("none")
  let navigate = useNavigate(); 
  useEffect(() =>{
    const id = localStorage.getItem('id');
    if(id){
      navigate('/')
    }
  },[])
  function clearUseStates() {
    setEmail("")
    setPassword("")
    setUsername("")
  }
  function handleSubmit(e) {
    e.preventDefault()
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    }).then((res) => {
      if(res.ok){
        setDispalySucces("inline")
        clearUseStates()
        setTimeout(() => {
          setDispalySucces("none")
          navigate('/sign-in')
        }, 2000);
      }else{
        setDispalyError("inline")
        setTimeout(() => {
          setDispalyError("none")
        }, 2000);
      }
    });
  }
  return (
    <div className='sign-up'>
      <h1>Sing up</h1>
      <div className='signup-alert signup-error' style={{ "display": displayError }}>
        <span>Something went wrong</span>
      </div>
      <div className='signup-alert signup-succes' style={{ "display": displaySucces }}>
        <span>Succesfull registration</span>
      </div>
      <form onSubmit={handleSubmit}>
        <input type='text' placeholder='Username' id='username' name='username' value={username} onChange={e => setUsername(e.target.value)} />
        <input type='email' placeholder='Email' id="email" name='email' value={email} onChange={e => setEmail(e.target.value)} />
        <input type='password' placeholder='Password' id='password' name='password' value={password} onChange={e => setPassword(e.target.value)} />
        <button className='sign-up-sign-up-button'>Sing Up</button>
      </form>
      <p>Have an accout? <Link to={"/sign-in"}>Sign in</Link></p>
    </div>
  )
}

export default SignUp