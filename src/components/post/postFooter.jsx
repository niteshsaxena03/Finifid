import Icon from "../IconComponent/Icon.jsx";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";
import SendIcon from "@mui/icons-material/Send";
import { useState, useEffect } from "react";
import { useFirebase } from "../../Firebase/firebaseContext.jsx";

const PostFooter = ({ postId, likes = 0, likedBy = [], userEmail }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const { toggleLikePost } = useFirebase();

  useEffect(() => {
    // Check if the user has liked the post
    setIsLiked(likedBy.includes(userEmail));
  }, [likedBy, userEmail]);

  const handleLikeClick = async () => {
    console.log("PostFooter handleLikeClick called"); // Ensure this logs to the console
    try {
      // Toggle like and update Firestore
      await toggleLikePost(postId, userEmail);

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

  return (
    <div className="postFooter">
      <button onClick={handleLikeClick}>
        <Icon
          Icon={isLiked ? ThumbUpIcon : ThumbUpOffAltIcon}
          label={`Likes ${likeCount}`}
          idx={-1}
        />
      </button>
      <Icon Icon={ChatBubbleOutlineIcon} label={"Comment"} idx={-1} />
      <Icon Icon={ShareIcon} label={"Share"} idx={-1} />
      <Icon Icon={SendIcon} label={"Send"} idx={-1} />
    </div>
  );
};

export default PostFooter;
