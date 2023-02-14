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
    const oldQuestionList = await this.questionRepository.findBy({
      form: {
        form_id: form.form_id,
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

  static async getForm(formId: number): Promise<any> {
    const form = await this.formRepository.findOneBy({ form_id: formId });

    const questionList = await this.questionRepository.findBy({
      form: {
        form_id: form.form_id,
      },
    });

    const questionListForDto = questionList.map((question) => {
      return {
        questionId: question.question_order,
        type: question.question_type,
        essential: question.essential,
        etcAdded: question.etc_added,
        title: question.question_title,
        option: question.question_options,
      };
    });

    const formForDto = {
      id: form.form_id,
      userID: form.user.user_id,
      title: form.form_title,
      description: form.form_description,
      category: form.form_category,
      questionList: questionListForDto,
      acceptResponse: form.accept_response,
      onBoard: form.on_board,
      loginRequired: form.login_required,
      responseCount: form.response_count,
      responseModifiable: form.response_modifiable,
      createdAt: form.created_at,
      updatedAt: form.updated_at,
    };

    return formForDto;
  }

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
