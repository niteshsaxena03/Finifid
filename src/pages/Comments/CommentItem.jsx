import React from "react";
import "./CommentItem.css";

const CommentItem = ({ userName, commentText }) => {
  return (
    <div className="commentItem">
      <div className="commentUserName">{userName}</div>
      <div className="commentText">{commentText}</div>
    </div>
  );
};

export default CommentItem;
