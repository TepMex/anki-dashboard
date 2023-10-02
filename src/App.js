import logo from "./logo.svg";
import "./App.css";
import AnkiHabitCalendar from "./AnkiHabitCalendar";
import TogglChineseHabitCalendar from "./TogglChineseHabitCalendar";
import VocabProgressChart from "./VocabProgressChart";

function App({ wordsMemorised, ankiStats, togglData, plotData }) {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Words memorised: {wordsMemorised} / 1000</p>
        Vocab learning progress <VocabProgressChart data={plotData} />
        Anki Reviews Intensity <AnkiHabitCalendar ankiStats={ankiStats} />
        Time spent on Chinese (Toggl){" "}
        <TogglChineseHabitCalendar calendarData={togglData} />
      </header>
    </div>
  );
}

export default App;
