import { useState, useEffect } from "react";

// importing css 
import './ProfileScreen.css' ;
import './rightProfileSection.css' ; 
import '../../components/RightBar/rightBar.css' ;
import './functionSelection.css' ;
import "../../components/Sidebar/sidebar.css";



// Importing Icon's
import EditIcon from '@mui/icons-material/Edit';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import QueryStatsIcon from '@mui/icons-material/QueryStats';

// Importing Component's 
import Header from "../../components/Navbar/header.jsx";
import ProfileSection from "./ProfileSection";
import Feed from "../../components/Feed/feed.jsx";
import Trends from "../../components/Sidebar/Trends.jsx";
import RightBarHead from '../../components/RightBar/rightBarHead.jsx';
import RecentsView from '../../components/RightBar/recentsView.jsx';
import FunctionSection from "./functionSelection";

// DATA FROM API
import getTrendingSearches from "./GoogleTendsAPI.js";

function FriendsProfile({data}) {


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
     <div className="profileScreen">

        {/* NavBar - Component */}
        <Header profile = {false}/>


      <div className="mainScreenContent">

          
        <div className="mainProfileScreen">

          {/* Profile  */}
          <div className="profileSection">
                <ProfileSection friends = {true}/>
          </div>

          {/* Post Part */}

          <div className="mainUserFeed">
            
              <div className="postTag friendPostTag">

                  <h2>All Posts</h2>

              </div>

              {/* All user Post's */}
              <div className="userFeed">
                  <Feed data={data.email} profile={true} friends = {true} />
              </div>

          </div>

        </div>


        {/* Right Side Content  */}
        <div className="rightProfileSection">
            
        {/* Functions  */}
       <div className="functionSection recentSection curveBorder">
         <RightBarHead Icon = {QueryStatsIcon} newsHeader = {"Statistics"} idx = {-1}/>

          <FunctionSection/>  

       </div>


          
        {/* Following Suggestion */}

        <div className="recentSection curveBorder suggestFollow">
        
        {/* header  */}
        <RightBarHead Icon = {TaskAltIcon} newsHeader = {"You might like"} idx = {-1}/>

        {/* Activity's */}
        {/* <RecentsView/> */}
        <RecentsView profile={true}/>
        <RecentsView profile={true}   />
        <RecentsView profile={true} end = {true}/>


        
        </div>


            {/* Social One Trending ! */}
            <div className="socialTrending">

             <div className="subProfile curveBorder">

                {/* Header */}

                <h4 id="headTrend">
                <RightBarHead newsHeader = {"Trending's"} idx = {-1} Date = {true}  label = {"Sunday , 30 June 2024"}/>
                </h4>


                {/* Trending's In India  */}
                { trends != null ?  <Trends Trends ={trends}/> : null   }

              </div>

            </div>

            

        </div>


      </div>
     


    </div>
  );
}

export default FriendsProfile;
