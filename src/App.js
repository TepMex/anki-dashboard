import logo from "./logo.svg";
import "./App.css";
import AnkiHabitCalendar from "./AnkiHabitCalendar";
import TogglChineseHabitCalendar from "./TogglChineseHabitCalendar";

function App({ wordsMemorised, ankiStats, togglData }) {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Words memorised: {wordsMemorised} / 1000</p>
        Anki Reviews Intensity <AnkiHabitCalendar ankiStats={ankiStats} />
        Time spent on Chinese (Toggl){" "}
        <TogglChineseHabitCalendar calendarData={togglData} />
      </header>
    </div>
  );
}

export default App;
