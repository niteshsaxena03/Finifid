import React from "react";
import { Link } from "react-router-dom"; // Import Link from React Router
import "./NotificationComponent.css";

function NotificationComponent({ name, image, postId }) {
  const handleClick = () => {
    // Replace with logic to navigate to the post page
    console.log(`Navigating to post ${postId}`);
    
  };

  return (
    <Link to={`/userPosts/${postId}`} className="notification-link">
      <div className="notification-container" onClick={handleClick}>
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
    </Link>
  );
}

export default NotificationComponent;
