import { useLocation } from "react-router-dom";

const Comments = ({data}) => {
  const location = useLocation();
  const { postId, userEmail,collectionName,comments,commentsCount } = location.state || {}; 
  console.log(collectionName);

  return (
    <div>
      <h1>Comments for Post {postId}</h1>
      <h1>Post belongs to :{userEmail}</h1>
      <h1>Name of person writing comments:{data.name}</h1>
      <h1>Collection is :{collectionName}</h1>
      <h1>Current number of comments :{commentsCount}</h1>
      {/* <h1>Comments are :{comments}</h1> */}
    </div>
  );
};

export default Comments;
