import { useEffect, useState } from "react";
import { useFirebase } from "@/Firebase/firebaseContext.jsx"; // Adjust the import path if necessary
import "./NotificationComponent.css";

function NotificationComponent({ email, action }) {
  const [userDetails, setUserDetails] = useState(null);
  const { getUserDetailsByEmail } = useFirebase(); // Get the function from Firebase context

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (email) {
        const details = await getUserDetailsByEmail(email);
        setUserDetails(details);
      }
    };

    fetchUserDetails();
  }, [email, getUserDetailsByEmail]);

  if (!userDetails) return null; // Return nothing if user details are not available

  return (
    <div className="notification-container">
      <img
        src={userDetails.ProfileDetails.profileImg} // Use profileImg from userDetails
        alt={`${userDetails.name}'s profile`}
        className="notification-image"
      />
      <div className="notification-text-container">
        <h1 className="notification-name">{userDetails.name}</h1>{" "}
        {/* Display user name */}
        <p className="notification-message">{action}</p>
      </div>
    </div>
  );
}

export default NotificationComponent;
