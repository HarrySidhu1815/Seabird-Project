import React from 'react'
import classes from './BookCard.module.css'

export default function BookCard({ title, download, image}) {
  return (
    <div className={classes.book}>
        <a target="_blank" href={download} download={title.pdf}>
            <img src={image} alt={title}/>
            <h3>{title}</h3>
        </a>
    </div>
  )
}
