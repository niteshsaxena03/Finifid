import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useFirebase } from "@/Firebase/firebaseContext";
import "./Comments.css";

const Comments = ({ data }) => {
  const location = useLocation();
  const { addCommentToPost } = useFirebase();

  const { postId, userEmail, collectionName, comments, commentsCount } =
    location.state || {};
  const [newComment, setNewComment] = useState("");

  const handleInputChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Ensure there's a comment to submit
    if (newComment.trim()) {
      try {
        // Call the function to add the comment
        await addCommentToPost(
          postId,
          userEmail,
          data.name,
          newComment,
          collectionName
        );

        // Clear input after successful submission
        setNewComment("");
      } catch (error) {
        console.error("Error adding comment:", error.message);
      }
    }
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
