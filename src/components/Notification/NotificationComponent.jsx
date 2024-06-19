import React from "react";
import "./NotificationComponent.css";

function NotificationComponent({ name, image }) {
  return (
    <div className="notification-container">
      <img
        src={image}
        alt={`${name}'s profile`}
        className="notification-image"
      />
      <div className="notification-text-container">
        <h1 className="notification-name">{name}</h1>
        <p className="notification-message">has reacted to your post.</p>
      </div>
    </div>
  );
}

export default NotificationComponent;
