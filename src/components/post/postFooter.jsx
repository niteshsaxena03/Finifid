import Icon from "../IconComponent/Icon.jsx";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";
import SendIcon from "@mui/icons-material/Send";
import { useState, useEffect } from "react";
import { useFirebase } from "../../Firebase/firebaseContext.jsx";

const PostFooter = ({ postId, likes = 0, likedBy, userEmail }) => {
  const [isLiked, setIsLiked] = useState(false);
  const { toggleLikePost } = useFirebase();

  useEffect(() => {
    // Check if the user has liked the post
    if (likedBy != null) {
      setIsLiked(likedBy.includes(userEmail));
    }
  }, [likedBy, userEmail]);

  const handleLikeClick = async () => {
    console.log("PostFooter handleLikeClick called");
    await toggleLikePost(postId, userEmail);
    // Update the like status locally after toggling
    setIsLiked(!isLiked);
  };

  return (
    <div className="postFooter">
      <Icon
        Icon={isLiked ? ThumbUpIcon : ThumbUpOffAltIcon}
        label={`Likes ${likes}`}
        idx={-1}
        onClick={handleLikeClick}
      />
      <Icon Icon={ChatBubbleOutlineIcon} label={"Comment"} idx={-1} />
      <Icon Icon={ShareIcon} label={"Share"} idx={-1} />
      <Icon Icon={SendIcon} label={"Send"} idx={-1} />
    </div>
  );
};

export default PostFooter;
