import { useState, useEffect } from "react";

import FriendStory from "./FriendStory";
import UserStory from "./UserStory";
import { useFirebase } from "@/Firebase/firebaseContext";

import "./Stories.css";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { v4 as uuidv4 } from "uuid";

const Stories = ({ UserData, FriendsData , data }) => {
  const { user, getUserDetailsByEmail } = useFirebase();
  const [userName, setUserName] = useState("");
  const settings = {
    dots: true,
    infinite: true,
    speed: 100,
    slidesToShow: 5,
    slidesToScroll: 2,
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (user) {
        const userDetails = await getUserDetailsByEmail(user.email);
        if (userDetails) {
          setUserName(userDetails.name);
        }
      }
    };

    fetchUserDetails();
  }, [user, getUserDetailsByEmail]);

  return (
    <div className="StoriesBox">
      {/* Heading  */}

      <span className="storyHeader">
        <h2>Hello,{data.userName}</h2>
      </span>

      <Slider {...settings}>
        {/* User Story  */}
        <UserStory UserData={UserData} />

        {/* Friend Story  */}
        {FriendsData.map((data) => (
          <FriendStory
            name={data.name}
            url={data.url}
            storyStatus={data.isStory}
            key={uuidv4()}
          />
        ))}
      </Slider>
    </div>
  );
};

export default Stories;
