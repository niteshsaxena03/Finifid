import React from "react";
import "./FriendComponent.css";
import { useNavigate } from "react-router";


function FriendComponent({ name, about, image , email}) {
  // Provide a fallback image URL if 'image' prop is empty
  const fallbackImage = "https://via.placeholder.com/100"; // Replace with your placeholder image URL
  
  const navigate = useNavigate();

  function handleView(email){
    navigate(`/profile/friend/${email}`)
  }


  return (
    <div className="outerContainer">
      <div className="friendContainer">
        <div className="profilePicture">
          <img
            src={image || fallbackImage}
            className="profileImage"
            alt="Profile"
          />
        </div>
        <div className="details">
          <div className="personDetails">
            <h1>{name}</h1>
            <h2>
              <span>{about}</span>
            </h2>
          </div>
          <div className="buttonContainer">
            <button onClick={()=>handleView(email)} className="Button">View Profile</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FriendComponent;
