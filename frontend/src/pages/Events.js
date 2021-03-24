import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import { red } from "@material-ui/core/colors";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Container from "@material-ui/core/Container";
import { useForm } from "react-hook-form";
import { Calendar } from "../Components/Calendar";
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
} from "@material-ui/core";

function DriverSignup() {
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

  useEffect(() => {
    fetch(`/api/users`).then((response) => response.json());
  }, []);

  const { register, handleSubmit, watch, errors } = useForm();

  return (
    <Container maxwidth="md">
      <FormControl onSubmit={handleSubmit(onSubmit)}>
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

const useStyles = makeStyles((theme) => ({
  root: {},
  media: {
    height: 0,
    paddingTop: "56.25%",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

function RecipeReviewCard({ content, title, subheader }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(true);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        action={
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        }
        title={title}
        subheader={subheader}
      />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>{content}</CardContent>
      </Collapse>
    </Card>
  );
}

export function Events() {
  return (
    <Grid maxwidth="md" justifycontent="centre">
      <Box
        m={2}
        style={{
          maxwidth: "800px",
          width: "80%",
          margin: "auto",
          marginTop: "20px",
          justifycontent: "centre",
          alignContent: "center",
        }}
      >
        <RecipeReviewCard
          title="Ramadhan"
          subheader="April 15th - May 15th"
          content={<Calendar />}
          style={{ justifycontent: "centre", alignContent: "center" }}
        />
      </Box>
    </Grid>
  );
}

export default Events;
