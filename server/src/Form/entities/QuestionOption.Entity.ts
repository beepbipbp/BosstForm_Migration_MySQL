import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Question from "./Question.Entity";

@Entity()
export default class QuestionOption {
  @PrimaryGeneratedColumn()
  question_option_id: number;

  @ManyToOne(() => Question, (question) => question.question_id, { nullable: false })
  @JoinColumn({ name: "fk_question_id", referencedColumnName: "question_id" })
  question: Question;

  @Column({
    type: "varchar",
    length: 50,
  })
  question_option_name: string;
}
