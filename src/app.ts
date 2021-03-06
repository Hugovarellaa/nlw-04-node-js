import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import "reflect-metadata";
import { createConnection } from "typeorm";
import "./database";
import { Apperror } from "./errors/AppError";
import { router } from "./routes";

createConnection();
const app = express();
app.use(express.json());
app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof Apperror) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }
    return response.status(500).json({
      status: "Error",
      message: `Internal server error ${err.message}`,
    });
  }
);

export { app };
