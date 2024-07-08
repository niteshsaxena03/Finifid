import { useState } from "react";
import FollowerList from "./FollowerList";
import FollowingList from "./FollowingList";
import "./FriendScreen.css";
import Header from "../../components/Navbar/header";
import { useNavigate } from "react-router";
import { useFirebase } from "@/Firebase/firebaseContext.jsx";
import { useEffect } from "react";

// Database
import { db } from "../../Firebase/firebaseContext";
import { doc, getDoc } from "firebase/firestore";

function FriendScreen({ data }) {
  const navigate = useNavigate();

  const firebase = useFirebase();
  const { isLoggedIn } = useFirebase();

  // Check if user is logged in or not.
  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     navigate("/");
  //   }
  // }, [firebase, navigate]);

  const [activeTab, setActiveTab] = useState("followers"); // 'followers' or 'following'
  const [followingData, setfollowingData] = useState([]);
  const [followersData, setfollowersData] = useState([]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const fetchFriendsData = async () => {
      // Following Work
      if (data && data.following) {
        const userFollowing = data.following.map(async (email) => {
          const userDocRef = doc(db, "users", email);
          const newData = await getDoc(userDocRef);
          let store = newData.data();
          return {
            name: store.name,
            image: store.ProfileDetails.profileImg,
            profession: store.profession,
            email: store.email,
          };
        });
        const dataFollowing = await Promise.all(userFollowing);
        console.log("user following : ", userFollowing);
        setfollowingData(dataFollowing);
      }

      // Following Work

      if (data && data.followers) {
        const userFollowers = data.followers.map(async (email) => {
          const userDocRef = doc(db, "users", email);
          const newData = await getDoc(userDocRef);
          let store = newData.data();
          return {
            name: store.name,
            image: store.ProfileDetails.profileImg,
            profession: store.profession,
            email: store.email,
          };
        });

        const dataFollowers = await Promise.all(userFollowers);
        setfollowersData(dataFollowers);
      }
    };

    fetchFriendsData();
  }, [data]);

  return (
    <div>
      <Header friends={false} />
      <div className="mainPage">
        <div className="heading">
          <h1>Friends</h1>
        </div>
        <div className="friend-screen">
          <div className="tabs">
            <button
              className={activeTab === "followers" ? "active" : ""}
              onClick={() => handleTabChange("followers")}
            >
              Followers
            </button>
            <button
              className={activeTab === "following" ? "active" : ""}
              onClick={() => handleTabChange("following")}
            >
              Following
            </button>
          </div>
          <div className="tab-content">
            {activeTab === "followers" && (
              <FollowerList followers={followersData} />
            )}
            {activeTab === "following" && (
              <FollowingList following={followingData} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FriendScreen;
