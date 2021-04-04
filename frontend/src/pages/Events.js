import React from "react";
import { Calendar } from "../Components/Calendar";
import { EventCard } from "../Components/EventCard";
import { Grid, Box } from "@material-ui/core";

// Returns the event page that lists all upcoming events and allows user to register
export function Events() {
  return (
    <Grid maxwidth="md" justifycontent="centre">
      <Box
        m={2}
        style={{
          maxwidth: "800px",
          width: "80%",
          margin: "auto",
          marginTop: "20px",
          justifycontent: "centre",
          alignContent: "center",
        }}
      >
        {/* Ramadhan Calendar Card */}
        <EventCard
          title="Ramadhan"
          subheader="April 15th - May 15th"
          content={<Calendar />}
          style={{ justifycontent: "centre", alignContent: "center" }}
        />
      </Box>
    </Grid>
  );
}

export default Events;
