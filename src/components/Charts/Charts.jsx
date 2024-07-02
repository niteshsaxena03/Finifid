import React from 'react'
import Reach from './Reach.jsx'
import './Charts.css'

const Charts = ({name}) => {
  
  return (
    <div className="mainChartBox">

        {
          (name == "reach") ? <Reach/> : null  
        }

    </div>
  )
}

export default Charts