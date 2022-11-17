import { Request, Response, NextFunction } from "express";
import FormService from "./Form.Service";

class FormController {
  static createNewForm(req: Request, res: Response, next: NextFunction) {
    try {
      const formID = FormService.createNewForm(req.body.userID);
      res.status(201).json({
        formID,
      });
    } catch (err) {
      next(err);
    }
  }

  static async sendFormList(req: Request, res: Response, next: NextFunction) {
    try {
      const page = Number(req.params.page);
      const userID = Number(req.userID);
      const formList = await FormService.getFormList(userID, page);
      res.json({
        form: formList,
      });
    } catch (err) {
      next(err);
    }
  }

  static async updateForm(req: Request, res: Response, next: NextFunction) {
    try {
      const { params, body } = req;
      const formID = params.id;
      await FormService.updateFormList(formID, body);
      res.json(200);
    } catch (err) {
      next(err);
    }
  }

  static async deleteForm(req: Request, res: Response, next: NextFunction) {
    try {
      const formID = req.params.id;
      await FormService.deleteForm(formID);
      res.json(204);
    } catch (err) {
      next(err);
    }
  }
}

export default FormController;
