import { DataTypes } from "sequelize";
import { sequelize } from "../util/db.js";

export const OriginPlanet = sequelize.define("originPlanet", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  name: DataTypes.STRING,
  isDestroyed: DataTypes.BOOLEAN,
  description: DataTypes.TEXT,
  image: DataTypes.STRING,
  deletedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});
