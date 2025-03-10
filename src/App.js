import React from "react";
import logo from "./assets/logo.svg";
import "./styles/App.css";
import "./styles/LoadingSpinner.css";
import AnkiHabitCalendar from "./components/AnkiHabitCalendar";
import VocabProgressChart from "./components/VocabProgressChart";
import LoadingSpinner from "./components/LoadingSpinner";
import AnkiMistakesCalendar from "./components/AnkiMistakesCalendar";

function App({
  wordsMemorised,
  ankiStats,
  plotData,
  mistakesData,
  isLoading,
  error,
}) {
  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="error-container">
        <h1>Error Loading Dashboard</h1>
        <p>{error.message}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  // Ensure we have valid data before rendering
  const hasValidData =
    plotData &&
    mistakesData &&
    Array.isArray(plotData) &&
    Array.isArray(mistakesData);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Words memorised: {wordsMemorised || 0} / 1000</p>
        <div className="dashboard-section">
          <h2>Vocab Learning Progress</h2>
          {hasValidData ? (
            <VocabProgressChart data={plotData} mistakesData={mistakesData} />
          ) : (
            <div>No data available</div>
          )}
        </div>
        <div className="dashboard-section">
          <h2>Anki Review Hardness</h2>
          {hasValidData ? (
            <AnkiMistakesCalendar mistakesData={mistakesData} />
          ) : (
            <div>No data available</div>
          )}
        </div>
        <div className="dashboard-section">
          <h2>Anki Reviews Intensity</h2>
          <AnkiHabitCalendar ankiStats={ankiStats || []} />
        </div>
      </header>
    </div>
  );
}

export default App;
