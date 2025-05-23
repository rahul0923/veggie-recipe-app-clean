// src/shared/components/VideoTutorial.jsx
import React from 'react';

const VideoTutorial = ({ videoUrl }) => {
  // Extract video ID from YouTube URL
  const getYouTubeVideoId = (url) => {
    if (!url) return null;
    
    // Handle different YouTube URL formats
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    
    return (match && match[2].length === 11) ? match[2] : null;
  };
  
  const videoId = getYouTubeVideoId(videoUrl);
  
  if (!videoId) return null;
  
  return (
    <div className="video-tutorial">
      <h2>Video Tutorial</h2>
      <div className="video-container">
        <iframe
          width="100%"
          height="315"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className="video-links">
        <a 
          href={videoUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="youtube-link"
        >
          Watch on YouTube
        </a>
      </div>
    </div>
  );
};

export default VideoTutorial;