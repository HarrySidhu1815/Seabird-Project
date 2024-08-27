import React, { useState } from 'react'
import VideoCard from './VideoCard'
import classes from './BrowseVideo.module.css'
import { useSelector } from 'react-redux';

export default function BrowseVideo({videos}) {
  const {currentUser} = useSelector((state) => state.user)
  const [videosToShow, setVideosToShow] = useState(16)

  function handleLoadMore() {
    setVideosToShow((prevCount) => prevCount + 16); // Load 16 more videos
  }


  const videosToDisplay = currentUser
    ? videos.slice(0, videosToShow)
    : videos.slice(0, 4);

  return (
    <div className={classes['video-section']}>
        <h1>Browse Videos</h1>
        <div className={classes.content}>
        {videosToDisplay.length > 0 ? (
        videosToDisplay.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))
      ) : (
        <p>No videos found</p>
      )}
        {currentUser && videosToShow < videos.length && (
          <p className={classes["load-more-controls"]} onClick={handleLoadMore}>Load More</p>
      )}
        </div>
    </div>
  )
}
