import React from "react";
import MuiAlert from "@material-ui/lab/Alert";

// return a MuiAlert with elevation = 6
export function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default Alert;
