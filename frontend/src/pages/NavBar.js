import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import firebase from "firebase";
import UserContext from "../contexts/UserContext";

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
  // { title: `Home`, path: `/` },
  { title: `Home`, path: `/` },
  { title: `Profile`, path: `/profile` },
];

function NavBar({ products }) {
  const { user, changeUser } = useContext(UserContext);
  const classes = useStyles();
  const [log, setLog] = useState(false);

  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => {
        setLog(!log);
        changeUser(JSON.stringify({ name: "saahil", initialized: true }));
      });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  var saahil = firebase.auth().currentUser;

  // if (saahil) {
  //   return <p>Logged in</p>;
  // } else {
  //   return <p>Logged out</p>;
  // }

  // return <p>{firebase.auth.currentUser}</p>;

  return (
    <AppBar position="static">
      <Toolbar>
        <List
          className={classes.navDisplayFlex}
          component="nav"
          aria-labelledby="main navigation"
        >
          {!saahil && (
            <></>
            // <Link to="/login" key="login" className={classes.linkText}>
            //   <ListItem button>
            //     <ListItemText primary="Login" />
            //   </ListItem>
            // </Link>
          )}

          {saahil && (
            <>
              {navLinks.map(({ title, path }) => (
                <Link to={path} key={title} className={classes.linkText}>
                  <ListItem button>
                    <ListItemText primary={title} />
                  </ListItem>
                </Link>
              ))}
              <Link to="/login" key="login" className={classes.linkText}>
                <ListItem button onClick={() => firebase.auth().signOut()}>
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
