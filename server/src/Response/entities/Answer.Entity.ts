import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Question from "../../Form/entities/Question.Entity";
import ResponseEntity from "./Response.Entity";

@Entity()
export default class Answer {
  @PrimaryGeneratedColumn()
  answer_id: number;

  @Column({
    type: "json",
    nullable: true,
  })
  selected_options: string[];

  @ManyToOne(() => ResponseEntity, (response) => response.response_id, { nullable: false })
  @JoinColumn({ name: "fk_response_id", referencedColumnName: "response_id" })
  response: ResponseEntity;

  @ManyToOne(() => Question, (question) => question.question_id, { nullable: false })
  @JoinColumn({ name: "fk_question_id", referencedColumnName: "question_id" })
  question: Question;
}
