import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

Entity();
export default class Answer {
  @PrimaryGeneratedColumn()
  answer_id: number;

  @Column({
    type: "int",
  })
  fk_response_id: number;

  @Column({
    type: "int",
  })
  fk_question_id: number;
}
