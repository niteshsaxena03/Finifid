
import Icon from "../IconComponent/Icon.jsx" ; 

// Icons : 
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ShareIcon from '@mui/icons-material/Share';
import SendIcon from '@mui/icons-material/Send';




const PostFooter = () => {
  return (
    <div className="postFooter">
    <Icon Icon = {ThumbUpOffAltIcon} label={"Like"} idx = {-1}/>
    <Icon Icon = {ChatBubbleOutlineIcon} label={"Comment"} idx = {-1}/>
    <Icon Icon = {ShareIcon} label={"Share"} idx = {-1}/>
    <Icon Icon = {SendIcon} label={"Send"} idx = {-1}/>
    </div>

  )
}

export default PostFooter