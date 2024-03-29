import { DataTypes } from "sequelize";
import { sequelize } from "../util/db.js";

export const Character = sequelize.define("character", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  name: DataTypes.STRING,
  ki: DataTypes.STRING,
  maxKi: DataTypes.STRING,
  race: DataTypes.STRING,
  gender: DataTypes.STRING,
  description: DataTypes.TEXT,
  image: DataTypes.STRING,
  affiliation: DataTypes.STRING,
  deletedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});
