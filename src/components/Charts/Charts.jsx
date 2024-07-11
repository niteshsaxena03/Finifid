import React from 'react'
import Reach from './Reach.jsx'
import './Charts.css'

const Charts = ({name,data}) => {
  
  return (
    <div className="mainChartBox">

        {
          (name == "reach") ? <Reach userData = {data}/> : null  
        }

    </div>
  )
}

export default Charts