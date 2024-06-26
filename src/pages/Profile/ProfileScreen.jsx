import React, { useState, useEffect } from "react";
import Header from "@/components/Navbar/header";
import { useFirebase } from "@/Firebase/firebaseContext";
import "./ProfileScreen.css";

function ProfileScreen() {
  const { user, getUserDetailsByEmail } = useFirebase();
  const [userName, setUserName] = useState("");
  const [userProfession, setUserProfession] = useState("");
  const [userHobby, setUserHobby] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (user) {
        try {
          const userDetails = await getUserDetailsByEmail(user.email);
          console.log(userDetails);
          if (userDetails) {
            const { name, profession, hobby, email } = userDetails;
            setUserName(name);
            setUserProfession(profession);
            setUserHobby(hobby);
            setUserEmail(email);
          }
        } catch (err) {
          console.error(err);
          setError("Failed to fetch user details");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserDetails();
  }, [user, getUserDetailsByEmail]);

  if (loading) {
    return (
      <div>
        <Header />
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Header />
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="user-details-container">
        <div className="user-details">
          <h1>Name: {userName}</h1>
          <h1>Profession: {userProfession}</h1>
          <h1>Hobby: {userHobby}</h1>
          <h1>Email: {userEmail}</h1>
        </div>
      </div>
    </div>
  );
}

export default ProfileScreen;
