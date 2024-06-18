import { useState } from "react";
import FollowerList from "./FollowerList";
import FollowingList from "./FollowingList";
import "./FriendScreen.css";
import Header from "../../components/Navbar/header";

function FriendScreen() {
  const [activeTab, setActiveTab] = useState("followers"); // 'followers' or 'following'

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
const followersData = [
  {
    name: "Alice Johnson",
    about: "Software engineer from San Francisco.",
    image:
      "https://images.pexels.com/photos/4542178/pexels-photo-4542178.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    name: "Bob Smith",
    about: "Graphic designer and coffee enthusiast.",
    image:
      "https://images.pexels.com/photos/6147118/pexels-photo-6147118.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    name: "Carla Gomez",
    about: "Digital marketer with a passion for travel.",
    image:
      "https://images.pexels.com/photos/5262292/pexels-photo-5262292.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
];

const followingData = [
  {
    name: "Daniel Brown",
    about: "Photographer and nature lover.",
    image:
      "https://images.pexels.com/photos/4890259/pexels-photo-4890259.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    name: "Eva White",
    about: "Fitness coach and healthy living advocate.",
    image:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    name: "Frank Martin",
    about: "Musician and songwriter.",
    image:
      "https://images.pexels.com/photos/7562313/pexels-photo-7562313.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
];


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
