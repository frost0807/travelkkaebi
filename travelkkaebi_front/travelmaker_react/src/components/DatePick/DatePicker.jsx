import { DateRange } from 'react-date-range';
import { addDays } from "date-fns"
import React, { useState } from 'react';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { useEffect } from 'react';

function DatePicker({ selectDate, setSelectDate, dateOnChange }) {

  // const [state, setState] = useState([
  //   {
  //     startDate: new Date(),
  //     endDate: addDays(new Date(), 1),
  //     key: "selection",
  //   },
  // ])

  return (
<DateRange
  editableDateInputs={true}
  onChange={dateOnChange}
  moveRangeOnFirstSelection={false}
  ranges={selectDate}
  months={1}
  direction="horizontal"
  />
  )
}

export default DatePicker