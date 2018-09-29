import React from 'react';

const VideoPlayer = ({ video }) => {
  if (!video) {
    return <div>Loading video player...</div>;
  }
  const videoId = video.id.videoId;
  const url = `https://youtube.com/embed/${videoId}?autoplay=0&showinfo=0&controls=0`;
  console.log(this);

  return (
    <div className="videoWrapper" onclick="alert('Hello World')">
        <iframe id="playerId" onclick="alert('Hello World')" className="embed-responsive-item" frameBorder="0" allowFullScreen="allowFullScreen" src={url}></iframe>
        </div>
  )
}

export default VideoPlayer;



/*function onYouTubePlayerReady(playerId) {
  let player = document.getElementById("playerId");
  player.addEventListener("onStateChange", "callMeWhenStateChange");
}

function callMeWhenStateChange(state) {
  console.log(state);
  if(state == 1)
     console.log("Current state is playing : " + state);
}*/