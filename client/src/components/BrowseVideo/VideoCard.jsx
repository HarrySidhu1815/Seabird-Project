import React, { useState } from 'react'
import classes from './VideoCard.module.css'
import { useInView } from 'react-intersection-observer';
import ReactPlayer from 'react-player';

export default function VideoCard({video}) {
  // const { ref, inView } = useInView({
  //   triggerOnce: true,
  //   threshold: 0.5,  
  // });

  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className={classes['card-container']}>
      {!isPlaying ? (
        <img
          src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
          alt={video.title}
          onClick={() => setIsPlaying(true)}
          className={classes.img}
        />
      ) : (
        <ReactPlayer
          className={classes.img}
          url={video.url}
          controls={true}
        />
      )}
      <div className={classes['card-decription']}>
        <h2>{video.title}</h2>
        <p><i>{video.topic}</i><br/>Features: {video.speakers.join(', ')}</p>
      </div>
    </div>
  )
}
