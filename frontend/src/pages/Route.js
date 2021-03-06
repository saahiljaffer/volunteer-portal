import React, { useState, useEffect } from "react";
import { Link, Button, Container, Box } from "@material-ui/core";

export function DriverRoute({ match }) {
  const { id } = match.params;
  const [data, setData] = useState(null);
  const [index, setIndex] = useState(0);
  const [delivery, setDelivery] = useState(null);
  useEffect(() => {
    var fetchStr = "/api/routes/" + id;
    fetch(fetchStr, {
      method: "GET",
    })
      .then((response) => response.json())
      .then(setData);
  }, []);

  if (data) {
    return (
      <Container maxWidth="md">
        <div style={{ textAlign: "left" }}>
          <Link href="https://google.ca">
            Address: {data.deliveries[index].number}{" "}
            {data.deliveries[index].street} {data.deliveries[index].postalCode}
          </Link>
          <p>Apartment Number: {data.deliveries[index].apartment}</p>
          <p>Phone Number: {data.deliveries[index].phone}</p>
          <p>Portions: {data.deliveries[index].portions}</p>

          <Box m={1}>
            <Button variant="contained">Previous</Button>
          </Box>
          <Box m={1}>
            <Button variant="contained">Next</Button>
          </Box>
        </div>
      </Container>
    );
  }

  return <></>;
}

export default DriverRoute;
