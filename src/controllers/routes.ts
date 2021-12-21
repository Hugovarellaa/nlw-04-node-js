import { Router } from "express";
import { UserController } from "./UserController";

const router = Router();

const userController = new UserController();

router.post("/users", userController.create);

export { router };
