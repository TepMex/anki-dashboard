import React from "react";
import logo from "./assets/logo.svg";
import "./styles/App.css";
import "./styles/LoadingSpinner.css";
import AnkiHabitCalendar from "./components/AnkiHabitCalendar";
import VocabProgressChart from "./components/VocabProgressChart";
import LoadingSpinner from "./components/LoadingSpinner";

function App({ wordsMemorised, ankiStats, plotData, isLoading, error }) {
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

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Words memorised: {wordsMemorised} / 1000</p>
        <div className="dashboard-section">
          <h2>Vocab Learning Progress</h2>
          <VocabProgressChart data={plotData} />
        </div>
        <div className="dashboard-section">
          <h2>Anki Reviews Intensity</h2>
          <AnkiHabitCalendar ankiStats={ankiStats} />
        </div>
      </header>
    </div>
  );
}

export default App;
