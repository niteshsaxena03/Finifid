import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useFirebase } from "@/Firebase/firebaseContext";
import CommentItem from "./CommentItem";
import "./Comments.css";
import { v4 as uuidv4 } from "uuid";

const Comments = ({ data }) => {
  const location = useLocation();
  const { addCommentToPost } = useFirebase();
  const {
    postId,
    userEmail,
    collectionName,
    comments = {},
    commentsCount,
  } = location.state || {};

  const { user, addNotification } = useFirebase();
  const currentUserEmail=user.email;
  const [newComment, setNewComment] = useState("");
  const [tempComment,setTempComment]=useState("");

  const handleInputChange = (event) => {
    setNewComment(event.target.value);
    setTempComment(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Add logic to send `newComment` to the backend
    await addCommentToPost(
      postId,
      userEmail,
      data.name,
      newComment,
      collectionName
    );
    addNotification(userEmail, currentUserEmail, "has commented on your post");
    setNewComment(""); // Clear input after submission
  };

  return (
    <div className="commentsContainer">
      <h1 className="commentsHeading">Comments</h1>
      <form onSubmit={handleSubmit} className="commentForm">
        <textarea
          value={newComment}
          onChange={handleInputChange}
          placeholder="Add a comment..."
          className="commentInput"
        />
        <button type="submit" className="submitButton">
          Submit
        </button>
      </form>
      <div className="commentList">
        <CommentItem
          key={uuidv4()}
          userName={data.name}
          commentText={tempComment}
        />
        {Object.keys(comments).map((key) => (
          <CommentItem
            key={key}
            userName={comments[key].userName}
            commentText={comments[key].commentText}
          />
        ))}
      </div>
    </div>
  );
};

export default Comments;
