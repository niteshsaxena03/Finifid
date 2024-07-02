import React from 'react'
import './rightBar.css' ;
import NewsApi from './newsApi';
import RightBarHead from './rightBarHead.jsx';
import RecentsView from './recentsView.jsx';

// icon 
import ScheduleIcon from '@mui/icons-material/Schedule';
import NewspaperIcon from '@mui/icons-material/Newspaper';


const rightBar = () => {
  return (
    <div className='rightBar '>


        {/* News Section  */}  

        <div className="news curveBorder newsSection">

        {/* header  */}
        <RightBarHead Icon = {NewspaperIcon} newsHeader = {"Stay up to date"} idx = {-1}/>
      
        {/* news Listing  */}

        <div className="mainNewsBox">

                <NewsApi end = {true}/>
                
        </div>

        </div>





        {/* Recents message's  */}

        <div className="recentSection curveBorder">
        
        {/* header  */}
        <RightBarHead Icon = {ScheduleIcon} newsHeader = {"Recent's"} idx = {-1}/>

        {/* Activity's */}
        {/* <RecentsView/> */}
        <RecentsView/>
        <RecentsView/>
        <RecentsView/>
        <RecentsView/>
        <RecentsView end = {true}/>


        
        </div>


    </div>
  )
}

export default rightBar