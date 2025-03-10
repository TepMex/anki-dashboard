import moment from "moment";
import ReactCalendarHeatmap from "react-calendar-heatmap";

function classForValue(maxReviews) {
  const gradeTable = [
    [maxReviews * 0.9, 9],
    [maxReviews * 0.8, 8],
    [maxReviews * 0.7, 7],
    [maxReviews * 0.6, 6],
    [maxReviews * 0.5, 5],
    [maxReviews * 0.4, 4],
    [maxReviews * 0.3, 3],
    [maxReviews * 0.2, 2],
    [maxReviews * 0, 1],
  ];
  return function (item) {
    if (!item) {
      return "color-empty";
    }

    for (let [limit, scale] of gradeTable) {
      if (item.count >= limit) {
        return `anki-color-scale-${scale}`;
      }
    }

    return "color-empty";
  };
}

function titleForValue(item) {
  if (!item) {
    return `Didn't study this day`;
  }
  return `${item.date}:\n${item.count} minutes spend on Chinese`;
}

function TogglChineseHabitCalendar({ calendarData }) {
  const startDate = moment().add(-1, "year");
  const endDate = moment();
  return (
    <ReactCalendarHeatmap
      startDate={startDate}
      endDate={endDate}
      values={calendarData.data}
      classForValue={classForValue(calendarData.maxCount)}
      titleForValue={titleForValue}
    />
  );
}

export default TogglChineseHabitCalendar;
