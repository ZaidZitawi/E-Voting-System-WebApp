import React from "react";
import "./post.css";

const MediaDisplay = ({ media = [] }) => {
  if (media.length === 0) {
    return null;
  }

  return (
    <div className="media-display">
      {media.map((item, index) => {
        const mediaUrl = item?.mediaUrl?.toLowerCase() || "";
        const isImage =
          mediaUrl.endsWith(".jpg") || mediaUrl.endsWith(".png") || mediaUrl.endsWith(".jpeg");
        const isVideo = mediaUrl.endsWith(".mp4");

        return (
          <div key={index} className="media-item">
            {isImage ? (
              <img
                src={mediaUrl}
                alt={`media-${index}`}
                className="post-media"
              />
            ) : isVideo ? (
              <video controls className="post-media">
                <source src={mediaUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <p>Unsupported media type</p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MediaDisplay;
