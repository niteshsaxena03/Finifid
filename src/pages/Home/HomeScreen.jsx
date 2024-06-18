import Header from "../../components/ui/Navbar/header.jsx";
import Sidebar from "../../components/ui/Navbar/sidebar.jsx";
import Feed from "../../components/ui/Feed/feed.jsx";
import RightBar from "../../components/ui/RightBar/rightBar.jsx";

function HomeScreen() {
  return (
    // Main Home
    <div className="main">
       <Header/>
       <div className="appBody">
              <Sidebar/>
              <Feed/>
              <RightBar/>
       </div>
    </div>

  ); 

}

export default HomeScreen;
