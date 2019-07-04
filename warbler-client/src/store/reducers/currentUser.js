import {SET_CURRENT_USER} from "../actionTypes";

const DEFAULT_STATE={
    isAuthenticated:false,   //true when user logged in
    user:{}                     //user info of logged user
}
export default(state=DEFAULT_STATE,action)=>{
    switch(action.type){
        case SET_CURRENT_USER:
            return{
                isAuthenticated:Object.keys(action.user).length>0,//ISAUTHENTICATED IS TRUE IS ACTION.USER IS NOT NULL,RHS RETURNS NO OF KEYS OF action.user
                user:action.user
            };
        default:
            return state;
    }
}