import React from 'react'
import classes from './VideoCard.module.css'

export default function VideoCard({video}) {
  return (
    <div className={classes['card-container']}>
      <img />
      <div className={classes['card-decription']}>
        <h2>{video.title}</h2>
        <p><i>{video.topic}</i><br/>Features: {video.speaker.map(speaker => (speaker + ' '))}</p>
      </div>
    </div>
  )
}
