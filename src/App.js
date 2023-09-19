import logo from "./logo.svg";
import "./App.css";
import AnkiHabitCalendar from "./AnkiHabitCalendar";

function App({ wordsMemorised, ankiStats }) {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Words memorised: {wordsMemorised} / 1000</p>
        Anki Reviews Intensity <AnkiHabitCalendar ankiStats={ankiStats} />
      </header>
    </div>
  );
}

export default App;
