import React from "react";
import { Switch, Route } from "react-router-dom";
import HomeComponent from "./views/Home/home.container";
import UploadComponent from "./views/Upload/upload.container";
import MyProfileUploadsComponent from "./views/Profile/myprofile.container";
import AdminComponent from "./views/Admin/AdminComponent";
import QuizIntroSetup from "./views/Quiz/QuizIntroSetup";
import QuizDashbaord from "./views/Quiz/QuizDashboard";
import CodeShare from "./components/CodeShare/CodeShare";

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const Routes = () => (
  <main>
    <Switch>
      <Route exact path="/" component={HomeComponent} />
      <Route path="/upload" component={UploadComponent} />
      <Route
        path="/myuploads/:email_id"
        exact
        component={MyProfileUploadsComponent}
      />
      <Route path="/admin" component={AdminComponent} />
      <Route path="/quiz" component={QuizDashbaord} />
      <Route
        exact
        path="/startquiz/:topic"
        component={QuizIntroSetup}
        hideNavBar={true}
      />
      <Route
        exact
        path="/sharecode/:uniqueKey"
        component={CodeShare}
        hideNavBar={true}
      />
    </Switch>
  </main>
);

export default Routes;
