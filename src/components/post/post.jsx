import { useEffect } from "react";
import "../Navbar/sidebar.css";
import "./post.css";
import PostHeader from "./postHeader";
import PostFooter from "./postFooter";

import { v4 as uuidv4 } from "uuid";

const Post = ({
  name,
  subHeader,
  message,
  avatar,
  timestamp,
  postImage,
  postvideo,
  email,
  caption = "",
}) => {
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
        {message != "" ? (
          <>
            <div className="sepLine"></div>
            <div className="postBodyContent">{message}</div>
          </>
        ) : null}

        {/* 2 */}
        {postImage != undefined ? (
          <div className="imagePost">
            <p className="caption">
              <i>{caption != "" ? caption : null}</i>
            </p>
            <div className="sepLine"></div>
            <div className="imageContainer">
              <img src={postImage} className="postBodyContent" alt="Post" />
            </div>
          </div>
        ) : // else
        null}

        {/* 3*/}
        {postvideo != undefined ? (
          <div className="videoPost">
            <p className="caption">
              <i>{caption != "" ? caption : null}</i>
            </p>
            <div className="sepLine vidLine"></div>
            <video src={postvideo} controls></video>
          </div>
        ) : // else
        null}
      </div>

      <PostFooter />
    </div>
  );
};

export default Post;
