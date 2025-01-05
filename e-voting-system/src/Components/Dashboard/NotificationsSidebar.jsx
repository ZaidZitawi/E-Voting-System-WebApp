import React from "react";
import "./NotificationsSidebar.css";

const NotificationsSidebar = ({ onClose }) => {
  const notifications = [
    { id: 1, message: "Voting starts tomorrow at 9 AM!" },
    { id: 2, message: "New comment on your campaign post." },
    { id: 3, message: "Your post received 5 new likes!" },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>Notifications</h3>
        <button onClick={onClose} className="close-button">
          ✖
        </button>
      </div>
      <div className="sidebar-content">
        {notifications.map((notification) => (
          <div key={notification.id} className="notification-item">
            {notification.message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsSidebar;
