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

export function DeliveryPage({ data, index, setIndex, id, name }) {
  let dt = new Date();
  dt = new Date(dt.getTime() - dt.getTimezoneOffset() * 60000);
  let size = "medium";
  if (useMediaQuery("(max-width:355px)")) {
    size = "small";
  }
  if (useMediaQuery("(min-width:430px)")) {
    size = "large";
  }
  const classes = useStyles();
  return (
    <>
      <Container maxWidth="sm" m={2} style={{ textAlign: "left" }}>
        <h1 style={{ marginBlock: "0.5em" }}>
          Delivery {index} of {data.deliveries.length}
        </h1>
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
          <b>If you require assistance please message in the WhatsApp group</b>
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
              className={classes.buttonGrey}
              variant="contained"
              color="primary"
            >
              Get Directions
            </Button>
          </Link>
        </Box>

        {index == data.deliveries.length && (
          <Box style={{ textAlign: "center" }}>
            <p>
              <b>This is your last delivery</b>
            </p>
            <Button
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
              fullWidth
            >
              Route Complete
            </Button>
          </Box>
        )}
      </Container>
      <div className="footer">
        <Container style={{ width: "fit-content", padding: "0" }}>
          <h3 style={{ marginBlock: "0.5em" }}>Deliveries</h3>
          <Pagination
            className={classes.pagination}
            size={size}
            variant="outlined"
            shape="rounded"
            page={index}
            onChange={(event, value) => {
              setIndex(value);
            }}
            count={data.deliveries.length}
          />
        </Container>
      </div>
    </>
  );
}

export default DeliveryPage;
