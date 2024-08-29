import React from 'react'
import lockImg from '../assets/lock.svg'
import loggedInImg from '../assets/loggedIn.png'
import bluePadlock from '../assets/PadlockBlue.svg'
import classes from './AccessButton.module.css'
import { useSelector } from 'react-redux'

export default function AccessButton({isHomePage}) {
  const {currentUser} = useSelector((state) => state.user)

  let borderClass = ''

  if(isHomePage){
    borderClass = currentUser ? classes.loggedInAccount : classes.notLoggedInAccount
  
  }

  return (
    <button className={`${classes['access-btn']} ${borderClass}`}>
      <img src={ isHomePage ? (currentUser ?  loggedInImg : lockImg): bluePadlock} className={classes.image}/>
        <span className={classes.paragraph}>{currentUser ? 'You Are Logged In' :'Log in for full access to all material'}</span>
    </button>
  )
}
