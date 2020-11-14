import React from "react";
import GoogleLogin from "react-google-login";
import {loginUserAction} from './GoogleLogin.action';
import { connect } from 'react-redux'



function GoogleLoginComponent(props) {


  const onSuccess = (googleUser) => {
    const profile = googleUser.getBasicProfile();
    const username = profile.getName();
    const userImg = profile.getImageUrl();
    const email = profile.getEmail(); // This is null if the 'email' scope is not present.
    const userDetails = {
      username,
      userImg,
      email,
    };
    console.log(userDetails)
    props.loginUserAction(userDetails);
  };


  
  return (
    <GoogleLogin
      clientId="289997342946-5ahicbblu1o3nnm35hrpe0h5c77ose21.apps.googleusercontent.com"
      onSuccess={onSuccess}
      className="google-login"
    />
  );
}


const mapStateToProps = (state) => ({

})

const GoogleLoginComponentContainer = connect(mapStateToProps,{
  loginUserAction
})(GoogleLoginComponent)

export default GoogleLoginComponentContainer
