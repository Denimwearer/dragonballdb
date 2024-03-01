import { Character } from "../models/character.js";
import { Transformation } from "../models/transformation.js";
import { OriginPlanet } from "../models/originPlanet.js";

export const getAllCharacters = async (req, res) => {
  try {
    const characters = await Character.findAll({
      order: [["id", "ASC"]],
    });
    res.status(200).send(characters);
    console.log("getting all characters");
  } catch (error) {
    console.log("ERROR in getAllCharacters", error);
    res.sendStatus(400);
  }
};

export const getAllOriginPlanets = async (req, res) => {
  try {
    const originPlanets = await OriginPlanet.findAll({
      order: [["id", "ASC"]],
    });
    res.status(200).send(originPlanets);
    console.log("getting all characters");
  } catch (error) {
    console.log("ERROR in getOriginPlanets", error);
    res.sendStatus(400);
  }
};

export const showCharacter = async (req, res) => {
  try {
    const { id } = req.params; // Retrieve the ID from request parameters
    const singleCharacter = await Character.findOne({
      where: { id }, // Use the dynamic ID
      include: [
        {
          model: Transformation,
          as: "transformations", // Ensure this alias matches the association defined in your model
          required: false,
        },
        {
          model: OriginPlanet,
          as: "originPlanet", // Ensure this alias matches the association defined in your model
          required: true,
        },
      ],
    });
    if (!singleCharacter) {
      // Check if character is found
      return res.status(404).send("Character not found");
    }
    res.status(200).send(singleCharacter);
    console.log("Getting a single character");
  } catch (error) {
    console.log("ERROR in showCharacter");
    console.log(error);
    res.sendStatus(500); // Use 500 for internal server error
  }
};
