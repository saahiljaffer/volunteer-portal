import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import firebase from "firebase";
import {
  Box,
  TextField,
  makeStyles,
  Button,
  Container,
} from "@material-ui/core";

// styling
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    margin: theme.spacing(1),
  },
  checkbox: {
    margin: theme.spacing(1),
    textAlign: "left",
  },
  label: {
    margin: theme.spacing(1),
    textAlign: "left",
  },
}));

// returns a profile page that allows users to see and modify their profile information
export function Profile() {
  const [data, setData] = useState(null);

  // api call to retrieve user data
  useEffect(() => {
    if (firebase.auth().currentUser) {
      var fetchStr = "/api/drivers/" + firebase.auth().currentUser.uid;
      fetch(fetchStr, {
        method: "GET",
      })
        .then((response) => response.json())
        .then(setData);
    }
  }, []);

  // api call to update user data
  const onSubmit = async (event) => {
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

  // react-hook-form and styling
  const { register, handleSubmit, watch, errors } = useForm();
  const classes = useStyles();

  // display the data once its loaded
  if (data) {
    return (
      <div className={classes.root}>
        <Container maxWidth="sm">
          <h1>Profile</h1>
          <TextField
            inputRef={register}
            name="fname"
            label="First Name"
            variant="outlined"
            className={classes.textField}
            required
            defaultValue={data.fname}
            fullWidth
          />
          <TextField
            inputRef={register}
            name="lname"
            label="Last Name"
            variant="outlined"
            className={classes.textField}
            required
            defaultValue={data.lname}
            fullWidth
          />
          <TextField
            inputRef={register}
            name="email"
            label="Email Address"
            variant="outlined"
            fullWidth
            className={classes.textField}
            required
            defaultValue={data.email}
            fullWidth
          />
          <TextField
            inputRef={register}
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            variant="outlined"
            className={classes.textField}
            fullWidth
            required
            fullWidth
          />

          <TextField
            inputRef={register}
            name="whatsappNumber"
            label="WhatsApp Number"
            variant="outlined"
            className={classes.textField}
            required
            defaultValue={data.whatsappNumber}
            fullWidth
          />
          <TextField
            inputRef={register}
            name="cellNumber"
            label="Cell Number (if different from above)"
            variant="outlined"
            className={classes.textField}
            defaultValue={data.cellNumber || null}
            fullWidth
          />
          <TextField
            inputRef={register}
            name="postalCode"
            label="Postal Code"
            autoComplete="current-password"
            variant="outlined"
            className={classes.textField}
            fullWidth
            required
            defaultValue={data.postalCode}
            fullWidth
          />
          <Box m={2}>
            <Button fullWidth variant="contained" onClick={onSubmit}>
              Submit
            </Button>
          </Box>
        </Container>
      </div>
    );
  } else {
    return <></>;
  }
}
