import React, { Component } from "react";

class AuthForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
      profileImageUrl: ""
    };
    this.handleChange=this.handleChange.bind(this);
  }
  handleChange(e){
      this.setState({[e.target.name]:e.target.value});
  }
  
  handleSubmit=e=>{
      e.preventDefault();
      const authType=this.props.signUp?"signup":"signin";
      this.props.onAuth(authType,this.state)//authType is action type  and this.state is user data 
      .then(()=>{
         this.props.history.push("/");  //REDIRECTS TO HOMEPAGE
      })
      .catch(()=>{
        return;
      });
      this.setState({password:""});
  }
  
  render() {
    const { email, username, profileImageUrl } = this.state;
    const { buttonText, heading,signUp,errors,history,removeError } = this.props;
    
    history.listen(()=>{
        removeError();     //IF ROUTES ARE CHANGES SAY FROM SIGNUP TO SIGNIN PREVIOUS ERROR NO LONGER HOLDS
    });

    return (
      <div>
        <div className="row justify-content-md-center text-center">
          <div className="col-md-6">
            <form onSubmit={this.handleSubmit}>
              <h2>{heading}</h2>
              
              
              {  errors.message && (
              <div className="alert alert-danger">   {/*to display flash messages */}
                {errors.message}
              </div>)
                  
              }
              
            <div className="form-group">
              <label style={{fontWeight:'700'}}htmlFor="email">E-mail:</label>
              <input className="form-control" id="email" name="email" onChange={this.handleChange} type="text" value={email} />
            </div>
            <div className="form-group">
              <label style={{fontWeight:'700'}} htmlFor="password">Password:</label>
              <input autoComplete="off" className="form-control" id="password" name="password" onChange={this.handleChange} type="password"/>
            </div>
            {signUp && (          //if signUp prop has value(not null),then signup route was called,hence signup fields like username also rendered 
                <div>
                    <div className="form-group">
                      <label style={{fontWeight:'700'}}htmlFor="username">Username:</label>
                      <input autoComplete="off" className="form-control" id="username" name="username" onChange={this.handleChange} type="text" value={username} />
                    </div>
                    <div className="form-group">
                        <label style={{fontWeight:'700'}} htmlFor="ImgUrl">Profile Pic Url:</label>
                        <input autoComplete="off" className="form-control" id="ImgUrl" name="profileImageUrl" onChange={this.handleChange} type="text" value={profileImageUrl}/>
                    </div>
                </div>
            )}
            <div className="form-group"> 
                <button type="submit" className="btn btn-lg btn-block form-control btn-success">{buttonText}</button>
            </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default AuthForm;