import React from 'react'
import classes from './LoginSection.module.css'

export default function LoginSection() {
  return (
    <div className={classes['login-container']}>
      <h1>Please enter the password to gain access to all resources and materials</h1>
      <input type='password' name='password' />
      <p>Forgot the password? Reach out to your school or organization, or request access again.</p>
    </div>
  )
}
