// src/components/NotificationDialog.jsx

import React from "react";
import "../PostComponent/Dialog.css";

const NotificationDialog = ({ notifications = [], onClose }) => {
  return (
    <div className="dialog-overlay">
      <div className="dialog-content">
        <button className="close-dialog-btn" onClick={onClose}>
          Close
        </button>
        <h3>Notifications</h3>
        <div className="dialog-list">
          {notifications.map((notification) => (
            <div key={notification.id} className="notification-card">
              {notification.userImage && (
                <img
                  src={notification.userImage}
                  alt="User"
                  className="notification-profile-pic"
                />
              )}
              <div className="notification-details">
                <p className="notification-message">{notification.message}</p>
                <p className="notification-time">{notification.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationDialog;
