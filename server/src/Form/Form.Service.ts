/* eslint-disable no-underscore-dangle */
import { FormDTOInterface, QuestionDTOInterface, QuestionInterface } from "./Form.Interface";
import getDateString from "../Common/Utils/GetDateString";
import NotFoundException from "../Common/Exceptions/NotFound.Exception";
import BadRequestException from "../Common/Exceptions/BadRequest.Exception";
import myDataSource from "../Loader/MySQL.Loader";
import Form from "./entities/Form.Entity";
import User from "../User/entities/User.Entity";

export default class FormService {
  private static formRepository = myDataSource.getRepository(Form);

  private static userRepository = myDataSource.getRepository(User);

  static async createNewForm(userID: number) {
    // const newForm = new Form({ user_id: userID });
    // newForm.save().catch(() => {
    //   throw new BadRequestException();
    // });
    // return newForm.id;

    const currentUser = await this.userRepository.findOneBy({ user_id: userID });

    const newForm = new Form();
    newForm.user = currentUser;

    const newFormSaved = await this.formRepository.save(newForm);

    return newFormSaved.form_id;
  }

  static async getFormList(userID: number, cursor: string) {
    let rawFormList;

    if (cursor === "empty") {
      rawFormList = await myDataSource
        .createQueryBuilder()
        .select("form_id", "_id")
        .addSelect("form_title", "title")
        .addSelect("accept_response", "acceptResponse")
        .addSelect("updated_at", "updatedAt")
        .addSelect("on_board", "onBoard")
        .addSelect("form_category", "category")
        .addSelect("response_count", "response")
        .from(Form, "form")
        .where("form.fk_user_id = :user_id ", { user_id: userID })
        .orderBy("form_id", "DESC")
        .limit(5)
        .execute();
    } else {
      rawFormList = await myDataSource
        .createQueryBuilder()
        .select("form_id", "_id")
        .addSelect("form_title", "title")
        .addSelect("accept_response", "acceptResponse")
        .addSelect("updated_at", "updatedAt")
        .addSelect("on_board", "onBoard")
        .addSelect("form_category", "category")
        .addSelect("response_count", "response")
        .from(Form, "form")
        .where("fk_user_id = :user_id", { user_id: userID })
        .andWhere("form_id < :cursor", { cursor })
        .orderBy("form_id", "DESC")
        .limit(5)
        .execute();
    }

    const formList = rawFormList.map((form) => {
      return {
        ...form,
        updatedAt: getDateString(form.updatedAt),
      };
    });

    const lastId = formList.at(-1)?._id;
    return [formList, lastId];
  }

  //   static async updateForm(formId: string, body: FormDTOInterface) {
  //     let questionList;
  //     if (body.questionList) {
  //       questionList = body.questionList.map((q: QuestionDTOInterface) => {
  //         return {
  //           question_id: q.questionId,
  //           page: q.page,
  //           type: q.type,
  //           title: q.title,
  //           option: q.option,
  //           essential: q.essential,
  //           etc_added: q.etcAdded,
  //         };
  //       });
  //     }

  //     const updated = {
  //       title: body.title,
  //       description: body.description,
  //       category: body.category,
  //       question_list: questionList,
  //       accept_response: body.acceptResponse,
  //       on_board: body.onBoard,
  //       login_required: body.loginRequired,
  //       response_modifiable: body.responseModifiable,
  //     };

  //     await Form.findOneAndUpdate({ _id: formId }, updated).catch((err) => {
  //       throw new BadRequestException();
  //     });
  //   }

  //   static async deleteForm(formId: string) {
  //     await Form.deleteOne({ _id: formId });
  //   }

  //   static async getForm(formId: string): Promise<any> {
  //     const rawForm = await Form.findOne({ _id: formId }).lean().exec();
  //     if (rawForm === null) {
  //       throw new NotFoundException("해당 설문지를 찾을 수 없습니다.");
  //     }

  //     const questionList = FormService.getQuestionListForResponse(rawForm.question_list);
  //     const form = {
  //       // eslint-disable-next-line no-underscore-dangle
  //       id: `${rawForm._id}`,
  //       userID: rawForm.user_id,
  //       title: rawForm.title,
  //       description: rawForm.description,
  //       category: rawForm.category,
  //       questionList,
  //       acceptResponse: rawForm.accept_response,
  //       onBoard: rawForm.on_board,
  //       loginRequired: rawForm.login_required,
  //       responseCount: rawForm.response_count,
  //       responseModifiable: rawForm.response_modifiable,
  //       createdAt: rawForm.createdAt,
  //       updatedAt: rawForm.updatedAt,
  //     };
  //     return form;
  //   }

  //   static getQuestionListForResponse(rawQuestionList: Array<QuestionInterface>) {
  //     const questionList = rawQuestionList.map((question) => {
  //       return {
  //         questionId: question.question_id,
  //         page: question.page,
  //         type: question.type,
  //         essential: question.essential,
  //         etcAdded: question.etc_added,
  //         title: question.title,
  //         option: question.option,
  //       };
  //     });
  //     return questionList;
  //   }
}
