import React from 'react'
import './icon.css' ;

const Icon = ({Icon,label,idx}) => {
  let colorIcon = ["#70b5f9","#7fc15e","#e7a33e","#fc9295"] 
  return (
    <div className='singleIcon'>
        { ( idx == -1) ?  <Icon/>   : <Icon style = {{color : colorIcon[idx] }}/> }
        <p>{label != "false" ? label : null }</p>
    </div>
  )
}

export default Icon