import React from 'react'
import classes from './Input.module.css'

export default function Input({name, title, ...props}) {
  return (
    <input className={classes.input} id={name} name={name} placeholder={title} required {...props}/>
  )
}
