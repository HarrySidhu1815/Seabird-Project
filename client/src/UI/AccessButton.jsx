import React from 'react'
import lockImg from '../assets/lock.png'
import classes from './AccessButton.module.css'

export default function AccessButton() {
  return (
    <button className={classes['access-btn']}>
        <img src={lockImg} className={classes.image}/>
        <span className={classes.paragraph}>Log in for full access to all material</span>
    </button>
  )
}
