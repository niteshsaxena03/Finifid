import { useNavigate } from "react-router";
import "./header.css";

const HeaderOptions = ({ Icon, label, Avatar, navigation , data }) => {
  const navigate = useNavigate();
  return (
    <div className="icon" onClick={() => navigate(navigation)}>
      {Icon ? <Icon /> : <Avatar src={ data && data.ProfileDetails ?  data.ProfileDetails.profileImg : ""} />}
      <span>{label}</span>
    </div>
  );
};

export default HeaderOptions;
