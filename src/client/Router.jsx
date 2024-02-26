import React, { useState, useEffect } from "react";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import ShowCharacter from "../components/ShowCharacter";
import axios from "axios";
const Router = () => {
  const [character, setCharacter] = useState([]);
  const [list, setList] = useState([]);
  const getData = () => {
    axios
      .get("https://dragonball-api.com/api/characters?limit=58")
      .then((res) => {
        setCharacter(res.data.items);
        console.log(res.data.items);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const addCharacter = (character) => setList([...list, character]);

  const removeCharacter = (character) => {
    const newState = list.filter((c) => {
      return c !== character;
    });
    setList(newState);
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <App
          character={character}
          list={list}
          addCharacter={addCharacter}
          removeCharacter={removeCharacter}
          setCharacter={setCharacter}
        />
      ),
    },
    {
      path: "characters/:id",
      element: (
        <ShowCharacter
          character={character}
          list={list}
          setCharacter={setCharacter}
        />
      ),
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default Router;
