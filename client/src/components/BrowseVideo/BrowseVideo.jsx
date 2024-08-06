import React from 'react'
import VideoCard from './VideoCard'
import classes from './BrowseVideo.module.css'
import { useSelector } from 'react-redux';

export default function BrowseVideo({videos}) {
  const {currentUser} = useSelector((state) => state.user)

  const maxVideosToShow = currentUser ? videos.length : 4;

  return (
    <div className={classes['video-section']}>
        <h1>Browse Videos</h1>
        <div className={classes.content}>
        {videos.length > 0 ? (
        videos.slice(0, maxVideosToShow).map((video) => (
          <VideoCard key={video.id} video={video} />
        ))
      ) : (
        <p>No videos found</p>
      )}
        </div>
    </div>
  )
}
