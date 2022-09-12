import { DateRange } from "react-date-range";
import { addDays } from "date-fns";
import React, { useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useEffect } from "react";
import styled from "styled-components";

function DatePicker({ selectDate, setSelectDate, dateOnChange }) {
  return (
    <DateRange
      editableDateInputs={true}
      onChange={dateOnChange}
      moveRangeOnFirstSelection={false}
      ranges={selectDate}
      months={1}
      direction="vertical"
    />
  );
}

export default DatePicker;
