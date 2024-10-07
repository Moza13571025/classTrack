import React, { useState } from "react";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { TextField } from "@mui/material";
import dayjs from "dayjs";

const CustomDateTimePicker = ({ value, onChange }) => {
  const handleDateChange = (newValue) => {
    if (newValue) {
      const minutes = newValue.minute();
      // 四捨五入到最近的 15 分鐘
      const roundedMinutes = Math.round(minutes / 15) * 15;
      newValue = newValue.minute(roundedMinutes);
    }
    onChange(newValue);
  };

  return (
    <DateTimePicker
      label="Due Date"
      value={value}
      onChange={handleDateChange}
      views={["year", "month", "day", "hours", "minutes"]}
      renderInput={(params) => <TextField {...params} fullWidth />}
    />
  );
};

export default CustomDateTimePicker;
