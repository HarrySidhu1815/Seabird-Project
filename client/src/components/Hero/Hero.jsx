import React from 'react'
import classes from './Hero.module.css'
import AccessButton from '../../UI/AccessButton'

export default function Hero() {
  return (
    <div id={classes.hero}>
      <h1>Your education, your histoy.</h1>
      <p>This website is a collection of educational resources gathered on behalf of Seabird
      Island Band.</p>
      <AccessButton />
    </div>
  )
}
