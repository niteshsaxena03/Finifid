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
}) => {
  const [likeCount, setLikeCount] = useState(likes);
  const { getPostLikeStatus, toggleLikePost } = useFirebase();

  useEffect(() => {
    const checkLikeStatus = async () => {
      const status = await getPostLikeStatus(postId, userEmail);
      setLikeCount(status ? likeCount + 1 : likeCount); // Adjust like count based on status
    };
    checkLikeStatus();
  }, [postId, userEmail, getPostLikeStatus, likeCount]);

  const handleLikeClick = async () => {
    await toggleLikePost(postId, userEmail);
    setLikeCount((prevCount) => prevCount + (likeCount ? -1 : 1));
  };

  return (
    <div key={uuidv4()} className="posts">
      <PostHeader
        name={name}
        subHeader={subHeader}
        avatar={avatar}
        timestamp={timestamp}
        email={email}
      />
      <div className="postBody">
        {/* 1 */}
        {message !== "" ? (
          <>
            <div className="sepLine"></div>
            <div className="postBodyContent">{message}</div>
          </>
        ) : null}

        {/* 2 */}
        {postImage !== undefined ? (
          <div className="imagePost">
            <p className="caption">
              <i>{caption !== "" ? caption : null}</i>
            </p>
            <div className="sepLine"></div>
            <div className="imageContainer">
              <img src={postImage} className="postBodyContent" alt="Post" />
            </div>
          </div>
        ) : null}

        {/* 3*/}
        {postvideo !== undefined ? (
          <div className="videoPost">
            <p className="caption">
              <i>{caption !== "" ? caption : null}</i>
            </p>
            <div className="sepLine vidLine"></div>
            <video src={postvideo} controls></video>
          </div>
        ) : null}
      </div>

      <PostFooter postId={postId} likes={likeCount} />
    </div>
  );
};

export default Post;
