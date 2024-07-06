import { useEffect, useState } from "react";
import "../Navbar/sidebar.css";
import "./post.css";
import PostHeader from "./postHeader";
import PostFooter from "./postFooter";
import { v4 as uuidv4 } from "uuid";
import { useFirebase } from "../../Firebase/firebaseContext.jsx";

const Post = ({
  postId,
  name,
  subHeader,
  message,
  avatar,
  timestamp,
  postImage,
  postvideo,
  email,
  caption = "",
  likes,
  likedBy,
  userEmail, // Ensure userEmail is passed to the component
}) => {
  const [likeCount, setLikeCount] = useState(likes);
  const [isLiked, setIsLiked] = useState(false);
  const { getPostLikeStatus, toggleLikePost } = useFirebase();

  useEffect(() => {
    const checkLikeStatus = async () => {
      const status = await getPostLikeStatus(postId, userEmail);
      setIsLiked(status);
      setLikeCount(status ? likes + 1 : likes); // Adjust like count based on status
    };
    checkLikeStatus();
  }, [postId, userEmail, getPostLikeStatus, likes]);

  const handleLikeClick = async () => {
    await toggleLikePost(postId, userEmail);
    setIsLiked(!isLiked);
    setLikeCount((prevCount) => prevCount + (isLiked ? -1 : 1)); // Adjust like count on click
  };

  return (
    <div key={postId} className="posts">
      <PostHeader
        name={name}
        subHeader={subHeader}
        avatar={avatar}
        timestamp={timestamp}
        email={email}
      />
      <div className="postBody">
        {/* Message */}
        {message && (
          <>
            <div className="sepLine"></div>
            <div className="postBodyContent">{message}</div>
          </>
        )}

        {/* Image */}
        {postImage && (
          <div className="imagePost">
            <p className="caption">
              <i>{caption}</i>
            </p>
            <div className="sepLine"></div>
            <div className="imageContainer">
              <img src={postImage} className="postBodyContent" alt="Post" />
            </div>
          </div>
        )}

        {/* Video */}
        {postvideo && (
          <div className="videoPost">
            <p className="caption">
              <i>{caption}</i>
            </p>
            <div className="sepLine vidLine"></div>
            <video src={postvideo} controls></video>
          </div>
        )}
      </div>

      <PostFooter
        likes={likeCount}
        isLiked={isLiked}
        onLikeClick={handleLikeClick}
      />
    </div>
  );
};

export default Post;
