import React, { useState } from "react";
import DayPicker, { DateUtils } from "react-day-picker";
import "react-day-picker/lib/style.css";
import { Button } from "@material-ui/core";
import firebase from "firebase";

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

  const submit = () => {
    const body = {
      ramadhan: selectedDays,
      uid: firebase.auth().currentUser.uid,
    };
    const result = fetch(`/api/drivers/signup/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  };

  var beforeLim = new Date();
  beforeLim.setDate(beforeLim.getDate() + 2);

  if (beforeLim < new Date(2021, 3, 15)) {
    beforeLim = new Date(2021, 3, 15);
  }

  return (
    <div>
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
    </div>
  );
}

export default Calendar;
