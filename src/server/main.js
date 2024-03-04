import express from "express";
import ViteExpress from "vite-express";
import axios from "axios";
import { config } from "dotenv";
import { Character } from "./models/character.js";
import { Transformation } from "./models/transformation.js";
import { OriginPlanet } from "./models/originPlanet.js";
import { sequelize } from "./util/db.js";
config();

const { PORT } = process.env;

import {
  getAllCharacters,
  showCharacter,
  getAllOriginPlanets,
} from "./controllers/character.js";

const app = express();
app.use(express.json());

Character.hasMany(Transformation);
Transformation.belongsTo(Character);
Character.belongsTo(OriginPlanet);
OriginPlanet.hasMany(Character);

const getData = async () => {
  try {
    const characters = await axios.get(
      "https://dragonball-api.com/api/characters?limit=58"
    );

    const charactersData = characters.data.items;

    for (const characterData of charactersData) {
      const singleCharacter = await axios.get(
        `https://dragonball-api.com/api/characters/${characterData.id}`
      );

      const singleCharacterData = singleCharacter.data;

      const [character, created] = await Character.upsert({
        id: singleCharacterData.id,
        name: singleCharacterData.name,
        ki: singleCharacterData.ki,
        maxKi: singleCharacterData.maxKi,
        race: singleCharacterData.race,
        gender: singleCharacterData.gender,
        description: singleCharacterData.description,
        image: singleCharacterData.image,
        affiliation: singleCharacterData.affiliation,
        deletedAt: singleCharacterData.deletedAt,
      });

      const [originPlanet, createdOriginPlanet] = await OriginPlanet.upsert({
        id: singleCharacterData.originPlanet.id,
        name: singleCharacterData.originPlanet.name,
        isDestroyed: singleCharacterData.originPlanet.isDestroyed,
        description: singleCharacterData.originPlanet.description,
        image: singleCharacterData.originPlanet.image,
        deletedAt: singleCharacterData.originPlanet.deletedAt,
      });

      await character.setOriginPlanet(originPlanet);

      if (
        singleCharacterData.transformations &&
        singleCharacterData.transformations.length > 0
      ) {
        for (const transformationData of singleCharacterData.transformations) {
          const [transformation, createdTransformation] =
            await Transformation.upsert({
              id: transformationData.id,
              name: transformationData.name,
              image: transformationData.image,
              ki: transformationData.ki,
              deletedAt: transformationData.deletedAt,
            });

          await character.addTransformation(transformation);
        }
      }
    }

    console.log("Data stored in the database successfully!");
  } catch (error) {
    console.error("Error fetching and storing data:", error);
  }
};
getData();

app.get("/characters", getAllCharacters);
app.get("/characters/:id", showCharacter);
app.get("/originplanets", getAllOriginPlanets);

sequelize
  .sync()
  .then(() => {
    ViteExpress.listen(app, PORT, () =>
      console.log(`Server is listening on port ${PORT}...`)
    );
  })
  .catch((err) => console.log(err));
