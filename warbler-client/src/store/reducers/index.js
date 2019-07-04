import {combineReducers} from "redux";
import currentUser from './currentUser';
import errors from './errors';
import messages from "./messages";
const rootReducer=combineReducers({
    currentUser:currentUser,            //NOW ROOTREDUCERS IS COMBO OF ALL OTHER REDUCERS(IN OUR CASE ERRORS AND CURRENTUSER),thus we have 
    errors:errors,                       //2 states currentUser and Errors
    messages:messages
})
export default rootReducer;