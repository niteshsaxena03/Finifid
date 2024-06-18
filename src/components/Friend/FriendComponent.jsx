import React from "react";
import "./FriendComponent.css";

function FriendComponent({ name, about, image }) {
  // Provide a fallback image URL if 'image' prop is empty
  const fallbackImage = "https://via.placeholder.com/100"; // Replace with your placeholder image URL

  return (
    <div className="outerContainer">
      <div className="friendContainer">
        <img
          src={image || fallbackImage}
          className="profileImage"
          alt="Profile"
        />
        <div className="details">
          <div className="person">
            <h1>{name}</h1>
            <h2>{about}</h2>
          </div>
          <button className="Button">View Profile</button>
        </div>
      </div>
    </div>
  );
}

export default FriendComponent;
