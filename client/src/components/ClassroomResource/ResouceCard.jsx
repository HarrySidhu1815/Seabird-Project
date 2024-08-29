import React from 'react'
import classes from './ResourceCard.module.css'
import { Link } from 'react-router-dom'

export default function ResouceCard({title, description, image, link}) {
  return (
    <div className={classes.card}>
      <img className={classes.image} src={image} alt={title}/>
      <div className={classes['card-desc']}>
        <h2>{title}</h2>
        <p>{description}</p>
        <Link className={classes.linkStyle} to={`/${link}`}><button className={classes['view-btn']}>View</button></Link>
      </div>
    </div>
  )
}
