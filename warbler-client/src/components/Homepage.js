import React from "react";
import { Link } from "react-router-dom";
import MessageTimeline from "./MessageTimeline";
const Homepage = ({currentUser}) => {
  if(!currentUser.isAuthenticated){
      return (
      <div className="home-hero">
      <h1>You are what you share,The place where u connect to the World is here!!</h1>
        <h3>New to Warbler?</h3>
        <Link to="/signup" className="btn btn-primary">
          Sign up Now
        </Link>
      </div>
    );
  }
  return(
    <MessageTimeline profileImageUrl={currentUser.user.profileImageUrl} username={currentUser.user.username}/>  
  )
};

export default Homepage;
