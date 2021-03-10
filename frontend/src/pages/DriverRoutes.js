import React, { useState } from "react";
import {
  FormControl,
  Box,
  TextField,
  Button,
  Link,
  Container,
} from "@material-ui/core";

export function DriverRoutes() {
  const [route, setRoute] = useState("");

  const handleChange = (event, value) => {
    setRoute(event.target.value);
  };

  return (
    <Container maxWidth="sm">
      <Box m={1}>
        <TextField
          // inputRef={register}
          name="number"
          label="Route Number"
          // className={classes.textField}
          // margin="normal"
          value={route}
          onChange={handleChange}
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
          <Button variant="contained" fullWidth>
            Go
          </Button>
        </Link>
      </Box>
    </Container>
  );
}

export default DriverRoutes;
