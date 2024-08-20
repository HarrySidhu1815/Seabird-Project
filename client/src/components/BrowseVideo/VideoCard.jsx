import React from 'react'
import classes from './VideoCard.module.css'


export default function VideoCard({video}) {
  return (
    <div className={classes['card-container']}>
      <img src={video.videoUrl}/>
      <div className={classes['card-decription']}>
        <h2>{video.title}</h2>
        <p><i>{video.topic}</i><br/>Features: {video.speakers.map(speaker => (speaker + ', '))}</p>
      </div>
    </div>
  )
}
