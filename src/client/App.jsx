import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import axios from "axios";
import "./App.css";
import Header from "../components/Header";
import CharacterScreen from "../components/CharacterScreen";
import CharacterList from "../components/CharacterList";
import { Outlet } from "react-router-dom";

function App({ addCharacter, removeCharacter, character, list }) {
  return (
    <div>
      <Header />
      <main>
        <CharacterScreen
          addCharacter={addCharacter}
          removeCharacter={removeCharacter}
          character={character}
          list={list}
        />
        <CharacterList removeCharacter={removeCharacter} list={list} />
      </main>
    </div>
  );
}

export default App;
