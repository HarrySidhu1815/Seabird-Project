import React from 'react'
import classes from './AboutCard.module.css'

export default function AboutCard({title, imageSrc, children, links}) {
  return (
    <div className={classes.about}>
      <h1>{title}</h1>
      <div className={classes['about-card']}>
        <img className={classes['about-image']} src={imageSrc}/>
        <div className={classes['about-intro']}>
            <p className={classes['about-description']}>{children}</p>
            {links.map(({websiteTitle, link}) => (<a key={link} href={link} className={classes['about-link']}>&#8594; {websiteTitle}</a>))}
        </div>
      </div>
    </div>
  )
}
