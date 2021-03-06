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

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    margin: theme.spacing(1),
    width: "50ch",
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

export function Profile() {
  const [data, setData] = useState(null);

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

  const { register, handleSubmit, watch, errors } = useForm();

  const classes = useStyles();

  if (data) {
    return (
      <div className={classes.root}>
        <Container maxWidth="md">
          <h1>Profile</h1>
          <TextField
            inputRef={register}
            name="fname"
            label="First Name"
            variant="outlined"
            className={classes.textField}
            required
            defaultValue={data.fname}
          />
          <TextField
            inputRef={register}
            name="lname"
            label="Last Name"
            variant="outlined"
            className={classes.textField}
            required
            defaultValue={data.lname}
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
          />

          <TextField
            inputRef={register}
            name="whatsappNumber"
            label="WhatsApp Number"
            variant="outlined"
            className={classes.textField}
            required
            defaultValue={data.whatsappNumber}
          />
          <TextField
            inputRef={register}
            name="cellNumber"
            label="Cell Number (if different from above)"
            variant="outlined"
            className={classes.textField}
            defaultValue={data.cellNumber || null}
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
          />
          <Box m={2}>
            <Button variant="contained" onClick={onSubmit}>
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
