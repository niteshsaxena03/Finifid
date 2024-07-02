import React from 'react'
import ShowTrending from './ShowTrending'
import {v4 as uuid} from 'uuid'

const Trends = ({Trends}) => {
  return (
    <>   
       {
        Trends.map((trend)=>(
            <ShowTrending key={uuid()} Trend = {trend} end ={true} />
        ))
       }
        
   </>
  )
}

export default Trends