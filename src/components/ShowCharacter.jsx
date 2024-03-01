import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";
import { useParams } from "react-router-dom";

const ShowCharacter = ({ character, setCharacter }) => {
  const [singleCharacter, setSingleCharacter] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`/characters/${id}`);
        setSingleCharacter(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching character data:", error);
      }
      console.log(id);
    };
    getData();
  }, [id]);

  return (
    <div>
      <Header />
      <main>
        <div className="page">
          <div className="character-container">
            <div key={singleCharacter.id} className="character-card">
              <h3>Max Ki: {singleCharacter.maxKi}</h3>
              <h3>Race: {singleCharacter.race}</h3>
              <h3>Gender: {singleCharacter.gender}</h3>
              <h3>Description:</h3>
              <p>{singleCharacter.description}</p>
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
            {singleCharacter.transformations &&
              singleCharacter.transformations.map((t) => (
                <div key={t.id} className="character-card">
                  <img src={t.image} alt={t.name} />
                  <h2>{t.name}</h2>
                  <h3>Ki: {t.ki}</h3>
                </div>
              ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ShowCharacter;
