import React from "react";
import { Link } from "react-router-dom";

const CharacterCard = ({ character, list, addCharacter, removeCharacter }) => {
  const characterList = list.filter((c) => {
    return c.id === character.id;
  });

  const button =
    characterList.length === 0 ? (
      <button onClick={() => addCharacter(character)}>Add to List</button>
    ) : (
      <button onClick={() => removeCharacter(character)}>Remove</button>
    );

  return (
    <div className="character-card">
      <div>
        <Link to={`/characters/${character.name}/${character.id}`}>
          <img src={character.image} alt={character.name} />
        </Link>
        <h2>{character.name}</h2>
      </div>
      {button}
    </div>
  );
};

export default CharacterCard;
