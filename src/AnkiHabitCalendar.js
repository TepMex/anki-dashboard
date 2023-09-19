import moment from "moment";
import ReactCalendarHeatmap from "react-calendar-heatmap";

function convertAnkiStatToObj(stat) {
  return {
    date: stat[0],
    count: stat[1],
  };
}

function filterAnkiStatsLastYear(startDate, endDate) {
  return function ({ date }) {
    date = moment(date);
    return date.isSameOrAfter(startDate) && date.isSameOrBefore(endDate);
  };
}

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
    [maxReviews * 0.1, 1],
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
    return `Didn't do some Anki this day`;
  }
  return `${item.count} cards was reviewed`;
}

function AnkiHabitCalendar({ ankiStats }) {
  const startDate = moment().add(-1, "year");
  const endDate = moment();
  let stats = ankiStats
    .map(convertAnkiStatToObj)
    .filter(filterAnkiStatsLastYear(startDate, endDate));
  const maxReviews = ankiStats
    .map((e) => e[1])
    .reduce((a, b) => Math.max(a, b));
  return (
    <ReactCalendarHeatmap
      startDate={startDate}
      endDate={endDate}
      values={stats}
      classForValue={classForValue(maxReviews)}
      titleForValue={titleForValue}
    />
  );
}

export default AnkiHabitCalendar;
