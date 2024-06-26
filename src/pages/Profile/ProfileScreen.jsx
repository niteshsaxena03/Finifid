import { useState, useEffect } from "react";
import Header from "@/components/Navbar/header";
import { useFirebase } from "@/Firebase/firebaseContext";
import "./ProfileScreen.css";

function ProfileScreen() {
  const { user, getUserDetailsByEmail } = useFirebase();
  const [userName, setUserName] = useState("");
  const [userProfession, setUserProfession] = useState("");
  const [userHobby, setUserHobby] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [age,setAge]=useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (user) {
        const userDetails = await getUserDetailsByEmail(user.email);
        console.log(userDetails);
        if (userDetails) {
          setUserName(userDetails.name);
          setUserProfession(userDetails.profession);
          setUserHobby(userDetails.hobby);
          setUserEmail(userDetails.email);
          setAge(userDetails.age)
        }
      }
    };

    fetchUserDetails();
  }, [user, getUserDetailsByEmail]);

  return (
    <div>
      <Header />
      <div className="container">
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-image"></div>
          </div>
          <div className="profile-username">
            <h2>{userName}</h2>
          </div>
          <div className="profile-details">
            <div className="profile-detail">
              <h2>Email</h2>
              <p>{userEmail}</p>
            </div>
            <div className="profile-detail">
              <h2>Profession</h2>
              <p>{userProfession}</p>
            </div>
            <div className="profile-detail">
              <h2>Hobby</h2>
              <p>{userHobby}</p>
            </div>
            <div className="profile-detail">
              <h2>Age</h2>
              <p>{age}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileScreen;
