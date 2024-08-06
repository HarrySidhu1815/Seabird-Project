import React from 'react'
import { Link } from 'react-router-dom'

const SignUp = () => {
  return (
    <div>
      <h1>Sign Up</h1>
      <form>
        <input type='text' placeholder='Username' id='username' required />
        <input type='email' placeholder='Email' id='email' required />
        <input type='password' placeholder='Password' id='password' required />
        <button>Sign Up</button>
      </form>
      <div>
        <p>Have an account</p>
        <Link to='/login'>
        <span>Login In</span>
        </Link>
      </div>
    </div>
  )
}

export default SignUp
