import * as express from "express";

export const apiRouter = express.Router();

apiRouter.get("/", (_req, res) => {
  res.status(200).json({ msg: "Hello, World!" });
});
