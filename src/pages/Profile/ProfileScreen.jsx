import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";

// importing css
import "./ProfileScreen.css";
import "./rightProfileSection.css";
import "../../components/RightBar/rightBar.css";
import "./functionSelection.css";
import "../../components/Sidebar/sidebar.css";

// Importing Icon's
import EditIcon from "@mui/icons-material/Edit";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import QueryStatsIcon from "@mui/icons-material/QueryStats";

// Importing Component's
import Header from "../../components/Navbar/header.jsx";
import ProfileSection from "./ProfileSection";
import Feed from "../../components/Feed/feed.jsx";
import Trends from "../../components/Sidebar/Trends.jsx";
import RightBarHead from "../../components/RightBar/rightBarHead.jsx";
import RecentsView from "../../components/RightBar/recentsView.jsx";
import FunctionSection from "./functionSelection";
import { v4 as uuid } from "uuid";

// DATA FROM API
import getTrendingSearches from "./GoogleTendsAPI.js";
import { currentDate } from "./GoogleTendsAPI.js";

// Edit Profile
import { useNavigate } from "react-router";

function ProfileScreen({ data }) {
  const [trends, setTrends] = useState(null);

  // navigation
  const navigate = useNavigate();

  // For Followers and following  :
  const updatedFollowers = useSelector((State) => State.postCounter.followers);
  const updatedFollowing = useSelector((State) => State.postCounter.following);

  useEffect(() => {
    async function fetchTrends() {
      try {
        const trendsData = await getTrendingSearches();
        setTrends(trendsData);
      } catch (error) {
        console.error("Error fetching trends:", error);
      }
    }

    fetchTrends();
  }, []);

  // Media query for screen size
  const isSmallScreen = useMediaQuery({ query: "(max-width: 1000px)" });

  //  Random Data for Follower Function :
  let Emails = ["redux@gmail.com", "ryzen@gmail.com", "randomUser@gmail.com"];

  function handleEditProfile() {
    navigate("/editProfile");
  }

  return (
    <div className="profileScreen">
      {/* NavBar - Component */}
      <Header profile={false} />

      <div className={`mainScreenContent ${isSmallScreen ? "column" : ""}`}>
        <div className="mainProfileScreen">
          {/* Profile  */}
          <div className="profileSection">
            <ProfileSection
              data={data}
              updatedFollowers={updatedFollowers}
              updatedFollowing={updatedFollowing}
            />
          </div>

          {/* Right Side Content for small screens */}
          {isSmallScreen && (
            <div className="rightProfileSection column">
              {/* Functions */}
              <div className="functionSection recentSection curveBorder">
                <RightBarHead
                  Icon={QueryStatsIcon}
                  newsHeader={"Statistics"}
                  idx={-1}
                />
                <FunctionSection data={data} profile={true} />
              </div>

              {/* Following Suggestion */}
              <div className="recentSection curveBorder suggestFollow">
                {/* header */}
                <RightBarHead
                  Icon={TaskAltIcon}
                  newsHeader={"You might like"}
                  idx={-1}
                />
                {/* Activity's */}
                <RecentsView userData={data} />
              </div>
            </div>
          )}

          {/* Post Part */}
          <div className="mainUserFeed">
            <div className="postTag">
              <h2>All Posts</h2>

              {/* Edit Button */}
              <div className="editProfile">
                  <button type="button" style={{backgroundColor : "white"}}>
                    <EditIcon style={{ color: "#8e0b3a" }} />
                    <a
                      onClick={() => handleEditProfile()}
                      style={{ color: "#8e0b3a", cursor: "pointer" }}
                    >
                      Edit Profile
                    </a>
                  </button>
              </div>
            </div>

            {/* All user Post's */}
            <div className="userFeed profileFeed">
              <Feed key={uuid()} data={data} profile={true} />
            </div>
          </div>
        </div>

        {/* Right Side Content for larger screens */}
        {!isSmallScreen && (
          <div className="rightProfileSection">
            {/* Functions */}
            <div className="functionSection recentSection curveBorder">
              <RightBarHead
                Icon={QueryStatsIcon}
                newsHeader={"Statistics"}
                idx={-1}
              />
              <FunctionSection data={data} profile={true} />
            </div>

            {/* Following Suggestion */}
            <div className="recentSection curveBorder suggestFollow">
              {/* header */}
              <RightBarHead
                Icon={TaskAltIcon}
                newsHeader={"You might like"}
                idx={-1}
              />
              {/* Activity's */}
              <RecentsView userData={data} />
            </div>

            {/* Social One Trending ! */}
            <div className="socialTrending">
              <div className="subProfile curveBorder">
                {/* Header */}
                <h4 id="headTrend">
                  <RightBarHead
                    newsHeader={"Trending's"}
                    idx={-1}
                    Date={true}
                    label={currentDate}
                  />
                </h4>
                {/* Trending's In India */}
                {trends != null ? <Trends Trends={trends} /> : null}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileScreen;
