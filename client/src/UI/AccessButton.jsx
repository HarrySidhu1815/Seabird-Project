import React from 'react'
import lockImg from '../assets/lock.png'
import loggedInImg from '../assets/loggedIn.png'
import classes from './AccessButton.module.css'
import { useSelector } from 'react-redux'

export default function AccessButton() {
  const {currentUser} = useSelector((state) => state.user)

  const borderClass = currentUser ? classes.loggedInAccount : classes.notLoggedInAccount
  return (
    <button className={`${classes['access-btn']} ${borderClass}`}>
        <img src={currentUser ?  loggedInImg : lockImg} className={classes.image}/>
        <span className={classes.paragraph}>{currentUser ? 'You Are Logged In' :'Log in for full access to all material'}</span>
    </button>
  )
}
