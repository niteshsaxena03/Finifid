  import React, { useEffect } from 'react'
  import './rightBar.css' ;
  import NewsApi from './newsApi';
  import RightBarHead from './rightBarHead.jsx';
  import RecentsView from './recentsView.jsx';

  // icon 
  import NewspaperIcon from '@mui/icons-material/Newspaper';
  import TaskAltIcon from '@mui/icons-material/TaskAlt';


  
// Redux - Refresh
import { useSelector } from 'react-redux';


  const rightBar = ({data}) => {


    let refresh = useSelector((State)=> State.postCounter.refresh) ;

    useEffect(()=>{

    },[refresh])

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
          <RightBarHead Icon = {TaskAltIcon} newsHeader = {"You might like"} idx = {-1}/>

          {/* Activity's */}
              <RecentsView userData={data} />
          </div>


      </div>
    )
  }

  export default rightBar