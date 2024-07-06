import Icon from "../IconComponent/Icon.jsx";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";
import SendIcon from "@mui/icons-material/Send";

const PostFooter = ({ likes, isLiked, onLikeClick }) => {
  // console.log("PostFooter props:", {
  //   likes,
  //   isLiked,
  //   onLikeClick,
  // });

  const handleLikeClick = async () => {
    console.log("PostFooter handleLikeClick called");
    await onLikeClick(); // Callback to update like state in the parent component
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
