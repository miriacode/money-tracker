import React from "react";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { CalendarPicker } from "@mui/x-date-pickers/CalendarPicker";
import Grid from "@mui/material/Grid";

// import { sizing } from '@mui/system';

// import styles from "../Calendar/Calendar.module.scss"

export default function SubComponentsPickers() {
  const [date, setDate] = React.useState(new Date());

  return (
    <div>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Grid 
            spacing={2}>
            <Grid item sx={"100px"} md={6}>

            <CalendarPicker
            size={80}
                date={date}
                onChange={(newDate) => setDate(newDate)}
            />
            </Grid>
        </Grid>
        </LocalizationProvider>
        {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
  <StaticDatePicker
    displayStaticWrapperAs="desktop"
    openTo="year"
    value={value}
    onChange={(newValue) => {
      setValue(newValue);
    }}
    renderInput={(params) => <TextField {...params} />}
  />
</LocalizationProvider> */}
    </div>
    
  );
}
