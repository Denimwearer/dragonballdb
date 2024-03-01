import express from "express";
import ViteExpress from "vite-express";
import { config } from "dotenv";
import { Character } from "./models/character.js";
import { Transformation } from "./models/transformation.js";
import { OriginPlanet } from "./models/originPlanet.js";
import { sequelize } from "./util/db.js";
import { CharacterTransformation } from "./models/characterTransformation.js";
config();
const { PORT } = process.env;
import axios from "axios";
import {
  getAllCharacters,
  showCharacter,
  getAllOriginPlanets,
} from "./controllers/character.js";

const app = express();
app.use(express.json());

Character.hasMany(Transformation);
Transformation.belongsTo(Character);
// Character.belongsToMany(Transformation, { through: CharacterTransformation });
Character.belongsTo(OriginPlanet);
OriginPlanet.hasMany(Character);
// CharacterTransformation.belongsTo(Character, { foreignKey: "characterId" });
// CharacterTransformation.belongsTo(Transformation, {
// foreignKey: "transformationId",
// });

const getData = async () => {
  try {
    const listResponse = await axios.get(
      "https://dragonball-api.com/api/characters?limit=58"
    );

    const charactersData = listResponse.data.items;

    for (const characterData of charactersData) {
      const detailResponse = await axios.get(
        `https://dragonball-api.com/api/characters/${characterData.id}`
      );

      const detailedCharacterData = detailResponse.data;

      const [character, created] = await Character.upsert({
        id: detailedCharacterData.id,
        name: detailedCharacterData.name,
        ki: detailedCharacterData.ki,
        maxKi: detailedCharacterData.maxKi,
        race: detailedCharacterData.race,
        gender: detailedCharacterData.gender,
        description: detailedCharacterData.description,
        image: detailedCharacterData.image,
        affiliation: detailedCharacterData.affiliation,
        deletedAt: detailedCharacterData.deletedAt,
      });

      const [originPlanet, createdOriginPlanet] = await OriginPlanet.upsert({
        id: detailedCharacterData.originPlanet.id,
        name: detailedCharacterData.originPlanet.name,
        isDestroyed: detailedCharacterData.originPlanet.isDestroyed,
        description: detailedCharacterData.originPlanet.description,
        image: detailedCharacterData.originPlanet.image,
        deletedAt: detailedCharacterData.originPlanet.deletedAt,
      });

      await character.setOriginPlanet(originPlanet);

      if (
        detailedCharacterData.transformations &&
        detailedCharacterData.transformations.length > 0
      ) {
        for (const transformationData of detailedCharacterData.transformations) {
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
