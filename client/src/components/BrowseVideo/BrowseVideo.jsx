import React, { useState } from 'react'
import VideoCard from './VideoCard'
import classes from './BrowseVideo.module.css'
import { useSelector } from 'react-redux';

export default function BrowseVideo({videos}) {
  const {currentUser} = useSelector((state) => state.user)
  const [currentPage, setCurrentPage] = useState(1)

  const videoPersPage = 16
  const indexOfLastVideo = currentPage * videoPersPage
  const indexOfFirstVideo = indexOfLastVideo - videoPersPage
  const currentVideos = videos.slice(indexOfFirstVideo, indexOfLastVideo)

  const totalPages = Math.ceil(videos.length/ videoPersPage)

  function handlePreviousPage(){
    if(currentPage > 1){
      setCurrentPage(prevPage => prevPage - 1 )
    }
  }

  function handleNextPage(){
    if(currentPage < totalPages){
      setCurrentPage(prevPage => prevPage + 1 )
    }
  }

  const maxVideosToShow = currentUser ? currentVideos.length : 4;

  return (
    <div className={classes['video-section']}>
        <h1>Browse Videos</h1>
        <div className={classes.content}>
        {currentVideos.length > 0 ? (
        currentVideos.slice(0, maxVideosToShow).map((video) => (
          <VideoCard key={video.id} video={video} />
        ))
      ) : (
        <p>No videos found</p>
      )}
        </div>
        <div className={classes['pagination-controls']}>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  )
}
