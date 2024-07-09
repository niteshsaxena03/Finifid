import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Avatar, IconButton, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useFirebase } from "@/Firebase/firebaseContext";

const formatEmail = (email) => {
  return email.replace(/[^a-zA-Z0-9]/g, "_");
};

const PostHeader = ({
  name,
  subHeader,
  timestamp,
  avatar,
  email,
  userEmail,
  postId,
  collectionName,
}) => {
  const navigate = useNavigate();
  const { user, deletePost } = useFirebase();
  const [anchorEl, setAnchorEl] = useState(null);
  const currentUserEmail = formatEmail(user.email);

  function handleClick(email) {
    navigate(`/profile/friend/${email}`);
  }

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDeletePost = async () => {
    await deletePost(userEmail, postId, collectionName);
    handleMenuClose();
    // Add any additional logic after deletion if needed
  };

  return (
    <div className="postHeader">
      <div className="postHeaderLeft">
        <Avatar
          onClick={() => handleClick(email)}
          src={avatar}
          style={{ objectFit: "contain", height: "50px", width: "50px" }}
        />

        <div className="username">
          <h4 className="userTitle">{name}</h4>
          <p className="userDescription">{subHeader}</p>
          <p className="timeStamp">{timestamp}</p>
        </div>
      </div>

      <div className="postHeaderRight">
        <IconButton onClick={handleMenuOpen}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          {/* Only show the delete option if the current user is the post owner */}
          {currentUserEmail === userEmail && (
            <MenuItem onClick={handleDeletePost}>Delete Post</MenuItem>
          )}
        </Menu>
      </div>
    </div>
  );
};

export default PostHeader;
