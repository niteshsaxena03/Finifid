import { useState } from "react";
import { useLocation } from "react-router-dom";
import "./Comments.css";

const Comments = ({ data }) => {
  const location = useLocation();
  const { postId, userEmail, collectionName, comments, commentsCount } =
    location.state || {};
  const [newComment, setNewComment] = useState("");

  const handleInputChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add logic to send `newComment` to the backend
    console.log("New Comment:", newComment);
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
    </div>
  );
};

export default Comments;
