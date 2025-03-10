import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import "react-calendar-heatmap/dist/styles.css";
import App from "./App";
import DashboardService from "./services/DashboardService";

const STORAGE_KEY = "selectedAnkiDecks";

function Dashboard() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDecks, setSelectedDecks] = useState(() => {
    // Initialize from localStorage
    const savedDecks = localStorage.getItem(STORAGE_KEY);
    return savedDecks ? JSON.parse(savedDecks) : [];
  });

  // Save to localStorage whenever selectedDecks changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedDecks));
  }, [selectedDecks]);

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        const dashboardData = await DashboardService.loadDashboardData(
          selectedDecks
        );
        console.log("Loaded dashboard data:", dashboardData);
        setData(dashboardData);
      } catch (err) {
        console.error("Error loading dashboard data:", err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [selectedDecks]);

  return (
    <React.StrictMode>
      <App
        wordsMemorised={data?.intervals}
        ankiStats={data?.reviewsStats}
        togglData={data?.togglCalendarData}
        plotData={data?.plotData}
        mistakesData={data?.mistakesData}
        reviewsData={data?.reviewsData}
        deckNamesAndIds={data?.deckNamesAndIds}
        selectedDecks={selectedDecks}
        onDecksChange={setSelectedDecks}
        isLoading={isLoading}
        error={error}
      />
    </React.StrictMode>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Dashboard />);
