import React from 'react';
import {Provider} from 'react-redux';
import {configStore} from "../store";
import {BrowserRouter as Router} from "react-router-dom";
import Navbar from "./Navbar";
import Main from './Main'
import {setAuthorizationToken,setCurrentUser} from "../store/actions/auth";
import jwtDecode from "jwt-decode";  //decodes payload from jwt token which contains our user info

const store=configStore();

if(localStorage.jwtToken){
  setAuthorizationToken(localStorage.jwtToken);   //if our server goes down or redux store erased but token present we can still recover details if user 
  try{
    store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));        //logged in.i.e token was still present and then recover redux state
  }
  //if someone manually tampers jwt key in localstorage we forcefully log out 
  catch(err){
    store.dispatch(setCurrentUser({}));
  }
}
const App=()=>(
  <Provider store={store}>
    <Router>
      <div className="onboarding">
        <Navbar />
        <Main />
      </div>
    </Router>
  </Provider>
  )
export default App;
