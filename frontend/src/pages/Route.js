import React, { useState, useEffect } from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {
  Link,
  Button,
  Container,
  Box,
  makeStyles,
  CircularProgress,
  TextField,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import DeliveryPage from "../Components/DeliveryPage";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginBottom: theme.spacing(1),
  },
  checkbox: {
    margin: theme.spacing(1),
    textAlign: "left",
  },
  label: {
    margin: theme.spacing(1),
    textAlign: "left",
  },
  pagination: {
    [theme.breakpoints.down("sm")]: {
      height: "26px",
      margin: "0px 1px",
      padding: "0px 4px",
      minWidth: "26px",
    },
  },
  buttonGreen: {
    backgroundColor: "#198754",
    "&:hover": {
      backgroundColor: "#125F3B",
    },
    marginBottom: theme.spacing(1),
  },
  buttonGrey: {
    backgroundColor: "#495057",
    "&:hover": {
      backgroundColor: "#393E44",
    },
    marginBottom: theme.spacing(1),
  },
  button: {
    marginBottom: theme.spacing(1),
  },
}));

function LandingPage({ id, data, setIndex, name, setName }) {
  const classes = useStyles();
  let dt = new Date();
  dt = new Date(dt.getTime() - dt.getTimezoneOffset() * 60000);

  return (
    <>
      <Container maxWidth="sm" style={{ textAlign: "left" }}>
        <h1>Welcome Route {id} Driver</h1>
        <b>Deliveries: {data.deliveries.length}</b>
        <p>
          Salaam Alaykum,
          <br />
          Thank you for volunteering for Niyaz delivery. Please follow the
          instructions below:
        </p>
        <p>
          <b>House Deliveries:</b> Place the niyaz on the doorstep and ring the
          doorbell.
        </p>
        <p>
          <b>Apartment Deliveries:</b> Call the recipient before you arrive.
          Place the delivery at the building entrance for the recipient to
          pickup.
        </p>
        <p>
          Ensure you are delivering the correct number of portions to each
          delivery.
        </p>
        <p>Please enter your full name before proceeding:</p>
      </Container>
      <Container maxWidth="sm">
        <Box m={0}>
          <TextField
            // inputRef={register}
            name="number"
            label="Full Name"
            className={classes.textField}
            // margin="normal"
            // value={route}
            onChange={(event) => {
              setName(event.target.value);
            }}
            variant="outlined"
            fullWidth
          />
        </Box>
        <Box m={0}>
          <Button
            fullWidth
            onClick={() => {
              var fetchStr =
                "/api/routes/" + dt.toJSON().substring(0, 10) + "/" + id;
              fetch(fetchStr, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: name }),
              });
              setIndex(1);
            }}
            className={classes.buttonGreen}
            variant="contained"
            color="primary"
          >
            Start Route
          </Button>
        </Box>
        <Box m={0}>
          <Button
            fullWidth
            className={classes.buttonGrey}
            onClick={() => {
              var fetchStr =
                "/api/routes/done/" + dt.toJSON().substring(0, 10) + "/" + id;
              fetch(fetchStr, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: name }),
              });
              setIndex(data.deliveries.length + 1);
            }}
            variant="contained"
            color="primary"
          >
            Route Complete
          </Button>
        </Box>
      </Container>
    </>
  );
}

function RouteComplete({ id, setIndex }) {
  return (
    <Container maxWidth="sm" style={{ textAlign: "left" }}>
      <h1>
        Jazakallah! <br />
        Route {id} Completed.
      </h1>

      <h3>Thank you for volunteering to deliver Niyaz.</h3>
      <p>
        This route was custom built for ISIJ. If you would like to make your own
        custom routes with an app for your deliveries, please contact us at{" "}
        <Link href="mailto:akeel.hasham@gmail.com">akeel.hasham@gmail.com</Link>
      </p>
      <Box m={0}>
        <Button
          fullWidth
          onClick={() => {
            setIndex(0);
          }}
          variant="contained"
          color="primary"
        >
          Return to Route
        </Button>
      </Box>
    </Container>
  );
}

export function DriverRoute({ match }) {
  const { id } = match.params;
  const [data, setData] = useState(null);
  const [index, setIndex] = useState(0);
  const [name, setName] = useState("");

  useEffect(() => {
    let dt = new Date();
    dt = new Date(dt.getTime() - dt.getTimezoneOffset() * 60000);
    var fetchStr = "/api/routes/" + dt.toJSON().substring(0, 10) + "/" + id;
    fetch(fetchStr, {
      method: "GET",
    })
      .then((response) => response.json())
      .then(setData);
  }, []);

  if (data) {
    if (index == 0) {
      return (
        <LandingPage
          id={id}
          data={data}
          setIndex={setIndex}
          name={name}
          setName={setName}
        />
      );
    } else if (index > data.deliveries.length) {
      return <RouteComplete id={id} setIndex={setIndex} />;
    } else {
      return (
        <DeliveryPage
          data={data}
          index={index}
          setIndex={setIndex}
          name={name}
          id={id}
        />
      );
    }
  }

  return (
    <Container>
      <CircularProgress />
    </Container>
  );
}

export default DriverRoute;
