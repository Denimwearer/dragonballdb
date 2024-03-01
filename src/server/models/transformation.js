import { DataTypes } from "sequelize";
import { sequelize } from "../util/db.js";

export const Transformation = sequelize.define("transformation", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  name: DataTypes.STRING,
  image: DataTypes.STRING,
  ki: DataTypes.STRING,
  deletedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});
