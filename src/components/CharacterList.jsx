import React from "react";
import CharacterCard from "./CharacterCard";

const CharacterList = ({ list, removeCharacter }) => {
  const characterDisplay = list.map((character, i) => {
    return (
      <CharacterCard
        key={i}
        character={character}
        list={list}
        removeCharacter={removeCharacter}
      />
    );
  });
  return (
    <div className="characterlist">
      <h1>My Character List</h1>
      <div className="character-container">{characterDisplay}</div>
    </div>
  );
};

export default CharacterList;
