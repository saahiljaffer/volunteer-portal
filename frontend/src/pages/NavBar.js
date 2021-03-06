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

const navLinks = [
  { title: `Home`, path: `/` },
  { title: "Routes", path: "/routes" },
  { title: `Profile`, path: `/profile` },
];

function NavBar({ products }) {
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
    <AppBar position="static">
      <Toolbar>
        <List
          className={classes.navDisplayFlex}
          component="nav"
          aria-labelledby="main navigation"
        >
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
        </List>
      </Toolbar>
    </AppBar>
  );
}
export default NavBar;
