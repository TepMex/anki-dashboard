import moment from "moment";
import ReactCalendarHeatmap from "react-calendar-heatmap";
import "../styles/Calendar.css";

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
  return `${item.date}:\n${item.count} cards was reviewed`;
}

function AnkiHabitCalendar({ ankiStats = [] }) {
  const startDate = moment().add(-2, "year");
  const endDate = moment();

  // Handle empty or invalid ankiStats
  if (!Array.isArray(ankiStats) || ankiStats.length === 0) {
    return (
      <div className="widget-container">
        <ReactCalendarHeatmap
          startDate={startDate}
          endDate={endDate}
          values={[]}
          classForValue={() => "color-empty"}
          titleForValue={titleForValue}
        />
      </div>
    );
  }

  let stats = ankiStats
    .map(convertAnkiStatToObj)
    .filter(filterAnkiStatsLastYear(startDate, endDate));

  const maxReviews =
    ankiStats.length > 0
      ? ankiStats.map((e) => e[1]).reduce((a, b) => Math.max(a, b), 0)
      : 0;

  return (
    <div className="widget-container">
      <ReactCalendarHeatmap
        startDate={startDate}
        endDate={endDate}
        values={stats}
        classForValue={classForValue(maxReviews)}
        titleForValue={titleForValue}
      />
    </div>
  );
}

export default AnkiHabitCalendar;
