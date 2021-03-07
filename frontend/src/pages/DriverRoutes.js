import React from "react";
import { FormControl, Box, TextField, Button, Link } from "@material-ui/core";

export function DriverRoutes() {
  return (
    <FormControl>
      <Box m={1}>
        <TextField
          // inputRef={register}
          name="number"
          label="Route Number"
          // className={classes.textField}
          // margin="normal"
          variant="outlined"
          fullWidth
        />
      </Box>
      <Box m={1}>
        <Link to="/routes/{}" key="signup" style={{ textDecoration: "none" }}>
          <Button variant="contained" fullWidth>
            Go
          </Button>
        </Link>
      </Box>
    </FormControl>
  );
}

export default DriverRoutes;
