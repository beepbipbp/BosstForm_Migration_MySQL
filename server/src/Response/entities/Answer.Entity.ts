import { Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Question from "../../Form/entities/Question.Entity";
import ResponseEntity from "./Response.Entity";
import SelectedOption from "./SelectedOption.Entity";

@Entity()
export default class Answer {
  @PrimaryGeneratedColumn()
  answer_id: number;

  @ManyToOne(() => ResponseEntity, (response) => response.response_id, { nullable: false })
  @JoinColumn({ name: "fk_response_id", referencedColumnName: "response_id" })
  response: ResponseEntity;

  @ManyToOne(() => Question, (question) => question.question_id, { nullable: false })
  @JoinColumn({ name: "fk_question_id", referencedColumnName: "question_id" })
  question: Question;

  @OneToMany(() => SelectedOption, (selectedOption) => selectedOption.answer)
  selected_options: SelectedOption[];
}
