import express from "express";
import FormController from "./Form.Controller";
import { authMiddleware } from "../Middlewares/Auth.Middleware";

const formRouter = express.Router();

formRouter.get("/", authMiddleware, FormController.getFormList);

formRouter.get("/:formId", FormController.getForm);

formRouter.post("/", authMiddleware, FormController.createNewForm);

formRouter.patch("/:formId", authMiddleware, FormController.updateForm);

formRouter.delete("/:formId", authMiddleware, FormController.deleteForm);

export default formRouter;
