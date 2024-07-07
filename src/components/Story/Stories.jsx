import React, { useEffect, useState } from 'react';
import FriendStory from "./FriendStory";
import UserStory from "./UserStory";
import "./Stories.css";

// Slider 
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Database 
import { db } from '../../Firebase/firebaseContext';
import { doc, getDoc } from "firebase/firestore";

// Loader 
import CircularIndeterminate from '../Progress/progress';


const Stories = ({ data }) => {

  const [friendsStories, setFriendsStories] = useState([]);
  let [ followingSize , setSize ] = useState(1) ;
  const [visible, setVisible] = useState(false); // State for visibility
  const [headerClass, setHeaderClass] = useState("storyHeader"); // State for header class


  const settings = {
    dots: true,
    infinite: true,
    speed: 100,
    slidesToShow: followingSize <= 4 ? followingSize : 5  ,  
    slidesToScroll: 1,
  };

  {console.log( friendsStories  && friendsStories.following ? friendsStories.following.length : null)}
  useEffect(() => {
    const fetchFriendsStories = async () => {
      if (data && data.following) {
        const friendsDataPromises = data.following.map(async (email) => {
          const userDocRef = doc(db, "users", email);
          const newData = await getDoc(userDocRef);
          return newData.data();
        });

        const friendsData = await Promise.all(friendsDataPromises);
        setFriendsStories(friendsData);
        setSize(friendsData.length) ; 
      }
    };    

    fetchFriendsStories();
  }, [data]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHeaderClass("storyHeader styleHeader");
      setVisible(true);
    }, 2300); 

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, []);

  return (
    <div className="StoriesBox">
      <span className={headerClass}>
        <h2>Hello, {data && data.name}</h2>
      </span>

      {!visible && <span className='loader'><CircularIndeterminate/></span> } {/* Show loader if not visible */}

      {visible && (
        <Slider {...settings}>
          <UserStory data={data} />
          {friendsStories.map((friend, idx) => (
            <FriendStory
              key={idx}
              name={friend.name}
              url={friend.ProfileDetails.profileImg}
              storyStatus={friend.isStory}
              stories = {friend.story}
              email={friend.email}
            />
          ))}
        </Slider>
      )}
    </div>
  );
};

export default Stories;
