import React from 'react'
import ICON from '../IconComponent/Icon.jsx'

const rightBarHead = ({Icon,newsHeader}) => {
  return (
    <>
      <div className="mainNewsHeader">
        <h4>{newsHeader}</h4>
        <ICON Icon = {Icon} label = {"false"} idx = {-1} />
    </div>

       <div className='sepLine'/>
    
    </>
  )
}

export default rightBarHead