
import ICON from '../IconComponent/Icon.jsx'

const   rightBarHead = ({Icon,newsHeader,label,Date = false }) => {
  return (
    <>
      <div className="mainNewsHeader">
        <h4>{newsHeader}</h4>
        { (Date == true ) ? 
           <ICON Icon = {Icon} label = {label} idx = {-1} Date = {Date}/>
            :
           <ICON Icon = {Icon} label = {"false"} idx = {-1} Date = {Date}/>
        }
    </div>

       <div className='sepLine'/>
    
    </>
  )
}

export default rightBarHead