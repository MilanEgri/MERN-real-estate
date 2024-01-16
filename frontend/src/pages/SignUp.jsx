import React from 'react'
import { Link } from 'react-router-dom'

const SignUp = () => {
  return (
    <div className='sign-up'>
      <h1>Sing up</h1>
      <form>
        <input type='text' placeholder='Username' id='username' name='username' />
        <input type='email' placeholder='Email' id="email" name='email' />
        <input type='password' placeholder='Password' id='password' name='password' />
        <button className='sign-up-sign-up-button'>Sing Up</button>
        <button>Continue with google</button>
      </form>
      <p>Have an accout? <Link to={"/sign-in"}>Sign in</Link></p>
    </div>
  )
}

export default SignUp