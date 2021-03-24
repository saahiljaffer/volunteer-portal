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
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (event, value) => {
    setEmail(event.target.value);
  };

  const onSubmit = () => {
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(function () {
        setOpen(true);
      })
      .catch(function (error) {
        setError(error.message);
      });
  };

  if (open) {
    return (
      <Container maxWidth="sm">
        <Box m={1}>
          <Alert style={{ marginBottom: "16px" }} severity="success">
            Your password has been reset
          </Alert>
        </Box>
        <Box m={1}>
          <Link href="/login" key="login" style={{ textDecoration: "none" }}>
            <Button variant="contained" fullWidth>
              Back to login
            </Button>
          </Link>
        </Box>
      </Container>
    );
  } else {
    return (
      <Container maxWidth="sm">
        {error && (
          <Box m={1}>
            <Alert severity="error" style={{ marginBottom: "16px" }}>
              Your submission wasn't submitted successfully! &nbsp;
              {error}
            </Alert>
          </Box>
        )}
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
}

export default ForgotPassword;
