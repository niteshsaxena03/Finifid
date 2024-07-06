import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import "./followButton.css";

// Follow Function !

import { doc, setDoc } from "firebase/firestore";
import { db } from "../../Firebase/firebaseContext.jsx";

// Redux Item
import { useDispatch } from "react-redux";
import {
  updateFollowAndFollowers,
  refreshPage,
} from "../../features/postCounter.js";

const FollowButton = ({ userData, otherUser, value }) => {
  const dispatch = useDispatch();

  //  const [ buttonValue , setButton ] = useState(value) ;

  async function handleFollow(userData, otherUser, context) {
    if (userData && otherUser) {
      //  Setting Up Data
      if (context == true) {
        userData.following = userData.following.filter(
          (following) => following != otherUser.email
        );
        otherUser.followers = otherUser.followers.filter(
          (follower) => follower != userData.email
        );
      } else {
        userData.following.push(otherUser.email);
        otherUser.followers.push(userData.email);
      }

      // Uploading Data
      try {
        const userDocRef = doc(db, "users", userData.email);
        await setDoc(userDocRef, userData);

        const otherDocRef = doc(db, "users", otherUser.email);
        await setDoc(otherDocRef, otherUser);

        // Dispatching Data :
        dispatch(
          updateFollowAndFollowers({
            followers: userData.followers.length,
            following: userData.following.length,
          })
        );
        dispatch(refreshPage());

        console.log("Final  Data After Follow -", userData, otherUser);
      } catch (error) {
        console.log("error while Uploading Data ! ", error);
      }
    }
  }

  return (
    <>
      {value == true ? (
        <Button
          onClick={() => handleFollow(userData, otherUser, value)}
          variant="outlined"
          className="unfollow"
        >
          <span>Unfollow</span>
        </Button>
      ) : (
        <Button
          onClick={() => handleFollow(userData, otherUser, value)}
          variant="outlined"
          className="follow"
        >
          <span>Follow</span>
        </Button>
      )}
    </>
  );
};

export default FollowButton;
