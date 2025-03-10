import moment from "moment";
import ReactCalendarHeatmap from "react-calendar-heatmap";

function convertMistakesToCalendarData(mistakesData) {
  return mistakesData.map(([date, count]) => ({
    date,
    count,
  }));
}

function classForValue(maxMistakes) {
  const gradeTable = [
    [maxMistakes * 0.9, 9],
    [maxMistakes * 0.8, 8],
    [maxMistakes * 0.7, 7],
    [maxMistakes * 0.6, 6],
    [maxMistakes * 0.5, 5],
    [maxMistakes * 0.4, 4],
    [maxMistakes * 0.3, 3],
    [maxMistakes * 0.2, 2],
    [maxMistakes * 0.1, 1],
  ];
  return function (item) {
    if (!item) {
      return "color-empty";
    }

    for (let [limit, scale] of gradeTable) {
      if (item.count >= limit) {
        return `mistake-color-scale-${scale}`;
      }
    }

    return "color-empty";
  };
}

function titleForValue(item) {
  if (!item) {
    return `No mistakes this day`;
  }
  return `${item.date}:\n${item.count} mistakes made`;
}

function AnkiMistakesCalendar({ mistakesData = [] }) {
  const startDate = moment().add(-2, "year");
  const endDate = moment();

  const calendarData = convertMistakesToCalendarData(mistakesData);
  const maxMistakes = Math.max(...mistakesData.map(([_, count]) => count));

  return (
    <div className="widget-container">
      <ReactCalendarHeatmap
        startDate={startDate}
        endDate={endDate}
        values={calendarData}
        classForValue={classForValue(maxMistakes)}
        titleForValue={titleForValue}
      />
    </div>
  );
}

export default AnkiMistakesCalendar;
