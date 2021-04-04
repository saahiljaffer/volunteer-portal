import React, { useState } from "react";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import { Button, Box } from "@material-ui/core";
import Alert from "./Alert";
import firebase from "firebase";

export function Calendar() {
  const [selectedDays, selectDays] = useState([]);

  // function that selects/deselects a day when clicked on the calendar
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

  // function that selects all the days in the calendar
  const selectAll = () => {
    var start = new Date(2021, 3, 15, 12);
    var end = new Date(2021, 4, 15, 12);
    var daysOfYear = [];
    for (var d = start; d <= end; d.setDate(d.getDate() + 1)) {
      daysOfYear.push(new Date(d));
    }
    selectDays(daysOfYear);
  };

  // function to clear the selectedDays array
  const deselectAll = () => {
    selectDays([]);
  };

  // store any submission errors
  const [error, setError] = useState(null);

  // API call to transmit registration
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

  // disable selection before 2 days from now and for dates before Ramadhan
  var beforeLim = new Date();
  beforeLim.setDate(beforeLim.getDate() + 2);

  if (beforeLim < new Date(2021, 3, 15)) {
    beforeLim = new Date(2021, 3, 15);
  }

  // open/close the alert based on user preference and data
  const [open, setOpen] = React.useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  // returns the calendar
  return (
    <div>
      {/* succesful alert */}
      {open && (
        <Alert onClose={handleClose} severity="success">
          You have successfully signed up!
        </Alert>
      )}
      {/* unsuccesful alert */}
      {error && (
        <Alert severity="error">
          Your submission wasn't submitted successfully!
        </Alert>
      )}
      {/* calendar */}
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
      {/* buttons to select all, submit, and deselect all */}
      <Button onClick={selectAll}>Select all</Button>
      <Button onClick={submit}>Submit</Button>
      <Button onClick={deselectAll}>Deselect all</Button>
      <Box style={{ marginBottom: "50px" }}></Box>
    </div>
  );
}

export default Calendar;
