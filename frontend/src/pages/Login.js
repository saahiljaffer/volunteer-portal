// Import FirebaseAuth and firebase.
import React, { useState, useEffect, useContext } from "react";
import UserContext from "../contexts/UserContext";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import getFirebaseConfig from "./fbconfig.js";

import {
  Container,
  Box,
  FormControl,
  TextField,
  Button,
  ListItem,
  ListItemText,
} from "@material-ui/core";

// Configure Firebase.
const config = {
  apiKey: "AIzaSyA_g3NGl1fswGiAn028Rq8VfRlqLZHA_1c",
  authDomain: "isijniyaz.firebaseapp.com",
  projectId: "isijniyaz",
  storageBucket: "isijniyaz.appspot.com",
  messagingSenderId: "575752581167",
  appId: "1:575752581167:web:5cb8b2e65175a906b816da",
};

// getFirebaseConfig.then((result) => {
//   firebase.initializeApp(result);
// });
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export function Login() {
  const onSubmit = async (event) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(watch("email"), watch("password"))
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
      });

    const result = await fetch(`/api/drivers/add/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        number: watch("number"),
        centre: watch("centre"),
        east: watch("east"),
        complex: watch("complex"),
        bayview: watch("bayview"),
        covidWaiver: watch("covidWaiver"),
        contactWaiver: watch("contactWaiver"),
      }),
    });
    console.log(result);
  };

  const createAccount = () => {
    return <Redirect to="/signup" />;
  };

  const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.

  const { user, changeUser } = useContext(UserContext);

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => {
        setIsSignedIn(!!user);
        changeUser(
          JSON.stringify({
            name: firebase.auth().currentUser,
            loggedIn: isSignedIn,
          })
        );
      });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  const { register, handleSubmit, watch, errors } = useForm();

  if (!isSignedIn) {
    return (
      <div>
        <h1>Login</h1>

        <Container maxWidth="md">
          <FormControl onSubmit={handleSubmit(onSubmit)}>
            <Box m={1}>
              <TextField
                inputRef={register}
                name="email"
                label="Email Address"
                // className={classes.textField}
                // margin="normal"
                variant="outlined"
                fullWidth
              />
            </Box>
            <Box m={1}>
              <TextField
                inputRef={register}
                name="password"
                label="Password"
                label="Password"
                type="password"
                autoComplete="current-password"
                // className={classes.textField}
                // margin="normal"
                variant="outlined"
                fullWidth
              />
            </Box>

            <Box m={1}>
              <Button variant="contained" onClick={onSubmit} fullWidth>
                Sign In
              </Button>
            </Box>

            <Box m={1}>
              <Link
                to="/signup"
                key="signup"
                style={{ textDecoration: "none" }}
              >
                <Button variant="contained" fullWidth>
                  Create New Account
                </Button>
              </Link>
            </Box>
          </FormControl>
        </Container>
      </div>
    );
  }
  return <Redirect to="/"></Redirect>;
}

export default Login;
