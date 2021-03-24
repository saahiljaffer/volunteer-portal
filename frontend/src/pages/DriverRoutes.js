import React, { useState } from "react";
import { Box, TextField, Button, Link, Container } from "@material-ui/core";

export function DriverRoutes() {
  const [route, setRoute] = useState("");

  return (
    <Container maxWidth="sm">
      <Box m={1}>
        <TextField
          name="number"
          label="Route Number"
          value={route}
          onChange={(event, value) => {
            setRoute(event.target.value);
          }}
          variant="outlined"
          fullWidth
        />
      </Box>
      <Box m={1}>
        <Link
          href={"/routes/" + route}
          key="signup"
          style={{ textDecoration: "none" }}
        >
          <Button variant="contained" color="primary" fullWidth>
            Go
          </Button>
        </Link>
      </Box>
    </Container>
  );
}

export default DriverRoutes;
