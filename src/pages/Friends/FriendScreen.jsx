import  { useState } from "react";
import FollowerList from "./FollowerList";
import FollowingList from "./FollowingList";
import "./FriendScreen.css";
import Header from "../../components/Navbar/header"

function FriendScreen() {
  const [activeTab, setActiveTab] = useState("followers"); // 'followers' or 'following'

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <Header />
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
            {activeTab === "followers" && <FollowerList />}
            {activeTab === "following" && <FollowingList />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FriendScreen;
