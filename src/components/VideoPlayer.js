import React from 'react';

const VideoPlayer = ({ video }) => {
  if (!video) {
    return <div>Loading video player...</div>;
  }
  const videoId = video.id.videoId;
  const url = `https://youtube.com/embed/${videoId}`;

  return (
    <div className="videoWrapper">
        <iframe className="embed-responsive-item" frameBorder="0" allowFullScreen="allowFullScreen" src={url}></iframe>
        </div>
  )
}

export default VideoPlayer;
