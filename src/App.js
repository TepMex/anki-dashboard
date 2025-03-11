import React from "react";
import logo from "./assets/logo.svg";
import "./styles/App.css";
import "./styles/LoadingSpinner.css";
import "./styles/ProgressBar.css";
import "./styles/DateRangePicker.css";
import AnkiHabitCalendar from "./components/AnkiHabitCalendar";
import VocabProgressChart from "./components/VocabProgressChart";
import LoadingSpinner from "./components/LoadingSpinner";
import AnkiMistakesCalendar from "./components/AnkiMistakesCalendar";
import DeckSelector from "./components/DeckSelector";
import ProgressBar from "./components/ProgressBar";
import DateRangePicker from "./components/DateRangePicker";

function App({
  wordsMemorised,
  ankiStats,
  plotData,
  mistakesData,
  reviewsData,
  deckNamesAndIds,
  selectedDecks,
  onDecksChange,
  onDateRangeChange,
  isLoading,
  error,
  totalCards,
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
    reviewsData &&
    Array.isArray(plotData) &&
    Array.isArray(mistakesData) &&
    Array.isArray(reviewsData);

  const memorizedCount = Array.isArray(wordsMemorised)
    ? wordsMemorised.filter((interval) => interval >= 7).length
    : 0;

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="dashboard-section">
          <h2>Select Anki Decks</h2>
          <DeckSelector
            decks={deckNamesAndIds || {}}
            selectedDecks={selectedDecks}
            onChange={onDecksChange}
          />
        </div>
        {selectedDecks.length > 0 && (
          <>
            <ProgressBar
              memorizedCount={memorizedCount}
              totalCards={totalCards}
            />
            <div className="dashboard-section">
              <h2>Date Range</h2>
              <DateRangePicker onRangeChange={onDateRangeChange} />
            </div>
            <div className="dashboard-section">
              <h2>Vocab Learning Progress</h2>
              {hasValidData ? (
                <VocabProgressChart
                  data={plotData}
                  mistakesData={mistakesData}
                  reviewsData={reviewsData}
                />
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
          </>
        )}
        {selectedDecks.length === 0 && (
          <div className="dashboard-section">
            <p>Please select one or more Anki decks to view statistics</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
