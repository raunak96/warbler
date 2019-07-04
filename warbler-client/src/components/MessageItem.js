import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import DefaultProfileImg from "../images/default-profile-image.jpg";

const MessageItem = ({date,profileImageUrl,text,username,deleteMessage,isCorrectUser,currentUser,id}) => (
  <div>
    <li className="list-group-item">
      <img src={profileImageUrl || DefaultProfileImg} alt={username} height="100" width="100" className="timeline-image" />
      <div className="message-area">
        <Link to="/">@{username} &nbsp;</Link>   {/* &npsp is for space*/}
        <span className="text-muted">
          <Moment className="text-muted" format="Do MMM YYYY">
            {date}
          </Moment>
        </span>
        <p>{text}</p>
        
      </div>
    {isCorrectUser && (<div className="icons float-right">
                        <Link to="" onClick={deleteMessage}><i className="fa fa-trash-o float-right"></i></Link>
                        <Link  to={{pathname:`/users/${currentUser}/messages/${id}`,text:text}}><i className="fa fa-pencil-square-o"></i></Link>
                        </div>)}
    </li>
  </div>
);

export default MessageItem;
