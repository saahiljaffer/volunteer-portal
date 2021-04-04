import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Profile } from "./pages/Profile";
import { ForgotPassword } from "./pages/ForgotPassword";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { Events } from "./pages/Events";
import NavBar from "./pages/NavBar";
import { Redirect } from "react-router-dom";
import firebase from "firebase";

function ProtectedRoute({ redirectTo, path, component }) {
  if (!firebase.auth().currentUser) {
    return <Redirect to={redirectTo}></Redirect>;
  } else {
    return <Route exact path={path} component={component}></Route>;
  }
}

function App({ history }) {
  // React routing
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Switch>
          <ProtectedRoute
            path="/"
            redirectTo="/routes"
            component={() => <Events />}
            exact
          />
          <ProtectedRoute
            path="/profile"
            redirectTo="/login"
            component={() => <Profile />}
          />
          <Route path="/signup" component={() => <SignUp />} />
          <Route path="/login" component={() => <Login />} />
          <Route exact path="/forgotPassword" component={ForgotPassword} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
