import moment from "moment";

export const PREDEFINED_RANGES = {
  ALL: "all",
  TWO_YEARS: "2y",
  ONE_YEAR: "1y",
  ONE_MONTH: "1m",
  CUSTOM: "custom",
};

export const RANGE_LABELS = {
  [PREDEFINED_RANGES.ALL]: "From the beginning",
  [PREDEFINED_RANGES.TWO_YEARS]: "Last 2 years",
  [PREDEFINED_RANGES.ONE_YEAR]: "Last year",
  [PREDEFINED_RANGES.ONE_MONTH]: "Last month",
  [PREDEFINED_RANGES.CUSTOM]: "Custom range",
};

export const getStartDateForRange = (range) => {
  switch (range) {
    case PREDEFINED_RANGES.ALL:
      return moment("2000-01-01").toDate();
    case PREDEFINED_RANGES.TWO_YEARS:
      return moment().subtract(2, "years").toDate();
    case PREDEFINED_RANGES.ONE_YEAR:
      return moment().subtract(1, "year").toDate();
    case PREDEFINED_RANGES.ONE_MONTH:
      return moment().subtract(1, "month").toDate();
    default:
      return moment().subtract(2, "years").toDate();
  }
};
