import React from 'react'
import '../RightBar/rightBar.css'
import { Link } from 'react-router-dom';

const ShowTrending = ({Trend , end = false }) => {
  return (
        <>
            <div className="recentsView">
                
                <div className="recentsActivity">
                
                    <div className="icon-container">
                    <img src={Trend.image} alt="Icon 1"/>
                    </div>
                  
                 


                <div className='innerRecentsText trendsTitle'>

                <Link to={Trend.newsLink}>
                
                     <h5 className='newsFont addFontStyleHeader'>{ Trend.title }</h5>

                     <p className='sideFont addFontStyleSubHeader'>{ Trend.source }</p>
                    
                </Link>
                
                </div>
                </div>
                    <p className='sideFont addFontStyleSubHeader reposts'>{ Trend.userTraffic}</p>
                </div>

                { end == true ?  <div className='sepLineNews'/> : null  }
        </>
  ); 
}

export default ShowTrending