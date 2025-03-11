import React, { useState } from "react";
import moment from "moment";
import CustomDateRangePicker from "./CustomDateRangePicker";
import {
  PREDEFINED_RANGES,
  RANGE_LABELS,
  getStartDateForRange,
} from "../config/dateRanges";

function DateRangePicker({ onRangeChange }) {
  const [selectedRange, setSelectedRange] = useState(
    PREDEFINED_RANGES.TWO_YEARS
  );
  const [startDate, setStartDate] = useState(
    moment().subtract(2, "years").toDate()
  );
  const [endDate, setEndDate] = useState(new Date());
  const [isCustomRange, setIsCustomRange] = useState(false);

  const handleRangeChange = (range) => {
    setSelectedRange(range);
    setIsCustomRange(range === PREDEFINED_RANGES.CUSTOM);

    if (range === PREDEFINED_RANGES.CUSTOM) {
      onRangeChange(startDate, endDate);
      return;
    }

    const newStartDate = getStartDateForRange(range);
    setStartDate(newStartDate);
    setEndDate(new Date());
    onRangeChange(newStartDate, new Date());
  };

  const handleCustomDateChange = (date, isStart) => {
    if (isStart) {
      setStartDate(date);
      onRangeChange(date, endDate);
    } else {
      setEndDate(date);
      onRangeChange(startDate, date);
    }
  };

  return (
    <div className="date-range-picker">
      <div className="range-buttons">
        {Object.entries(RANGE_LABELS).map(([range, label]) => (
          <button
            key={range}
            className={selectedRange === range ? "active" : ""}
            onClick={() => handleRangeChange(range)}
          >
            {label}
          </button>
        ))}
      </div>

      {isCustomRange && (
        <CustomDateRangePicker
          startDate={startDate}
          endDate={endDate}
          onDateChange={handleCustomDateChange}
        />
      )}
    </div>
  );
}

export default DateRangePicker;
