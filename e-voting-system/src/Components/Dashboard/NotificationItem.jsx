import React from "react";
import "./NotificationItem.css";

const NotificationItem = ({ message }) => {
  return (
    <div className="notification-item">
      <p>{message}</p>
    </div>
  );
};

export default NotificationItem;
