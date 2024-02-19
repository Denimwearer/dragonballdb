import express from "express";
import ViteExpress from "vite-express";
import { config } from "dotenv";
config();
const { PORT } = process.env;

const app = express();

app.get("/hello", (req, res) => {
  res.send("Hello Vite + React!");
});

ViteExpress.listen(app, PORT, () =>
  console.log(`Server is listening on port ${PORT}...`)
);
