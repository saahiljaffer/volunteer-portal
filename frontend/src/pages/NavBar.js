import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import firebase from "firebase";
import {
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemText,
  makeStyles,
} from "@material-ui/core";

// Styling
const useStyles = makeStyles((theme) => ({
  navDisplayFlex: {
    display: `flex`,
    justifyContent: `space-between`,
  },
  linkText: {
    textDecoration: `none`,
    textTransform: `uppercase`,
    color: `white`,
  },
}));

// Array of navigation links
const navLinks = [
  { title: `Home`, path: `/` },
  { title: "Routes", path: "/routes" },
  { title: `Profile`, path: `/profile` },
];

// Returns a navigation bar
function NavBar() {
  const classes = useStyles();
  const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.

  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => {
        setIsSignedIn(!!user);
      });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  return (
    <AppBar position="static" style={{ alignItems: "center" }}>
      <Toolbar>
        <List
          className={classes.navDisplayFlex}
          component="nav"
          aria-labelledby="main navigation"
        >
          {/* show them all the pages if theyre signed in */}
          {isSignedIn && (
            <>
              {navLinks.map(({ title, path }) => (
                <Link to={path} key={title} className={classes.linkText}>
                  <ListItem button>
                    <ListItemText primary={title} />
                  </ListItem>
                </Link>
              ))}
              <Link to="/login" key="login" className={classes.linkText}>
                <ListItem
                  button
                  onClick={() => {
                    firebase.auth().signOut();
                  }}
                >
                  <ListItemText primary="Logout" />
                </ListItem>
              </Link>
            </>
          )}
          {/* otherwise only link them to the sign in page */}
          {!isSignedIn && (
            <Link to="/login" key="login" className={classes.linkText}>
              <ListItem button>
                <ListItemText primary="Login" />
              </ListItem>
            </Link>
          )}
        </List>
      </Toolbar>
    </AppBar>
  );
}
export default NavBar;
