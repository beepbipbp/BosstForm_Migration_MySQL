import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class QuestionOption {
  @PrimaryGeneratedColumn()
  question_option_id: number;

  @Column({
    type: "int",
  })
  fk_question_id: number;

  @Column({
    type: "varchar",
    length: 50,
  })
  question_option_nmae: string;
}
