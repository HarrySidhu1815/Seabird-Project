import React, { useEffect, useRef, useState } from 'react'
import classes from './VideoCard.module.css'
import { useInView } from 'react-intersection-observer';
import ReactPlayer from 'react-player';

export default function VideoCard({video}) {
  // const { ref, inView } = useInView({
  //   triggerOnce: true,
  //   threshold: 0.5,  
  // });

  // const videoRef = useRef(null);
  // const canvasRef = useRef(null);
  // const [thumbnail, setThumbnail] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // useEffect(() => {
  //   const videoElement = videoRef.current;
  //   const canvasElement = canvasRef.current;
  //   const context = canvasElement.getContext('2d');

  //   videoElement.onloadeddata = () => {
  //     videoElement.currentTime = 2;
  //   };

  //   videoElement.onseeked = () => {
  //     context.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
  //     const thumbnailURL = canvasElement.toDataURL('image/png');
  //     setThumbnail(thumbnailURL);
  //   };
  // }, []);
 
  return (
    <div className={classes['card-container']}>
      {!isPlaying ? (
        <img
          src={'thumbnail'}
          alt={video.title}
          onClick={() => setIsPlaying(true)}
          className={classes.img}
        />
      ) : (
        <ReactPlayer
          className={classes.img}
          url={video.videoUrl}
          controls={true}
          height='60%'
          width='100%' 
        />
      )}
      <div className={classes['card-decription']}>
        <h2>{video.title}</h2>
        <p><i>{video.topic}</i><br/>Features: {video.speakers.join(', ')}</p>
      </div>
      {/* <video ref={videoRef} src={video.videoUrl} style={{ display: 'none' }} />
      <canvas ref={canvasRef} style={{ display: 'none' }} /> */}
    </div>
  )
}
