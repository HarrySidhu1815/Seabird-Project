import React, { useState } from 'react'
import VideoCard from './VideoCard'
import classes from './BrowseVideo.module.css'
import { useSelector } from 'react-redux';

export default function BrowseVideo({videos}) {
  const {currentUser} = useSelector((state) => state.user)
  const [videosToShow, setVideosToShow] = useState(16)

  function handleLoadMore() {
    setVideosToShow((prevCount) => prevCount + 16); 
  }


  const videosToDisplay = videos.slice(0, videosToShow)

  return (
    <div className={classes['video-section']}>
        <h1>{currentUser ? 'Browse Videos' : 'Sample Videos'}</h1>
        <p className={classes.paragraph}>{currentUser ? 'Use the sidebar to sort the videos by theme, and/or the speaker(s) that appear in the video. ' : 'These videos have been selected to be shared publicly. To access the rest of the Elder interviews, please log in.'}</p>
        <div className={`${classes.content} ${currentUser ? '' : classes.loggedOut}`}>
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
