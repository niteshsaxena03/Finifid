import Header from "../../components/Navbar/header.jsx";
import Sidebar from "../../components/Navbar/sidebar.jsx";
import Feed from "../../components/Feed/feed.jsx";
import RightBar from "../../components/RightBar/rightBar.jsx";
import "./HomeScreen.css";

function HomeScreen() {
  return (
    // Main Home
    <div className="main">
      <Header />
      <div className="appBody">
        <Sidebar />
        <Feed />
        <RightBar />
      </div>
    </div>
  );
}

export default HomeScreen;
