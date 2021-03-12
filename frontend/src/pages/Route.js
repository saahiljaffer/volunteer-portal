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
import { Pagination } from "@material-ui/lab";
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
  useEffect(() => {
    var fetchStr =
      "/api/routes/" + new Date().toJSON().substring(0, 10) + "/" + id;
    console.log(fetchStr);
    fetch(fetchStr, {
      method: "GET",
    })
      .then((response) => response.json())
      .then(setData);
  }, []);

  useEffect(() => {
    if (data) {
      setLink(
        "https://www.google.com/maps/dir/?api=1&destination=" +
          data.deliveries[index].number +
          "+" +
          data.deliveries[index].street +
          "+" +
          data.deliveries[index].postalCode
      );
    }
  }, [index, data]);

  const handleChange = (event, value) => {
    setIndex(value - 1);
  };

  if (data) {
    return (
      // <div className={classes.root}>
      <>
        <Container m={2} maxWidth="md" style={{ width: "fit-content" }}>
          <Pagination
            m={2}
            style={{ width: "fit-content", paddingTop: "8px" }}
            // showFirstButton
            // hidePrevButton
            // hideNextButton
            // showLastButton
            page={index + 1}
            onChange={handleChange}
            // count={3}
            count={data.deliveries.length}
          />
        </Container>
        <Container
          // minHeight="800px"
          maxWidth="sm"
          m={2}
          style={{ textAlign: "left" }}
        >
          {/* <Box minHeight="500px"> */}
          <p style={{ width: "fit-content" }}>
            <b>ID:</b> {data.deliveries[index].id}
          </p>
          <p>
            <b>Address: </b>
            <Link
              href={
                "https://www.google.com/maps/dir/?api=1&destination=" +
                data.deliveries[index].number +
                "+" +
                data.deliveries[index].street +
                "+" +
                data.deliveries[index].postalCode
              }
              key="signup"
            >
              {data.deliveries[index].number} {data.deliveries[index].street},{" "}
              {data.deliveries[index].city}, {data.deliveries[index].postalCode}
            </Link>
          </p>

          {data.deliveries[index].apt && (
            <p style={{ width: "fit-content" }}>
              <b> Apartment/Unit:</b> {data.deliveries[index].apt}
            </p>
          )}
          <p style={{ width: "fit-content" }}>
            <b>Phone Number:</b>{" "}
            <Link href={"tel:" + data.deliveries[index].phone}>
              {data.deliveries[index].phone}
            </Link>
          </p>
          <p style={{ width: "fit-content" }}>
            <b>Portions:</b> {data.deliveries[index].portions}
          </p>
          {data.deliveries[index].notes && (
            <p style={{ width: "fit-content" }}>
              <b>Notes:</b> {data.deliveries[index].notes}
            </p>
          )}
          {/* <ButtonGroup aria-label="outlined primary button group"> */}
          {/* </Box> */}
        </Container>
      </>
      // {/* </ButtonGroup> */}
      // {/* </div> */}
      // {/* </Box> */}
      // //{" "}
      // </div>
    );
  }

  return (
    <Container>
      <CircularProgress />
    </Container>
  );
}

export default DriverRoute;
