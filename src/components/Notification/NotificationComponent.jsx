import { Link } from "react-router-dom"; // Import Link from React Router
import "./NotificationComponent.css";

function NotificationComponent({ email, action }) {
  return (
    <div className="notification-container">
      <img
        src={image}
        className="notification-image"
      />
      <div className="notification-text-container">
        <h1 className="notification-name">{email}</h1>
        <p className="notification-message">has {action}ed on your post.</p>
      </div>
    </div>
  );
}

export default NotificationComponent;
