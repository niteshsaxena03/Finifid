import Header from "../../components/Navbar/header.jsx";
import Sidebar from "../../components/Sidebar/sidebar.jsx";
import Feed from "../../components/Feed/feed.jsx";
import RightBar from "../../components/RightBar/rightBar.jsx";
import "./HomeScreen.css";
import { useNavigate } from "react-router";
import { useFirebase } from "@/Firebase/firebaseContext.jsx";
import { useEffect } from "react";

function HomeScreen({ data }) {
  const navigate = useNavigate();
  const firebase = useFirebase();
  const { isLoggedIn } = useFirebase();

  // Check if user is logged in or not.
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [firebase, navigate, isLoggedIn]);
  return (
    // Main Home
    <div className="main">
      <Header data={data} home={false}/>
      <div className="appBody">
        <Sidebar data={data} />
        <Feed data={data} />
        <RightBar data = {data} />
      </div>
    </div>
  );
}

export default HomeScreen;
