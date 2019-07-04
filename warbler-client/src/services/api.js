import axios from "axios";


//TOKEN HAS TO BE ATTACHED TO ALL OUR REQUESTS COZ ONLY AUTHORISED USERS ARE ALLOWED TO MAKE REQUESTS IN OUR API
export function setTokenHeader(token){
    if(token)
    {
        axios.defaults.headers.common["Authorization"]=`Bearer ${token}`;    //IF TOKEN IS PRESENT(I.E SOME1 LOGGED IN),SET HTTP HEADER WITH THAT JWT TOKEN
    }else{
        delete axios.defaults.headers.common['Authorization'];              //IF ONE LOGS OUT REMOVE THAT TOKEN
    }
}

export function apiCall(method,url,data){
    return new Promise((resolve,reject)=>{
        return axios({
            method:method,
            url:url,
            data:data
        })
        .then(res=>{
            return resolve(res.data)
        })
        .catch(err=>{
            return reject(err.response.data.error);  //error is returned from our ERRORHANDLER BACKEND and err.response.data is axios' way of sending error
        })
    })
}