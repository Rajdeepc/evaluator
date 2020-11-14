import React from "react";
import Routes from "./routes";
import { NavBarConnect } from "./components/NavBar/SSOLogin";
import "./App.css";
import { withRouter } from "react-router-dom";
import FooterComponent from './components/Footer/FooterComponent'






const App = ({ location }) => {

  console.log(location);

  const getProfileDetails = () => {};

  return (
    <div>
      {!location.pathname.includes("/startquiz")  && (
        <NavBarConnect getGoogleResponseToParent={getProfileDetails} />
      )}
      <Routes></Routes>
      <FooterComponent />
    </div>
  );
};

export default withRouter(App);
