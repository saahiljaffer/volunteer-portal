// Import FirebaseAuth and firebase.
import React, { useState, useEffect, useContext } from "react";
import UserContext from "../contexts/UserContext";
import firebase from "firebase";
import { useForm, Controller } from "react-hook-form";
import { Redirect, Link } from "react-router-dom";
import {
  Container,
  Box,
  FormControl,
  TextField,
  Button,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormGroup,
  Checkbox,
  Select,
  Input,
} from "@material-ui/core";

export function SignUp() {
  const onSubmit = async (event) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(watch("email"), watch("password"))
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        const body = {
          uid: user.uid,
          number: watch("number"),
          centre: watch("centre"),
          east: watch("east"),
          complex: watch("complex"),
          bayview: watch("bayview"),
          covidWaiver: watch("covidWaiver"),
          contactWaiver: watch("contactWaiver"),
        };
        console.log(body);
        const result = fetch(`/api/drivers/add/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            uid: user.uid,
            number: watch("number"),
            centre: watch("centre"),
            east: watch("east"),
            complex: watch("complex"),
            bayview: watch("bayview"),
            covidWaiver: watch("covidWaiver"),
            contactWaiver: watch("contactWaiver"),
          }),
        });
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
      });
  };

  const { register, handleSubmit, control, watch, errors } = useForm();

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const [promoting, setPromoting] = useState();

  return (
    <div>
      <h1>Sign Up</h1>

      <Container maxWidth="md">
        <FormControl onSubmit={handleSubmit(onSubmit)}>
          <Box m={2}>
            <TextField
              inputRef={register}
              name="email"
              label="Email Address"
              variant="outlined"
              fullWidth
            />
          </Box>
          <Box m={2}>
            <TextField
              inputRef={register}
              name="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              variant="outlined"
              fullWidth
            />
          </Box>
          <Box m={2}>
            <TextField
              inputRef={register}
              name="number"
              label="WhatsApp Number"
              variant="outlined"
              fullWidth
            />
          </Box>
          <Box m={2}>
            <FormLabel component="legend">
              Which centre would you like to deliver for?
            </FormLabel>
            <Controller
              rules={{ required: true }}
              control={control}
              defaultValue="jcc"
              name="promoting"
              as={
                <RadioGroup
                  aria-label="promoting"
                  value={promoting}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="jcc"
                    control={<Radio />}
                    label="JCC"
                  />
                  <FormControlLabel
                    value="mic"
                    control={<Radio />}
                    label="MIC"
                  />
                  <FormControlLabel
                    value="rcc"
                    control={<Radio />}
                    label="RCC"
                  />
                </RadioGroup>
              }
            />
          </Box>

          <Box m={2}>
            <FormLabel component="legend">
              Are you interested in delivering for any of the following zones
            </FormLabel>

            <FormGroup>
              <FormControlLabel
                control={<Checkbox inputRef={register} name="east" />}
                label="East"
              />
              <FormControlLabel
                control={<Checkbox inputRef={register} name="bayview" />}
                label="Bayview"
              />
              <FormControlLabel
                control={<Checkbox inputRef={register} name="complex" />}
                label="Complex"
              />
            </FormGroup>
          </Box>

          <Box m={2}>
            <FormLabel component="legend">
              I understand that while safety of the community is of utmost
              importance, there is still some risks present due to COVID-19. I
              bear full responsibility for my own actions and understand that
              the ISIJ of Toronto will not be held liable for any complications
              arising from the volunteer services I provide.
            </FormLabel>

            <RadioGroup aria-label="covidWaiver" name="covidWaiver">
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </Box>

          <Box m={2}>
            <FormLabel component="legend">
              I understand that the ISIJ of Toronto will collect and retain my
              contact information in case public health officials require it for
              contact tracing purposes.
            </FormLabel>
            <RadioGroup aria-label="contactWaiver" name="contactWaiver">
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </Box>
          <Box m={1}>
            <Button variant="contained" onClick={onSubmit} fullWidth>
              Create Account
            </Button>
          </Box>
          <Box m={1}>
            <Link to="/login" key="login" style={{ textDecoration: "none" }}>
              <Button variant="contained" fullWidth>
                Back to login
              </Button>
            </Link>
          </Box>
        </FormControl>
      </Container>
    </div>
  );
}
