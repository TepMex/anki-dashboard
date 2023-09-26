import moment from "moment";
import Papa from "papaparse";
export function calendarDataFromTogglEntries(csvEntries, regexList = [/.*/]) {
  let csvLines = csvEntries.split("\n");
  let filteredLines = [csvLines[0]];

  lines_cycle: for (let line of csvLines.slice(1)) {
    for (let regex of regexList) {
      if (regex.test(line)) {
        filteredLines.push(line);
        continue lines_cycle;
      }
    }
  }
  const filteredCsv = filteredLines.join("\n");
  const filteredJson = Papa.parse(filteredCsv, { header: true })?.data;

  const dateToCount = new Map();

  for (let entry of filteredJson) {
    if (!dateToCount.has(entry["Start date"])) {
      dateToCount.set(entry["Start date"], 0);
    }

    const duration = moment.duration(entry["Duration"]).asMinutes();
    dateToCount.set(
      entry["Start date"],
      dateToCount.get(entry["Start date"]) + duration
    );
  }

  let maxCount = 0;

  const dateCountArr = Array.from(dateToCount).map(([date, count]) => {
    maxCount = Math.max(maxCount, count);
    return {
      date,
      count,
    };
  });
  return {
    data: dateCountArr,
    maxCount,
  };
}
