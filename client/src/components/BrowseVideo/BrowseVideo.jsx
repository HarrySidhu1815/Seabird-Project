import React from 'react'
import VideoCard from './VideoCard'
import classes from './BrowseVideo.module.css'

export default function BrowseVideo({videos}) {
  return (
    <div className={classes['video-section']}>
        <h1>Browse Videos</h1>
        <div className={classes.content}>
        {videos.length > 0 ? (
        videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))
      ) : (
        <p>No videos found</p>
      )}
        </div>   
    </div>
  )
}
