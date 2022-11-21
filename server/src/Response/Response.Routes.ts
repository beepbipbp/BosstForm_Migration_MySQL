import express from "express";
import ResponseController from "./Response.Controller";
import { authMiddleware, checkAccessTokenExistence } from "../Middlewares/Auth.Middleware";

const responseRouter = express.Router();

responseRouter.get("/:formID", authMiddleware, ResponseController.checkResponseExistence);

responseRouter.post("/:formID", checkAccessTokenExistence, ResponseController.saveResponse);

responseRouter.get("/:formID/:responseID", checkAccessTokenExistence, ResponseController.revisitResponse);

export default responseRouter;
