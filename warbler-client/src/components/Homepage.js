import React from "react";
import { Link } from "react-router-dom";
import MessageTimeline from "./MessageTimeline";
const Homepage = ({currentUser,errors,history,removeError}) => {
  history.listen(()=>{
        removeError();     //IF ROUTES ARE CHANGES SAY FROM SIGNUP TO SIGNIN PREVIOUS ERROR NO LONGER HOLDS
    });
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
    <div>
    {errors && (
          <div className="alert alert-danger">{errors}</div>
        )}
    <MessageTimeline profileImageUrl={currentUser.user.profileImageUrl} username={currentUser.user.username}/>
    </div>
  );
};

export default Homepage;
