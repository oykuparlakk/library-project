import express, { Router } from "express";
import { UserController } from "../controllers/user.controller";

const userRouter: Router = express.Router();
const userController = new UserController();

userRouter.post("/", async (req, res) => {
  await userController.createUser(req, res);
});

userRouter.get("/", async (req, res) => {
  await userController.getAllUsers(req, res);
});

userRouter.get("/:userId", async (req, res) => {
  await userController.getUserDetails(req, res);
});

export default userRouter;
