import React, { useEffect } from "react";
import Container from "@material-ui/core/Container";
import { useForm } from "react-hook-form";
import {
  FormControl,
  Box,
  TextField,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormGroup,
  Checkbox,
  Button,
} from "@material-ui/core";

// Returns a signup form that drivers can use to signup for regular events
export function DriverSignup() {
  // API call that submits signup information
  const onSubmit = async (event) => {
    const result = await fetch(`/api/signup/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        time: watch("time"),
        name: firebase.auth.currentUser.name,
        east: watch("east"),
        complex: watch("complex"),
        bayview: watch("bayview"),
      }),
    });
    console.log(result);
  };

  //  API call to display information
  useEffect(() => {
    fetch(`/api/users`).then((response) => response.json());
  }, []);

  // react-hook-form implementation
  const { register, handleSubmit, watch, errors } = useForm();

  // Form with all the required driver quesitons
  return (
    <Container maxwidth="md">
      <FormControl onSubmit={handleSubmit(onSubmit)}>
        {/* Allow them to choose a pickup time */}
        <Box m={2}>
          <TextField
            inputRef={register}
            name="number"
            label="Pickup Time"
            margin="normal"
            variant="outlined"
            fullWidth
          />
        </Box>
        {/* Other questions for drivers */}
        <Box m={2}>
          <FormLabel component="legend">
            Which centre would you like to deliver for?
          </FormLabel>
          <RadioGroup aria-label="centre" name="centre" inputRef={register}>
            <FormControlLabel value="jcc" control={<Radio />} label="JCC" />
            <FormControlLabel value="mic" control={<Radio />} label="MIC" />
            <FormControlLabel value="rcc" control={<Radio />} label="RCC" />
          </RadioGroup>
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
              control={<Checkbox name="complex" />}
              label="Complex"
            />
          </FormGroup>
        </Box>
        <Box m={2}>
          <Button variant="contained" onClick={onSubmit}>
            Submit
          </Button>
        </Box>
      </FormControl>
    </Container>
  );
}

export default DriverSignup;
