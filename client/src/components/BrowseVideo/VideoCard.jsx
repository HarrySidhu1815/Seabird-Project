import React from 'react'
import classes from './VideoCard.module.css'

export default function VideoCard({video}) {
  return (
    <div className={classes}>
      <img />
      <div>
        <h2>{video.title}</h2>
        <i>{video.topic}</i>
        <p>Features: {video.speaker.map(speaker => (speaker + ' '))}</p>
      </div>
    </div>
  )
}
