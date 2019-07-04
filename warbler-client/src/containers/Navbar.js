import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logOut } from "../store/actions/auth";
import Logo from "../images/warbler-logo.png";

class Navbar extends Component {
  logout=e=>{
    e.preventDefault();
    this.props.logOut();
  }
  render() {
    return (
      <nav className="navbar navbar-expand-sm  bg-faded">
        <div className="container-fluid">
            <div className="navbar-header">
                <Link to="/" className="navbar-brand">
                  <img src={Logo} alt="Warbler Home" />
                  Warbler
                </Link>
            </div>
            {this.props.currentUser.isAuthenticated ? (
              <ul className="nav navbar-nav ml-auto">
                <li>
                  <Link className="btn btn-outline-success btn-lg" to={`/users/${this.props.currentUser.user.id}/messages/new`}><i className="fa fa-comments" aria-hidden="true"></i>New Message</Link>
                </li>
                <li>
                  <Link to="" className="btn btn-outline-warning btn-lg" onClick={this.logout}><i className="fa fa-sign-out" aria-hidden="true"></i>Log out</Link>
                </li>
              </ul>
            ) : 
            (
               <ul className="nav navbar-nav ml-auto">
                <li>
                  <Link className="btn btn-outline-info btn-lg"to="/signup"><i className="fa fa-user-plus" aria-hidden="true"></i>Sign up</Link>
                </li>
                <li>
                  <Link className="btn btn-outline-success btn-lg" to="/signin"><i className="fa fa-sign-in" aria-hidden="true"></i>Log in</Link>
                </li>
              </ul>
          )}
        </div>
      </nav>
    );
  }
}

function mapStateToProps(reduxState) {
  return {
    currentUser: reduxState.currentUser
  };
}

export default connect(mapStateToProps,{logOut})(Navbar);
