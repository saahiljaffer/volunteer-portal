import React, { useState, useEffect } from "react";
import { Link, Button, Container, Box } from "@material-ui/core";
import { Redirect } from "react-router-dom";

export function DriverRoute({ match }) {
  const { id } = match.params;
  const [data, setData] = useState(null);
  const [index, setIndex] = useState(0);
  const [link, setLink] = useState(null);
  useEffect(() => {
    var fetchStr = "/api/routes/" + id;
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

  if (data) {
    return (
      <Container maxWidth="md">
        <div style={{ textAlign: "left" }}>
          Address: {data.deliveries[index].number}{" "}
          {data.deliveries[index].street} {data.deliveries[index].postalCode}
          <p>Apartment Number: {data.deliveries[index].apartment}</p>
          <p>Phone Number: {data.deliveries[index].phone}</p>
          <p>Portions: {data.deliveries[index].portions}</p>
          <Box m={1}>
            <Link href={link} key="signup" style={{ textDecoration: "none" }}>
              {/* <Button variant="contained">Open Maps</Button> */}
              Open Maps
            </Link>
          </Box>
          <Box m={1}>
            <Button
              variant="contained"
              disabled={index === 0}
              onClick={() => setIndex(index - 1)}
            >
              Previous
            </Button>
          </Box>
          <Box m={1}>
            <Button
              variant="contained"
              disabled={index === data.deliveries.length - 1}
              onClick={() => setIndex(index + 1)}
            >
              Next
            </Button>
          </Box>
        </div>
      </Container>
    );
  }

  return <></>;
}

export default DriverRoute;
