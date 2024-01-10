import dotenv from "dotenv";
import express from "express";
import path from "path";

dotenv.config({ path: path.join(__dirname, "..", "config.env") });

const PORT = process.env.PORT || 8000;
const app = express();

app.listen(PORT, () => {
  console.log(`Listening on the url *:${PORT}`);
});
