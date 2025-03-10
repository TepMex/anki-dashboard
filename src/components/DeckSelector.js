import React from "react";
import Select from "react-select";

const customStyles = {
  control: (base) => ({
    ...base,
    background: "#282c34",
    borderColor: "#4a4a4a",
    "&:hover": {
      borderColor: "#6a6a6a",
    },
  }),
  menu: (base) => ({
    ...base,
    background: "#282c34",
    color: "white",
  }),
  option: (base, state) => ({
    ...base,
    background: state.isFocused ? "#3a3a3a" : "#282c34",
    color: "white",
    "&:hover": {
      background: "#3a3a3a",
    },
  }),
  multiValue: (base) => ({
    ...base,
    background: "#3a3a3a",
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: "white",
  }),
  multiValueRemove: (base) => ({
    ...base,
    color: "white",
    "&:hover": {
      background: "#ff4d4d",
      color: "white",
    },
  }),
};

function DeckSelector({ decks, selectedDecks, onChange }) {
  const options = Object.entries(decks).map(([name, id]) => ({
    value: name,
    label: name,
  }));

  const value = selectedDecks.map((deck) => ({
    value: deck,
    label: deck,
  }));

  return (
    <div className="deck-selector">
      <Select
        isMulti
        options={options}
        value={value}
        onChange={(selected) => {
          onChange(selected ? selected.map((option) => option.value) : []);
        }}
        styles={customStyles}
        placeholder="Select Anki decks..."
        className="deck-select"
      />
    </div>
  );
}

export default DeckSelector;
