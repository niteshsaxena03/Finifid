// css 
import "./header.css"


const headerOptions = ({Icon , label , Avatar}) => {
  return (
    <div className='icon'>
    {/* icon or avatar */}
          { Icon != undefined  ? <Icon/> : <Avatar/> }
          <span>{label}</span>
    </div>
  ) ;
}   

export default headerOptions