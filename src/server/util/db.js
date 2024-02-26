import { config } from "dotenv";
config();
const { CONNECTION_STRING } = process.env;
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(CONNECTION_STRING, {
  dialect: "postgres",
});

export { sequelize };
