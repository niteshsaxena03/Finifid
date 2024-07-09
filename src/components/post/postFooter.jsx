import Icon from "../IconComponent/Icon.jsx";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";
import SendIcon from "@mui/icons-material/Send";
import { useState, useEffect } from "react";
import { useFirebase } from "../../Firebase/firebaseContext.jsx";
import { useNavigate } from "react-router-dom";

const formatEmail = (email) => {
  return email.replace(/[^a-zA-Z0-9]/g, "_");
};

const PostFooter = ({ postId, likes = 0, likedBy = [], userEmail,collectionName,comments={},commentsCount=0 }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
   const [commentCount, setCommentCount] = useState(commentsCount);
  const { toggleLikePost,user,addNotification } = useFirebase();
  const navigate = useNavigate();
  
  const currentUserEmail=formatEmail(user.email);
  //console.log(collectionName);
  
  useEffect(() => {
    // Check if the user has liked the post
    setIsLiked(likedBy.includes(currentUserEmail));
  }, [likedBy, userEmail]);

  const handleLikeClick = async () => {
    console.log("PostFooter handleLikeClick called"); // Ensure this logs to the console
    try {
      // Toggle like and update Firestore
      await toggleLikePost(postId, userEmail,currentUserEmail,collectionName);

      await addNotification(userEmail,currentUserEmail, "like");

      // Update the like status locally after toggling
      setIsLiked((prevIsLiked) => {
        // Update like count based on previous state
        setLikeCount((prevCount) =>
          prevIsLiked ? prevCount - 1 : prevCount + 1
        );
        return !prevIsLiked;
      });
    } catch (error) {
      console.error("Error toggling like:", error.message);
    }
  };

   const handleCommentClick = () => {
     navigate("/comments", { state: { postId, userEmail, collectionName,comments,commentsCount } });
     addNotification(userEmail,currentUserEmail, "comment");
   };

  return (
    <div className="postFooter">
      <button onClick={handleLikeClick} className="iconButton">
        <Icon
          Icon={isLiked ? ThumbUpIcon : ThumbUpOffAltIcon}
          label={`Likes ${likeCount}`}
          idx={-1}
        />
      </button>
      <button onClick={handleCommentClick} className="iconButton">
        <Icon Icon={ChatBubbleOutlineIcon} label={`Comments`} idx={-1} />
        <span className="commentCount">{commentCount}</span>
      </button>
      <button className="iconButton">
        <Icon Icon={ShareIcon} label={"Share"} idx={-1} />
      </button>
      <button className="iconButton">
        <Icon Icon={SendIcon} label={"Send"} idx={-1} />
      </button>
    </div>
  );
};

export default PostFooter;
