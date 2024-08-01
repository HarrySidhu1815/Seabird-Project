import React from 'react'
import classes from './Lesson.module.css'

export default function Lesson({level, title, children}) {
  return (
    <div className={classes.lesson}>
      <div className={classes['lesson-level']}><h4>{level}</h4><div></div></div>
      <div className={classes['lesson-description']}>
        <h2>{title}</h2>
        <p>{children}</p>
        <span>Download Lesson Package</span>
      </div>
    </div>
  )
}
