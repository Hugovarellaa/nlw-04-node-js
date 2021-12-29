import { createConnection } from "typeorm";
import "reflect-metadata";
import "./database";
import express from "express";
import { router } from "./routes";

createConnection();
const app = express();
app.use(express.json());
app.use(router);

export { app };
