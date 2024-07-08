import { useLocation } from "react-router-dom";

const Comments = ({data}) => {
  const location = useLocation();
  const { postId, userEmail } = location.state || {}; // Handle the case where state might be undefined

  return (
    <div>
      <h1>Comments for Post {postId}</h1>
      <h1>Post belongs to :{userEmail}</h1>
      <h1>Name of person writing comments:{data.name}</h1>
    </div>
  );
};

export default Comments;
