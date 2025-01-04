// form to make notification and send by admin
import React from 'react';
import "./SendNotifications.css";

const SendNotifications = () => {
    return (
        <div className="send-notifications-page">
            <h2>Send Notifications</h2>
            <form className="notification-form">
                <div className="form-group">
                    <label htmlFor="notification-title">Notification Title</label>
                    <input 
                        type="text" 
                        id="notification-title" 
                        placeholder="Enter title" 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="notification-message">Message</label>
                    <textarea 
                        id="notification-message" 
                        placeholder="Write your message" 
                    ></textarea>
                </div>
                <button type="submit" className="submit-button">
                    Send Notification
                </button>
            </form>
        </div>
    );
};

export default SendNotifications;
