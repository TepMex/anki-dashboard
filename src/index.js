import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import AnkiConnect from "./AnkiConnect";

async function loadDashboardData() {
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
  return intervals.filter((interval) => interval >= 7).length;
}
async function init() {
  let wordsMemorised = await loadDashboardData();
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
    <React.StrictMode>
      <App wordsMemorised={wordsMemorised} />
    </React.StrictMode>
  );

  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();
}

document.addEventListener("DOMContentLoaded", init);
