// css
import { useNavigate } from "react-router";
import "./header.css";

const headerOptions = ({ Icon, label, Avatar, navigation }) => {
  const navigate = useNavigate();
  return (
    <div className="icon" onClick={() => navigate(navigation)}>
      {Icon != undefined ? <Icon /> : <Avatar />}
      <span>{label}</span>
    </div>
  );
};

export default headerOptions;
