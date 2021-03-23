import React, { useState, useEffect } from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { positions } from "@material-ui/system";

import {
  Link,
  Button,
  Container,
  Box,
  makeStyles,
  ButtonGroup,
  CircularProgress,
  TextField,
} from "@material-ui/core";
import { Pagination, PaginationItem } from "@material-ui/lab";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginBottom: theme.spacing(1),
    // width: "50ch",
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
  buttonYellow: {
    // color: "#000000",
    backgroundColor: "#495057",
    "&:hover": {
      backgroundColor: "#BA8B00",
    },
    marginBottom: theme.spacing(1),
  },
  button: {
    marginBottom: theme.spacing(1),
  },
}));

export function DriverRoute({ match }) {
  const classes = useStyles();

  const { id } = match.params;
  const [data, setData] = useState(null);
  const [index, setIndex] = useState(0);
  const [link, setLink] = useState(null);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

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

  // useEffect(() => {
  //   if (data) {
  //     setLink(
  //       "https://www.google.com/maps/dir/?api=1&destination=" +
  //         data.deliveries[index].number +
  //         "+" +
  //         data.deliveries[index].street +
  //         "+" +
  //         data.deliveries[index].postalCode
  //     );
  //   }
  // }, [index, data]);

  const handleChange = (event, value) => {
    setIndex(value);
  };

  let size = "medium";
  if (useMediaQuery("(max-width:355px)")) {
    size = "small";
  }
  if (useMediaQuery("(min-width:430px)")) {
    size = "large";
  }

  if (data) {
    if (index == 0) {
      return (
        <>
          <Container maxWidth="sm" style={{ textAlign: "left" }}>
            <h1>Welcome Route {id} Driver</h1>
            {/* <br /> */}
            <b>Deliveries: {data.deliveries.length}</b>
            {/* <br /> */}
            <p>
              Salaam Alaykum,
              <br />
              Thank you for volunteering for Niyaz delivery. Please follow the
              instructions below:
            </p>
            {/* <br /> */}
            <p>
              <b>House Deliveries:</b> Place the niyaz on the doorstep and ring
              the doorbell.
            </p>
            {/* <br /> */}
            <p>
              <b>Apartment Deliveries:</b> Call the recipient before you arrive.
              Place the delivery at the building entrance for the recipient to
              pickup.
            </p>
            {/* <br /> */}
            <p>
              Ensure you are delivering the correct number of portions to each
              delivery.
            </p>
            {/* <br /> */}
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
                // onChange={handleChange}
                variant="outlined"
                fullWidth
              />
            </Box>
            {/* <br /> */}
            <Box m={0}>
              <Button
                fullWidth
                onClick={() => {
                  setIndex(1);
                }}
                className={classes.buttonGreen}
                variant="contained"
                color="primary"
              >
                Start Route
              </Button>
            </Box>
            {/* <br /> */}
            <Box m={0}>
              <Button
                fullWidth
                className={classes.buttonYellow}
                onClick={() => {
                  setIndex(data.deliveries.length + 1);
                  console.log("complete");
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
    } else if (index > data.deliveries.length) {
      return (
        <Container maxWidth="sm" style={{ textAlign: "left" }}>
          <h1>
            Jazakallah! <br />
            Route {id} Completed.
          </h1>

          <h3>Thank you for volunteering to deliver Niyaz.</h3>
          <p>
            This route was custom built for ISIJ. If you would like to make your
            own custom routes with an app for your deliveries, please contact us
            at{" "}
            <Link href="mailto:akeel.hasham@gmail.com">
              akeel.hasham@gmail.com
            </Link>
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
    } else {
      return (
        // <div className={classes.root}>
        <>
          <Container
            // minHeight="800px"
            maxWidth="sm"
            m={2}
            style={{ textAlign: "left" }}
          >
            <h1 style={{ marginBlock: "0.5em" }}>
              Delivery {index} of {data.deliveries.length}
            </h1>
            {/* <Box minHeight="500px"> */}
            <p style={{ width: "fit-content", lineHeight: "1.5" }}>
              <b>ID:</b> {data.deliveries[index - 1].id}
              <br />
              <b>Address: </b>
              <Link
                href={
                  "https://www.google.com/maps/dir/?api=1&destination=" +
                  data.deliveries[index - 1].number +
                  "+" +
                  data.deliveries[index - 1].street +
                  "+" +
                  data.deliveries[index - 1].postalCode
                }
                key="signup"
              >
                {data.deliveries[index - 1].number}{" "}
                {data.deliveries[index - 1].street},{" "}
                {data.deliveries[index - 1].city},{" "}
                {data.deliveries[index - 1].postalCode}
              </Link>
              {data.deliveries[index - 1].apt && (
                <>
                  <br />
                  <b> Apartment/Unit:</b> {data.deliveries[index - 1].apt}
                </>
              )}
              <br />
              <b>Phone Number:</b>{" "}
              <Link href={"tel:" + data.deliveries[index - 1].phone}>
                {data.deliveries[index - 1].phone}
              </Link>
              <br />
              <b>Portions:</b> {data.deliveries[index - 1].portions}
              {data.deliveries[index - 1].notes && (
                <>
                  <br />
                  <b>Notes:</b> {data.deliveries[index - 1].notes}
                </>
              )}
            </p>

            <p>
              <b>
                If you require assistance please message in the WhatsApp group
              </b>
            </p>
            <Box m={0}>
              <Link
                href={"tel:" + data.deliveries[index - 1].phone}
                key="signup"
                style={{ textDecoration: "none" }}
              >
                <Button
                  fullWidth
                  onClick={() => {
                    setIndex(1);
                  }}
                  className={classes.buttonGreen}
                  variant="contained"
                  color="primary"
                >
                  Call Recipient
                </Button>
              </Link>
            </Box>
            {/* <br /> */}
            <Box m={0}>
              <Link
                href={
                  "https://www.google.com/maps/dir/?api=1&destination=" +
                  data.deliveries[index - 1].number +
                  "+" +
                  data.deliveries[index - 1].street +
                  "+" +
                  data.deliveries[index - 1].postalCode
                }
                key="forgotPassword"
                style={{ textDecoration: "none" }}
              >
                <Button
                  fullWidth
                  className={classes.buttonYellow}
                  onClick={() => {
                    setIndex(data.deliveries.length + 1);
                    console.log("complete");
                  }}
                  variant="contained"
                  color="primary"
                >
                  Get Directions
                </Button>
              </Link>
            </Box>

            {/* <ButtonGroup aria-label="outlined primary button group"> */}
            {/* </Box> */}

            {index == data.deliveries.length && (
              <Box style={{ textAlign: "center" }}>
                <p>
                  <b>This is your last delivery</b>
                </p>
                {/* <Box m={1}> */}
                <Button
                  onClick={() => {
                    setIndex(data.deliveries.length + 1);
                  }}
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Route Complete
                </Button>
                {/* </Box> */}
              </Box>
            )}
          </Container>
          {/* <Container m={2} maxWidth="md" style={{ width: "fit-content" }}> */}
          <footer>
            <div className="footer">
              <Container style={{ width: "fit-content", padding: "0" }}>
                <h3 style={{ marginBlock: "0.5em" }}>Deliveries</h3>
                {/* <PaginationItem component="p" page={1}></PaginationItem> */}

                <Pagination
                  className={classes.pagination}
                  size={size}
                  variant="outlined"
                  shape="rounded"
                  page={index}
                  onChange={handleChange}
                  count={data.deliveries.length}
                />
              </Container>
            </div>
          </footer>
          {/* </Container> */}
        </>
        // {/* </ButtonGroup> */}
        // {/* </div> */}
        // {/* </Box> */}
        // //{" "}
        // </div>
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
