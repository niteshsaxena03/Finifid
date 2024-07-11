import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";

// importing css
import "./ProfileScreen.css";
import "./rightProfileSection.css";
import "../../components/RightBar/rightBar.css";
import "./functionSelection.css";
import "../../components/Sidebar/sidebar.css";

// Importing DB
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../Firebase/firebaseContext.jsx";

// Importing Icon's
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import QueryStatsIcon from "@mui/icons-material/QueryStats";

// Importing Component's
import Header from "../../components/Navbar/header.jsx";
import ProfileSection from "./ProfileSection";
import Feed from "../../components/Feed/feed.jsx";
import RightBarHead from "../../components/RightBar/rightBarHead.jsx";
import RecentsView from "../../components/RightBar/recentsView.jsx";
import FunctionSection from "./functionSelection";

// DATA FROM API
import getTrendingSearches from "./GoogleTendsAPI.js";
import { currentDate } from "./GoogleTendsAPI.js";
import { useParams } from "react-router";

function FriendsProfile({ currentUserData }) {
  const [trends, setTrends] = useState(null);
  const [data, setData] = useState({});

  let refresh = useSelector((State) => State.postCounter.refresh);

  const { email } = useParams();
  console.log(email);

  // Fetching User Data
  useEffect(() => {
    async function getFriendDetails() {
      try {
        const userDocRef = doc(db, "users", email);
        const userDoc = await getDoc(userDocRef);
        console.log("Friend Data", userDoc.data());

        if (userDoc.exists()) {
          console.log("Friend Data", userDoc.data());
          setData(userDoc.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    getFriendDetails();
  }, [email, refresh]);

  // For Trends
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

  return (
    <div className="profileScreen">
      {/* NavBar - Component */}
      <Header profile={false} />

      <div className={`mainScreenContent ${isSmallScreen ? "column" : ""}`}>
        <div className="mainProfileScreen">
          {/* Profile  */}
          <div className="profileSection">
            {
              <ProfileSection
                userData={currentUserData}
                data={data}
                friends={true}
                updatedFollowers={
                  data && data.followers ? data.followers.length : 0
                }
                updatedFollowing={
                  data && data.following ? data.following.length : 0
                }
              />
            }
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
                <RecentsView userData={currentUserData} />
              </div>
            </div>
          )}

          {/* Post Part */}
          <div className="mainUserFeed">
            <div className="postTag friendPostTag">
              <h2>All Posts</h2>
            </div>

            {/* All user Post's */}
            <div className="userFeed profileFeed">
              <Feed data={data} profile={true} friends={true} />
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
              <RecentsView userData={currentUserData} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FriendsProfile;
