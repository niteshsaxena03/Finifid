import React from 'react'
import './icon.css' ;
import { icon } from '@fortawesome/fontawesome-svg-core';

const Icon = ({Icon,idx,Date,label}) => {
  let colorIcon = ["#70b5f9","#7fc15e","#e7a33e","#fc9295"] 
  return (
    <div className='singleIcon'>
        { ( idx == -1) ?  (Date == true) ? null : <Icon/> : <Icon style = {{color : colorIcon[idx] }}/> }
        <p id='date'>{label != "false" ? label : null }</p>
    </div>
  )
}

export default Icon