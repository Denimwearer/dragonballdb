import React from "react";
import CharacterCard from "./CharacterCard";

const CharacterScreen = ({
  character,
  list,
  addCharacter,
  removeCharacter,
}) => {
  const characterDisplay = character.map((c, i) => {
    return (
      <CharacterCard
        key={i}
        character={c}
        list={list}
        addCharacter={addCharacter}
        removeCharacter={removeCharacter}
      />
    );
  });
  return (
    <div className="page">
      <h2>Add a character</h2>
      <div className="btn-container"></div>
      <div className="character-container">{characterDisplay}</div>
    </div>
  );
};

export default CharacterScreen;
