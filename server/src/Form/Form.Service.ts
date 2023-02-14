/* eslint-disable no-underscore-dangle */
import { FormDTOInterface, QuestionDTOInterface, QuestionInterface } from "./Form.Interface";
import getDateString from "../Common/Utils/GetDateString";
import NotFoundException from "../Common/Exceptions/NotFound.Exception";
import BadRequestException from "../Common/Exceptions/BadRequest.Exception";
import myDataSource from "../Loader/MySQL.Loader";
import Form from "./entities/Form.Entity";
import User from "../User/entities/User.Entity";
import Question from "./entities/Question.Entity";

export default class FormService {
  private static formRepository = myDataSource.getRepository(Form);

  private static questionRepository = myDataSource.getRepository(Question);

  private static userRepository = myDataSource.getRepository(User);

  static async createNewForm(userID: number) {
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
        .from(Form, Form.name)
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

  static async updateForm(formId: string, body: FormDTOInterface) {
    // Form Update
    const form = await this.formRepository.findOneBy({ form_id: Number(formId) });

    form.form_title = body.title;
    form.form_description = body.description;
    form.form_category = body.category;
    form.accept_response = body.acceptResponse;
    form.on_board = body.onBoard;
    form.login_required = body.loginRequired;
    form.response_modifiable = body.responseModifiable;

    await this.formRepository.save(form);

    // Question Update
    const oldQuestionList = await this.questionRepository.find({
      relations: {
        form: true,
      },
      where: {
        form: {
          form_id: Number(formId),
        },
      },
    });
    const questionListInDto = body.questionList;

    oldQuestionList.sort((a, b) => a.question_order - b.question_order);
    questionListInDto.sort((a, b) => a.questionId - b.questionId);

    const newQuestionList = questionListInDto.map((questionInDto, index) => {
      if (oldQuestionList[index]) {
        oldQuestionList[index].question_type = questionInDto.type;
        oldQuestionList[index].question_title = questionInDto.title;
        oldQuestionList[index].essential = questionInDto.essential;
        oldQuestionList[index].etc_added = questionInDto.etcAdded;
        oldQuestionList[index].question_options = questionInDto.option;

        return oldQuestionList[index];
      }
      const newQuestion = new Question();
      newQuestion.form = form;
      newQuestion.question_order = index + 1;
      newQuestion.question_type = questionInDto.type;
      newQuestion.question_title = questionInDto.title;
      newQuestion.essential = questionInDto.essential;
      newQuestion.etc_added = questionInDto.etcAdded;
      newQuestion.question_options = questionInDto.option;

      return newQuestion;
    });

    await this.questionRepository.upsert(newQuestionList, ["question_id"]);

    // Question Update 이후 Update에 포함되지 않은 Question 삭제
    const questionListToBeDeleted = oldQuestionList.slice(newQuestionList.length);
    await this.questionRepository.remove(questionListToBeDeleted);
  }

  // static async deleteForm(formId: string) {
  //   await Form.deleteOne({ _id: formId });
  // }

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
