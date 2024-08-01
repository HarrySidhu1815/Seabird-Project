import React from 'react'
import classes from './LoginSection.module.css'
import btn from './../../assets/submit.png'
import { useSelector } from 'react-redux'

export default function LoginSection() {
    const {verfied} = useSelector((state) => state.user)
  return (
    <div className={classes['login-container']}>
      <h1>Please enter the password to gain access to all resources and materials</h1>
      <form>
      <input type='password' name='password' />
        <img src={btn} />
      </form>
      <p>Forgot the password? Reach out to your school or organization, or request access again.</p>
    </div>
  )
}
