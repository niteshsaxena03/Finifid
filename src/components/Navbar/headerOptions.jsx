import { useNavigate } from "react-router";
import "./header.css";

const HeaderOptions = ({ Icon, label, Avatar, navigation }) => {
  const navigate = useNavigate();
  return (
    <div className="icon" onClick={() => navigate(navigation)}>
      {Icon ? <Icon /> : <Avatar />}
      <span>{label}</span>
    </div>
  );
};

export default HeaderOptions;
