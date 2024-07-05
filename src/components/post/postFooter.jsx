import { useState, useEffect } from "react";
import Icon from "../IconComponent/Icon.jsx";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";
import SendIcon from "@mui/icons-material/Send";
import { useFirebase } from "../../Firebase/firebaseContext.jsx";

const PostFooter = ({ postId, userEmail, likes }) => {
  const [isLiked, setIsLiked] = useState(false);
  const { getPostLikeStatus, toggleLikePost } = useFirebase();

  useEffect(() => {
    const checkLikeStatus = async () => {
      const status = await getPostLikeStatus(postId, userEmail);
      setIsLiked(status);
    };
    checkLikeStatus();
  }, [postId, userEmail, getPostLikeStatus]);

  const handleLikeClick = async () => {
    await toggleLikePost(postId, userEmail);
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
