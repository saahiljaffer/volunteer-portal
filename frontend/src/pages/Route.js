import React, { useState, useEffect } from "react";
import {
  Link,
  Button,
  Container,
  Box,
  makeStyles,
  ButtonGroup,
  CircularProgress,
} from "@material-ui/core";
import { Pagination, PaginationItem } from "@material-ui/lab";
import { Redirect } from "react-router-dom";

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

  if (data) {
    if (index == 0) {
      return (
        <>
          <Container>
            <h1>Welcome!</h1>
            <h1>Route: {id}</h1>
            <h1>Deliveries: {data.deliveries.length}</h1>
            <p>
              Salaam Alaykum and thank you for volunteering! Before you begin
              your route, please add this site to your home screen to make it
              easier to switching between this and Google Maps. For apartment
              deliveries, please call the recipient to collect their niyaz. For
              houses, you may leave the niyaz outside the door and ring the
              doorbell.
            </p>
            <Box m={1}>
              <Button
                onClick={() => {
                  setIndex(1);
                }}
                variant="contained"
                color="primary"
              >
                Start Route
              </Button>
            </Box>
            <Box m={1}>
              <Button
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
        <Container>
          <h1>Thank you!</h1>
          <h1>Route #{id} Completed</h1>

          <p>
            Thank you for volunteering! If you would like to create custom
            routes for your own deliveries, please don't hesitate to contact us
            at <Link href="mailto:niyaz@jaffari.org">niyaz@jaffari.org</Link>
          </p>
          <Box m={1}>
            <Button
              onClick={() => {
                setIndex(1);
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
            {/* <Box minHeight="500px"> */}
            <p style={{ width: "fit-content" }}>
              <b>ID:</b> {data.deliveries[index - 1].id}
            </p>
            <p>
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
            </p>

            {data.deliveries[index - 1].apt && (
              <p style={{ width: "fit-content" }}>
                <b> Apartment/Unit:</b> {data.deliveries[index - 1].apt}
              </p>
            )}
            <p style={{ width: "fit-content" }}>
              <b>Phone Number:</b>{" "}
              <Link href={"tel:" + data.deliveries[index - 1].phone}>
                {data.deliveries[index - 1].phone}
              </Link>
            </p>
            <p style={{ width: "fit-content" }}>
              <b>Portions:</b> {data.deliveries[index - 1].portions}
            </p>
            {data.deliveries[index - 1].notes && (
              <p style={{ width: "fit-content" }}>
                <b>Notes:</b> {data.deliveries[index - 1].notes}
              </p>
            )}
            {/* <ButtonGroup aria-label="outlined primary button group"> */}
            {/* </Box> */}
          </Container>
          {index == data.deliveries.length && (
            <>
              <h3>Congrats! This is your last delivery</h3>
              <Box m={1}>
                <Button
                  onClick={() => {
                    setIndex(data.deliveries.length + 1);
                  }}
                  variant="contained"
                  color="primary"
                >
                  Route Complete
                </Button>
              </Box>
            </>
          )}
          {/* <Container m={2} maxWidth="md" style={{ width: "fit-content" }}> */}

          <div className="footer">
            <Box m={1}>
              <Link
                href={"tel:" + data.deliveries[index - 1].phone}
                key="signup"
                style={{ textDecoration: "none" }}
              >
                <Button
                  style={{ marginRight: "8px" }}
                  color="primary"
                  variant="contained"
                >
                  Call Recipient
                </Button>
              </Link>
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
                <Button variant="contained" color="primary">
                  Get Directions
                </Button>
              </Link>
            </Box>

            <Container style={{ width: "fit-content" }} maxWidth="md">
              <h2>Deliveries</h2>
              {/* <PaginationItem component="p" page={1}></PaginationItem> */}
              <Pagination
                // size="large"
                variant="outlined"
                shape="rounded"
                page={index}
                onChange={handleChange}
                count={data.deliveries.length}
              />
            </Container>
          </div>
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
