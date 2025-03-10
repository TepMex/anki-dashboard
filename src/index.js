import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import "react-calendar-heatmap/dist/styles.css";
import App from "./App";
import DashboardService from "./services/DashboardService";

function Dashboard() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const dashboardData = await DashboardService.loadDashboardData();
        setData(dashboardData);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <React.StrictMode>
      <App
        wordsMemorised={data?.intervals}
        ankiStats={data?.reviewsStats}
        togglData={data?.togglCalendarData}
        plotData={data?.plotData}
        isLoading={isLoading}
        error={error}
      />
    </React.StrictMode>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Dashboard />);
