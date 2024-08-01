import React from 'react'
import VideoCard from './VideoCard'

export default function BrowseVideo({videos}) {
  return (
    <div className="content">
        <h1>Browse Videos</h1>
      {videos.length > 0 ? (
        videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))
      ) : (
        <p>No videos found</p>
      )}
    </div>
  )
}
