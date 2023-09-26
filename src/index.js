import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "react-calendar-heatmap/dist/styles.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import AnkiConnect from "./AnkiConnect";
import TogglTrackConnector from "./TogglTrackConnector";
import moment from "moment";
import { calendarDataFromTogglEntries } from "./utils";

async function loadDashboardData() {
  const togglConnector = new TogglTrackConnector();
  const startDate = moment().add(-1, "year").format("YYYY-MM-DD");
  const endDate = moment().format("YYYY-MM-DD");
  let togglReport = await togglConnector.getCSVReport(startDate, endDate);
  let togglCalendarData = calendarDataFromTogglEntries(togglReport, [
    /Chinese/,
  ]);
  console.log(togglCalendarData);

  const ankiConnector = new AnkiConnect();

  let reviewsStats = await ankiConnector.getNumCardsReviewedByDay();
  console.log(reviewsStats);

  let deckNamesAndIds = await ankiConnector.getDeckNamesAndIds();
  console.log(deckNamesAndIds);
  let cardsArray = await ankiConnector.getCardsForDeck(
    "Refold Mandarin 1k Simplified"
  );
  console.log(cardsArray);
  let intervals = await ankiConnector.getIntervals(cardsArray);
  console.log(intervals);
  return {
    intervals: intervals.filter((interval) => interval >= 7).length,
    reviewsStats,
    togglCalendarData,
  };
}
async function init() {
  let dashboardData = await loadDashboardData();
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
    <React.StrictMode>
      <App
        wordsMemorised={dashboardData.intervals}
        ankiStats={dashboardData.reviewsStats}
        togglData={dashboardData.togglCalendarData}
      />
    </React.StrictMode>
  );

  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();
}

document.addEventListener("DOMContentLoaded", init);
