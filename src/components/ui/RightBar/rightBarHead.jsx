import React from 'react'
import Icon from '../IconComponent/Icon.jsx'

const rightBarHead = ({Icon,newsHeader}) => {
  return (
    <>
      <div className="mainNewsHeader">
        <h4>{newsHeader}</h4>
        <Icon Icon = {Icon} label = {false} idx = {-1} />
    </div>

       <div className='sepLine'/>
    
    </>
  )
}

export default rightBarHead