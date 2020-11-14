import React from "react";
import { Dropdown, DropdownButton, Nav, Navbar } from "react-bootstrap";
import "./navbar.css";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import GoogleLoginComponent from "../../common-components/GoogleLoginComponent/GoogleLoginComponent";
import { logoutUser } from "../../common-components/GoogleLoginComponent/GoogleLogin.action";

import SlideDrawerComponent from "../../components/SlideContributor/slideDrawer"

import { getAllApprovedItems } from "../SelectorBar/selectorbar.action";




const SignIn = styled.div`
  float: left;
  .dropdown {
    display: inline;
  }
  .btn.btn-primary {
    background-color: transparent;
    border-color: transparent;
    &::after {
      color: black;
    }
  }
`;
const UploadLink = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
  transition: all 0.2s ease-out;
  img {
    height: 50px;
  }
  a {
    font-size: 14px;
    text-transform: uppercase;
    color: #435b71;
    margin-left: 15px;
    font-weight: bold;
    text-decoration: none;
  }
`;

const NavComponentStyle = styled.div`
  a {
    text-decoration: none;
    color: #000;
    span {
      margin-left: 10px;
      font-size: 15px;
      img {
        height: 40px;
      }
    }
  }
  img {
    margin-top: 6px;
    margin-left: 18px;
    cursor: pointer;
  }
`;
const ProfilePic = styled.span`
  width: 40px;
  height: 40px;
  display: inline-block;
  margin-left: 10px;
  img {
    max-width: 100%;
    height: auto;
    border-radius: 50%;
  }
`;

const GoogleLoginWrapper = styled.span`
  margin-left: 10px;
  button{
    padding 0;
  }
  }
`;

const SignInWrapper = styled.div`
  display: flex;
  align-items: center;
`;


class SocialSignOn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      username: "",
      userImg: "",
      email: "",
    };
  }

  componentDidMount() {
    this.changeLoggedInstate();
  }

  changeLoggedInstate = () => {
    const loginData = JSON.parse(sessionStorage.getItem("userData"));
    if (loginData) {
      this.setState(
        {
          username: loginData ? loginData.username : "",
          userImg: loginData ? loginData.userImg : "",
          email: loginData ? loginData.email : "",
        },
        () => {
          console.log(this.state.email);
        }
      );
    }
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      nextProps.loginUserState.loggedinStatus &&
      nextProps.loginUserState.loggedInUserDetails
    ) {
      this.setState({
        username: nextProps.loginUserState.loggedInUserDetails.username,
        userImg: nextProps.loginUserState.loggedInUserDetails.userImg,
        email: nextProps.loginUserState.loggedInUserDetails.email,
      });
    }
    if (!nextProps.loginUserState.loggedinStatus) {
      this.resetLoggedInState();
    }
  }

  logOut = () => {
    this.props.logoutUser();
  };

  resetLoggedInState = () => {
    this.setState({
      username: "",
      userImg: "",
      email: "",
      loggedIn: false,
    });
  };

  toCloseDrawer = (value) => {
    if (value) {
      this.setState({
        drawerOpen: false,
      });
    }
  };

  getAllApprovedItems = () => {
    this.setState({ drawerOpen: true }, () => {
      this.props.getAllApprovedItems();
    });
  };

  render() {
    return (
      <>
        <Navbar className="justify-content-between whitebg" sticky="top">
          <NavComponentStyle>
            <Link to="/">
              <span>
                {" "}
                <img
                  src={window.location.origin + "/assets/img/launchpad.png"}
                  alt="upload"
                />
              </span>
            </Link>
          </NavComponentStyle>
          <Nav className="navbar-evaluator">
            <UploadLink inline>
              <Link to="/upload">Upload</Link>
            </UploadLink>
            {this.state.userImg || sessionStorage.getItem("userData") ? (
              <SignInWrapper>
                <SignIn>
                  <ProfilePic>
                    <img src={this.state.userImg} alt="" />
                  </ProfilePic>
                  <span>
                    <DropdownButton
                      alignRight
                      id="dropdown-menu-align-right"
                      title=""
                    >
                      {this.state.email === "rajrock38@gmail.com" && (
                        <Dropdown.Item as="button">
                          <Link to="/admin">Go To Admin</Link>
                        </Dropdown.Item>
                      )}
                      <Dropdown.Item onClick={this.logOut}>
                        Logout
                      </Dropdown.Item>
                    </DropdownButton>
                  </span>
                </SignIn>
              </SignInWrapper>
            ) : (
              <GoogleLoginWrapper>
                <GoogleLoginComponent />
              </GoogleLoginWrapper>
            )}
            <NavComponentStyle>
              <img
                src={window.location.origin + "/assets/img/hamburger.png"}
                alt="star"
                onClick={this.getAllApprovedItems}
              />
            </NavComponentStyle>
          </Nav>
        </Navbar>
          <SlideDrawerComponent
            show={this.state.drawerOpen}
            closeDrawer={this.toCloseDrawer}
            data={this.props.allApprovedItems}
          />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  loginUserState: state.LoginReducer,
  allApprovedItems: state.SelectorBarReducer.allApprovedItems
});

const NavBarConnect = connect(mapStateToProps, {
  logoutUser,
  getAllApprovedItems
})(SocialSignOn);

export { NavBarConnect };
