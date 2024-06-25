import { useEffect, useState } from "react";
import "./sidebar.css";
import { Avatar } from "@mui/material";
import { useFirebase } from "../../Firebase/firebaseContext";

const Sidebar = () => {
  try{
  const { user, getUserDetailsByEmail } = useFirebase();
  const [userName, setUserName] = useState("");
  const [userProfession, setUserProfession] = useState("");
  const [userHobby, setUserHobby] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    {console.log(user)}
    const fetchUserDetails = async () => {
      if (user) {
        const userDetails = await getUserDetailsByEmail(user.email);
        if (userDetails) {
          setUserName(userDetails.name || ""); // Ensure userName is a string
          setUserProfession(userDetails.profession || ""); // Ensure userProfession is a string
          setUserHobby(userDetails.hobby || ""); // Ensure userHobby is a string
          setUserEmail(userDetails.email || ""); // Ensure userEmail is a string
        }
      }
    };

    fetchUserDetails();
  }, [user, getUserDetailsByEmail]);
  }
  catch(err){
    console.log("error occur") ;
  }

  return (
    <div className="sidebar">
      <div className="profile curveBorder">
        <div className="user">
          <div className="backPhoto"></div>
          <div className="userHeader">
            <Avatar />
            <h4 className="userTitle">{userName || "Loading..."}</h4>
            <p className="userDescription">{userProfession || "No profession listed"}</p>
          </div>
        </div>
        <div className="sepLine" />
        <div className="userInfo">
          <div className="userInfoContent sideFont">
            <p className="email">Email</p>
            <span>{userEmail || "No email available"}</span>
          </div>
          <div className="userInfoContent sideFont">
            <p className="hobby">Hobby</p>
            <span>{userHobby || "No hobby listed"}</span>
          </div>
        </div>
      </div>
      <div className="subProfile curveBorder">
        <h4 className="headTrend">
          <i>Top Trends of 2024</i>
        </h4>
        <p className="trends">
          <span>#</span>React Js
        </p>
        <p className="trends">
          <span>#</span>React Native
        </p>
        <p className="trends">
          <span>#</span>Node.js
        </p>
        <p className="trends">
          <span>#</span>FireBase
        </p>
        <p className="trends">
          <span>#</span>Next JS
        </p>
        <p className="trends">
          <span>#</span>MongoDB
        </p>
        <p className="trends">
          <span>#</span>PostMan
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
