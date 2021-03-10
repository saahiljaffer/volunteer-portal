import React, { useState } from "react";
import {
  FormControl,
  Box,
  TextField,
  Button,
  Link,
  Container,
} from "@material-ui/core";
import firebase from "firebase";

export function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleChange = (event, value) => {
    setEmail(event.target.value);
  };

  const onSubmit = () => {
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(function () {
        // Email sent.
      })
      .catch(function (error) {
        // An error happened.
      });
  };

  return (
    <Container maxWidth="sm">
      <Box m={1}>
        <TextField
          // inputRef={register}
          name="email"
          label="Email Address"
          // className={classes.textField}
          // margin="normal"
          value={email}
          onChange={handleChange}
          variant="outlined"
          fullWidth
        />
      </Box>
      <Box m={1}>
        <Button onClick={onSubmit} variant="contained" fullWidth>
          Reset Password
        </Button>
      </Box>
    </Container>
  );
}

export default ForgotPassword;
