import { useEffect, useState } from "react";

// import css 
import "./sidebar.css";
// Component's 
import RightBarHead from "../RightBar/rightBarHead.jsx";
import Trends from "./Trends";
import { currentDate } from "../../pages/Profile/GoogleTendsAPI.js";


// DATA FROM API
import getTrendingSearches from "../../pages/Profile/GoogleTendsAPI.js";

// Icon's
import { Avatar } from "@mui/material";


function Sidebar({ data }) {
  const [trends, setTrends] = useState(null);

  
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


  return (
    <div id="sidebar">
      <div className="profile curveBorder">
        <div className="user">  
          <div className="backPhoto"></div>
          <div className="userHeader" id="sideProfileuserAvatar">
          {/* data.ProfileDetails.profileImg  */}
          <Avatar 
              src={ data && data.ProfileDetails ? data.ProfileDetails.profileImg : "Loading..."}/>
            <h4 className="userTitle userHomeProfileHeader">{ data && data.name || "Loading..."}</h4>
            <p className="userDescription userHomeProfileDes">
              {data && data.profession || "No profession listed"}
            </p>
          </div>
        </div>
        <div className="sepLine" />
        <div className="userInfo">
          <div className="userInfoContent sideFont">
            <p className="email">Email</p>
            <span>{data && data.email || "No email available"}</span>
          </div>
          <div className="userInfoContent sideFont">
            <p className="hobby">Hobby</p>
            <span>{data && data.hobby || "No hobby listed"}</span>
          </div>
        </div>
      </div>

      <div className="subProfile curveBorder">
        {/* Header */}

        <h4 id="headTrend">
        <RightBarHead newsHeader = {"Trending's"} idx = {-1} Date = {true}  label = {currentDate}/>
        </h4>

        {/* Trending's In India  */}
        {trends != null ? <Trends Trends={trends} /> : null}
      </div>
    </div>
  );
}

export default Sidebar;
