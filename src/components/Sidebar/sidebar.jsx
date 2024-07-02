  import "./sidebar.css";

  // Component's 
  import RightBarHead from "../RightBar/rightBarHead.jsx";
  import Trends from "./Trends";
  import { useEffect, useState } from "react";


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
          <div className="userHeader">
            <Avatar />
            <h4 className="userTitle userHomeProfileHeader">{data.userName || "Loading..."}</h4>
            <p className="userDescription userHomeProfileDes">
              {data.profession || "No profession listed"}
            </p>
          </div>
        </div>
        <div className="sepLine" />
        <div className="userInfo">
          <div className="userInfoContent sideFont">
            <p className="email">Email</p>
            <span>{data.email || "No email available"}</span>
          </div>
          <div className="userInfoContent sideFont">
            <p className="hobby">Hobby</p>
            <span>{data.hobby || "No hobby listed"}</span>
          </div>
        </div>
      </div>


      <div className="subProfile curveBorder">

        {/* Header */}

        <h4 id="headTrend">
        <RightBarHead newsHeader = {"Trending's"} idx = {-1} Date = {true}  label = {"Sunday , 30 June 2024"}/>
        </h4>


        {/* Trending's In India  */}
        { trends != null ?  <Trends Trends ={trends}/> : null   }

      </div>
    </div>
  );
}

export default Sidebar;
