//responsible for routing logic

import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Homepage from "../components/Homepage";
import AuthForm from "../components/AuthForm";
import {authUser} from "../store/actions/auth";
import {removeError} from "../store/actions/errors";
import withAuth from "../hocs/withAuth";
import MessageForm from "./MessageForm";
import UpForm from "./UpForm";
const Main = props => {
  const { authUser,errors,removeError,currentUser } = props;
  return (
    <div className="container">
      <Switch>
        <Route exact path="/" render={props => <Homepage currentUser={currentUser} removeError={removeError} errors={errors.message} {...props} />} />  {/*HOMEPAGE NOW HAS HISTORY,MATCH ETC DUE TO ...props from router */}
        <Route exact path="/signin" render={props => {
            return ( 
            <AuthForm errors={errors} removeError={removeError} onAuth={authUser} buttonText="Log in" heading="Welcome Back." {...props}/>
            );
        }} />
        
        <Route exact path="/signup" render={props => {
            return ( 
            <AuthForm onAuth={authUser} errors={errors} removeError={removeError} signUp buttonText="Sign me Up!" heading="Join Warbler today!!" {...props}/>
            );
        }}
        />
        <Route path="/users/:id/messages/new" component={withAuth(MessageForm)} />
        <Route path="/users/:id/messages/:message_id" component={withAuth(UpForm)} />
      </Switch>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    errors:state.errors
  };
}

export default withRouter(connect(mapStateToProps,{authUser,removeError})(Main));
