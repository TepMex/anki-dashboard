import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CustomDateRangePicker({ startDate, endDate, onDateChange }) {
  return (
    <div className="custom-range-picker">
      <div className="date-picker-wrapper">
        <label>From:</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => onDateChange(date, true)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          maxDate={endDate}
          dateFormat="yyyy-MM-dd"
          className="date-input"
        />
      </div>
      <div className="date-picker-wrapper">
        <label>To:</label>
        <DatePicker
          selected={endDate}
          onChange={(date) => onDateChange(date, false)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          maxDate={new Date()}
          dateFormat="yyyy-MM-dd"
          className="date-input"
        />
      </div>
    </div>
  );
}

export default CustomDateRangePicker;
