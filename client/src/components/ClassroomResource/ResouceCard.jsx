import React from 'react'
import classes from './ResourceCard.module.css'

export default function ResouceCard({title, description}) {
  return (
    <div className={classes.card}>
      <img className={classes.image}/>
      <div className={classes['card-desc']}>
        <h2>{title}</h2>
        <p>{description}</p>
        <button className={classes['view-btn']}>View</button>
      </div>
    </div>
  )
}
