import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router";

const PostHeader = ({ name, subHeader, timestamp, avatar, email }) => {
  const navigate = useNavigate();

  function handleClick(email) {
    navigate(`/profile/friend/${email}`);
  }

  return (
    <div className="postHeader">
      <div className="postHeaderLeft">
        {/* avatar */}

        <Avatar
          onClick={() => handleClick(email)}
          src={avatar}
          style={{ objectFit: "contain", height: "50px", width: "50px" }}
        />

        {/* Username and Info  */}

        <div className="username">
          <h4 className="userTitle">{name}</h4>
          <p className="userDescription">{subHeader}</p>
          <p className="timeStamp">{timestamp}</p>
        </div>
      </div>

      <div className="postHeaderRight ">
        <MoreVertIcon />
      </div>
    </div>
  );
};

export default PostHeader;
