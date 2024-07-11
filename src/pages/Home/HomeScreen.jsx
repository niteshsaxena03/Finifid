import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useFirebase } from "@/Firebase/firebaseContext.jsx";
import { useMediaQuery } from "react-responsive";
import Header from "../../components/Navbar/header.jsx";
import Sidebar from "../../components/Sidebar/sidebar.jsx";
import Feed from "../../components/Feed/feed.jsx";
import RightBar from "../../components/RightBar/rightBar.jsx";
import "./HomeScreen.css";

function HomeScreen({ data }) {
  const navigate = useNavigate();
  const firebase = useFirebase();
  const { isLoggedIn } = firebase; // Corrected here

  // Check if user is logged in or not.
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [firebase, navigate, isLoggedIn]);

  // Using useMediaQuery to detect mobile devices
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  return (
    // Main Home
    <div className="main">
      <Header data={data} home={false} />
      <div className="appBody">
        {!isMobile && <Sidebar className="Sidebar" data={data} />}
        <Feed className="Feed" data={data} />
        {!isMobile && <RightBar className="RightBar" data={data} />}
      </div>
    </div>
  );
}

export default HomeScreen;
