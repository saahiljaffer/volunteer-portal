import React, { useState } from "react";
import DayPicker, { DateUtils } from "react-day-picker";
import "react-day-picker/lib/style.css";
import { Button, Snackbar, Box } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import firebase from "firebase";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export function Calendar() {
  const [selectedDays, selectDays] = useState([]);

  const handleDayClick = (day, { selected, disabled }) => {
    if (disabled) {
      return;
    }
    if (selected) {
      selectDays(
        selectedDays.filter((item) => day.toString() !== item.toString())
      );
    } else {
      selectDays((selectedDays) => [...selectedDays, day]);
    }
  };

  const selectAll = () => {
    var start = new Date(2021, 3, 15, 12);
    var end = new Date(2021, 4, 15, 12);
    var daysOfYear = [];
    for (var d = start; d <= end; d.setDate(d.getDate() + 1)) {
      daysOfYear.push(new Date(d));
    }
    selectDays(daysOfYear);
  };

  const deselectAll = () => {
    selectDays([]);
  };

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const submit = () => {
    const body = {
      ramadhan: selectedDays,
      uid: firebase.auth().currentUser.uid,
    };
    const result = fetch(`/api/drivers/signup/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.status >= 200 && response.status <= 299) {
          setOpen(true);
          setError(false);
        } else {
          setError(response.statusText);
        }
      })
      .catch((error) => setError(error));
  };

  var beforeLim = new Date();
  beforeLim.setDate(beforeLim.getDate() + 2);

  if (beforeLim < new Date(2021, 3, 15)) {
    beforeLim = new Date(2021, 3, 15);
  }

  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      {open && (
        <Alert onClose={handleClose} severity="success">
          You have successfully signed up!
        </Alert>
      )}
      {error && (
        <Alert severity="error">
          Your submission wasn't submitted successfully!
        </Alert>
      )}
      <DayPicker
        numberOfMonths={2}
        month={new Date(2021, 3)}
        fromMonth={new Date(2021, 3)}
        toMonth={new Date(2021, 4)}
        disabledDays={[
          {
            before: beforeLim,
            after: new Date(2021, 4, 15),
          },
        ]}
        selectedDays={selectedDays}
        onDayClick={handleDayClick}
      />
      <br />
      <Button onClick={selectAll}>Select all</Button>
      <Button onClick={submit}>Submit</Button>
      <Button onClick={deselectAll}>Deselect all</Button>
      <Box style={{ marginBottom: "50px" }}>
        {/* <Snackbar
          anchorOrigin={{
            vertical: "center",
            horizontal: "center",
          }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
        > */}

        {/* </Snackbar> */}
      </Box>
      {/* {submitted && (
        <Alert severity="success">This is a success message!</Alert>
      )} */}
    </div>
  );
}

export default Calendar;
