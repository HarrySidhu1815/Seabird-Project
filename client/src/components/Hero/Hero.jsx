import React from 'react'
import classes from './Hero.module.css'
import lockImg from '../../assets/lock.png'

export default function Hero() {
  return (
    <div id={classes.hero}>
      <h1>Your education, your histoy.</h1>
      <p>This website is a collection of educational resources gathered on behalf of Seabird
      Island Band.</p>
      <button className={classes['access-btn']}>
        <img src={lockImg} className={classes.image}/>
        <p>Log in for full access to all material</p>
      </button>
    </div>
  )
}
