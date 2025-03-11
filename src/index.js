import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import "react-calendar-heatmap/dist/styles.css";
import App from "./App";
import DashboardService from "./services/DashboardService";
import moment from "moment";

const STORAGE_KEY = "selectedAnkiDecks";

function Dashboard() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dateRange, setDateRange] = useState({
    startDate: moment().subtract(2, "years").toDate(),
    endDate: new Date(),
  });
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
          selectedDecks,
          dateRange.startDate,
          dateRange.endDate
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
  }, [selectedDecks, dateRange]);

  const handleDateRangeChange = (startDate, endDate) => {
    setDateRange({ startDate, endDate });
  };

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
        onDateRangeChange={handleDateRangeChange}
        isLoading={isLoading}
        error={error}
        totalCards={data?.totalCards || 0}
      />
    </React.StrictMode>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Dashboard />);
