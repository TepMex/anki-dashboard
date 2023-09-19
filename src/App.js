import logo from "./logo.svg";
import "./App.css";

function App({ wordsMemorised }) {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Words memorised: {wordsMemorised} / 1000</p>
      </header>
    </div>
  );
}

export default App;
