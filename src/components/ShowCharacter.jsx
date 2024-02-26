import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
const ShowCharacter = () => {
  const [singleCharacter, setSingleCharacter] = useState({});

  let { id } = useParams();
  const getData = () => {
    axios.get(`https://dragonball-api.com/api/characters/${id}`).then((res) => {
      setSingleCharacter(res.data);
      console.log(res.data);
      console.log(res.data.originPlanet);
    });
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <Header />
      <main>
        <div className="page">
          <div className="character-container">
            <div className="character-card">
              <h3>Max Ki: {singleCharacter.maxKi}</h3>
              <h3>Race: {singleCharacter.race}</h3>
              <h3>Gender: {singleCharacter.gender}</h3>
              <h3>Description: </h3> <p>{singleCharacter.description}</p>
            </div>
            {singleCharacter.originPlanet && (
              <div className="character-card">
                <img
                  src={singleCharacter.originPlanet.image}
                  alt={singleCharacter.originPlanet.name}
                />
                <h2>{singleCharacter.originPlanet.name}</h2>
                <h3>Description:</h3>
                <p>{singleCharacter.originPlanet.description}</p>
              </div>
            )}
          </div>
        </div>
        <div className="characterlist">
          <h2>Transformation</h2>
          <div className="character-container">
            <div key={singleCharacter.id} className="character-card">
              <img src={singleCharacter.image} alt={singleCharacter.name} />
              <h2>{singleCharacter.name}</h2>
              <h3>Ki: {singleCharacter.ki}</h3>
            </div>
            {singleCharacter.transformations &&
              singleCharacter.transformations.length > 0 &&
              singleCharacter.transformations.map((c) => (
                <div key={c.id} className="character-card">
                  <img src={c.image} alt={c.name} />
                  <h2>{c.name}</h2>
                  <h3>Ki: {c.ki}</h3>
                </div>
              ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ShowCharacter;
