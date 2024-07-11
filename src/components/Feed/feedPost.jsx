import React from "react";
import { useState } from "react";
import "./feed.css";

import { db } from "../../Firebase/firebaseContext.jsx";
import { serverTimestamp } from "../../Firebase/firebaseContext.jsx";
import { v4 as uuidv4 } from "uuid";

// Upload's
import { doc, setDoc, getDoc } from "firebase/firestore";

// Redux
import { useDispatch } from "react-redux";
import { incCount, refreshContent } from "../../features/postCounter.js";

const FeedPost = ({ data }) => {
  async function updatePostData() {
    const userDocRef = doc(db, "users", data.email);
    await setDoc(userDocRef, data);
    console.log("Succesfully Update Post Number ! ");

    const userDoc = await getDoc(userDocRef);
    dispatch(incCount(userDoc.data().ProfileDetails.post));
  }

  //   Hooks :
  let [input, setInput] = useState("");

  // DataBase Work  Temp :
  const dispatch = useDispatch();

  // Adding Post To Database
  const AddPost = async (event) => {
    event.preventDefault();
    try {
      // Generate a unique postId
      const postId = uuidv4();
      const userEmail = data.email; // Get the user's email
      const compositeKey = userEmail + postId;
      const postDocRef = doc(db, "userPosts", compositeKey);

      let postData = {
        postId: postId,
        name: data.name,
        subHeader: data.profession,
        message: input,
        photoURL: data.ProfileDetails.profileImg,
        timestamp: serverTimestamp(),
        email: userEmail,
        likes: 0,
        likedBy: [],
        comments: {},
        commentsCount: 0,
      };

      // Upload the post data
      await setDoc(postDocRef, postData);
      setInput("");

      // Post After Upload !
      dispatch(refreshContent());

      // Update user's post count
      data.ProfileDetails.post++;
      await updatePostData();
    } catch (error) {
      console.log("Error adding post:", error);
    }
  };

  return (
    <form onSubmit={AddPost}>
      <input
        type="text"
        placeholder="Start a post..."
        // for the value setting
        onChange={(event) => setInput(event.target.value)}
        // for getting value :
        value={input}
      />
      <button>Submit</button>
    </form>
  );
};

export default FeedPost;
