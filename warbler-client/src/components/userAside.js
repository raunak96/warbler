import React from "react";
import DefaultProfileImg from "../images/default-profile-image.jpg";
import { Link } from "react-router-dom";

const UserAside = ({ profileImageUrl, username }) => (
  <aside className="col-md-3 col-sm-8 col-xs-offset-1">
    <div className="panel panel-default">
      <div className="panel-body" style={{width:'100%',height:"100%"}}>
        <img
          src={profileImageUrl || DefaultProfileImg}
          alt={username}
          width="100%"
          height="100%"
          className="img-thumbnail"
        />
        <Link to="/">@{username} &nbsp;</Link>
      </div>
    </div>
  </aside>
);

export default UserAside;
