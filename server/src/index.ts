import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { ReasonPhrases } from "http-status-codes";
import path from "path";

dotenv.config({ path: path.join(__dirname, "..", "config.env") });

const PORT = process.env.PORT || 8000;
const app = express();

app.use((_req: Request, _res: Response, next: NextFunction) => {
  const err = new createHttpError.NotFound(ReasonPhrases.NOT_FOUND);
  next(err);
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || 500;
  const msg = err.message || "Internal Server Error";
  res.status(status).json({ msg });
});

app.listen(PORT, () => {
  console.log(`Listening on the url *:${PORT}`);
});
