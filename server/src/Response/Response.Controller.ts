import { Request, Response, NextFunction } from "express";
import ResponseService from "./Response.Service";

class ResponseController {
  static async checkResponseExistence(req: Request, res: Response, next: NextFunction) {
    try {
      const userID = Number(req.userID);
      const { formID } = req.params;

      const responsed = await ResponseService.checkAnswerExistence(formID, userID);

      res.status(200).json({ responsed });
    } catch (err) {
      next(err);
    }
  }

  static saveResponse(req: Request, res: Response, next: NextFunction) {
    try {
      const { formID } = req.params;
      const { userID } = req;
      const { response } = req.body;

      const responseID = ResponseService.saveResponse(formID, userID, response);

      res.status(201).json({ responseID });
    } catch (err) {
      next(err);
    }
  }

  static async revisitResponse(req: Request, res: Response, next: NextFunction) {
    try {
      const { formID, responseID } = req.params;
      const response = await ResponseService.getResponse(responseID);

      if (req.userID) {
        res.status(200).json({ userID: req.userID, formID, response });
      } else {
        res.status(200).json({ formID, response });
      }
    } catch (err) {
      next(err);
    }
  }
}

export default ResponseController;
