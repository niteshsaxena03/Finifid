import "../Navbar/sidebar.css";
import "./post.css";
import PostHeader from "./postHeader";
import PostFooter from "./postFooter";

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
  userEmail,
  collectionName,
  comments,
  commentsCount,
}) => {
  return (
    <div key={postId} className="posts">
      <PostHeader
        name={name}
        subHeader={subHeader}
        avatar={avatar}
        timestamp={timestamp}
        email={email}
        userEmail={userEmail}
        collectionName={collectionName}
        postId={postId}
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
              {caption}
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
              {caption}
            </p>
            <div className="sepLine vidLine"></div>
            <video src={postvideo} controls></video>
          </div>
        )}
      </div>

      <PostFooter
        postId={postId}
        likes={likes}
        likedBy={likedBy}
        userEmail={userEmail}
        collectionName={collectionName}
        commentsCount={commentsCount}
        comments={comments}
      />
    </div>
  );
};

export default Post;
