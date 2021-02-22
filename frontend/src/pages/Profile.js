// import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { useForm } from "react-hook-form";
import {
  Grid,
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
  Container,
} from "@material-ui/core";
// import {ProfileBox, Image, P} from './Styles';

function DriverInitialize() {
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

  return (
    <Container maxWidth="md">
      <FormControl onSubmit={handleSubmit(onSubmit)}>
        <Box m={2}>
          <TextField
            inputRef={register}
            name="number"
            label="WhatsApp Number"
            // className={classes.textField}
            margin="normal"
            variant="outlined"
            fullWidth
          />
        </Box>
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
          <FormLabel component="legend">
            I understand that while safety of the community is of utmost
            importance, there is still some risks present due to COVID-19. I
            bear full responsibility for my own actions and understand that the
            ISIJ of Toronto will not be held liable for any complications
            arising from the volunteer services I provide.
          </FormLabel>

          <RadioGroup
            aria-label="covidWaiver"
            name="covidWaiver"
            inputRef={register}
          >
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

          <RadioGroup
            aria-label="contactWaiver"
            name="contactWaiver"
            inputRef={register}
          >
            <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="No" control={<Radio />} label="No" />
          </RadioGroup>
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

export function Profile() {
  return (
    // isAuthenticated && (
    //   <>
    //     <img src={user.picture} alt={user.name} />
    //     <p>Name: {user.name}</p>
    //     <p>Username: {user.nickname}</p>
    //     <p>Email: {user.email}</p>
    //   </>
    // )
    <DriverInitialize />
  );
}
