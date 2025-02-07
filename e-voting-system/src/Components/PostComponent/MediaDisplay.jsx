import React, { useState } from "react";
import "./post.css";

const BASE_MEDIA_URL = "http://localhost:8080/uploads/";

const MediaDisplay = ({ media = [] }) => {
  if (!media || media.length === 0) {
    return null;
  }

  return (
    <div className="media-display">
      {media.map((item, index) => {
        const mediaPath = typeof item === "string" ? item : item?.mediaUrl;

        // Determine if the media is from the backend or a local static asset
        const isLocalAsset = mediaPath && (mediaPath.startsWith("/") || mediaPath.startsWith("data:"));
        const mediaUrl = isLocalAsset ? mediaPath : `${BASE_MEDIA_URL}${mediaPath}`;

        const isImage =
          mediaPath.toLowerCase().endsWith(".jpg") ||
          mediaPath.toLowerCase().endsWith(".png") ||
          mediaPath.toLowerCase().endsWith(".jpeg");
        const isVideo = mediaPath.toLowerCase().endsWith(".mp4");

        const [isBroken, setIsBroken] = useState(false);

        return (
          <div key={index} className="media-item">
            {isImage ? (
              <img
                src={isBroken ? "/assets/default-placeholder.jpg" : mediaUrl} // Use default if broken
                alt={`media-${index}`}
                className="post-media"
                onError={() => setIsBroken(true)}
              />
            ) : isVideo ? (
              <video
                controls
                className="post-media"
                onError={() => setIsBroken(true)}
              >
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
