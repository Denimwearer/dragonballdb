import { DataTypes } from "sequelize";
import { sequelize } from "../util/db.js";

export const Character = sequelize.define("character", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: DataTypes.STRING,
  race: DataTypes.STRING,
  ki: DataTypes.STRING,
  maxKi: DataTypes.STRING,
});
