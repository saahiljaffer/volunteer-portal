import React, { useState } from "react";
import { Box, TextField, Button, Link, Container } from "@material-ui/core";
import firebase from "firebase";
import Alert from "../Components/Alert";

// Returns a forgot password page to allow users to reset their password
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

  // Return an alert if their password has been reset
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
    // Otherwise return an alert that their password wasn't reset succesfully
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
        {/* Email field to reset their password */}
        <Box m={1}>
          <TextField
            name="email"
            label="Email Address"
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
